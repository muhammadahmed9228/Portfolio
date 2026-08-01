import Admin from '../models/admin.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

// Helper to generate tokens
export async function generateAccessAndRefreshToken(adminId) {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error("Error generating tokens: " + error.message);
  }
}

export async function registerUser(req, res) {
    try {
        // 1. Get data from req.body (added guestId)
        const { email, password, fullname } = req.body;

        // 2. Validate input
        if ([email, password, fullname].some((field) => field?.trim() === "")) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // 3. Check if user already exists
        const existedUser = await Admin.findOne({ email });

        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // 4. Create User (Avatar/Cover logic removed)
        const user = await Admin.create({
            email,
            fullname,
            password,
        });

        // 5. Verify user creation
        const createdUser = await Admin.findById(user._id).select("-password -refreshToken");
        
        if (!createdUser) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while registering the user"
            });
        }

        return res.status(201).json({
            success: true,
            data: createdUser,
            message: "Admin created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
}

export async function loginUser(req, res) {
    try {
        // 1. Extract email and password
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });
        }

        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const passwordValid = await user.isPasswordCorrect(password);
        if (!passwordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const isProduction = process.env.NODE_ENV === 'production';
        const options = {
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'None' : 'lax'
        };

        return res
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                success: true, 
                user: {
                    _id: user._id,
                    email: user.email,
                },
                message: "Login Successfull."
            });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error while logging in",
            error: error.message
        });
    }
}

// Logout Controller
export async function logOutUser(req, res) {
  try {
    // 1. Add an optional chaining check so it doesn't crash if req.admin is missing
    if (req.admin?._id) {
      await Admin.findByIdAndUpdate(
        req.admin._id,
        { $unset: { refreshToken: 1 } }, 
        { new: true }
      );
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const options = { httpOnly: true, secure: isProduction, sameSite: isProduction ? 'None' : 'lax' };

    // 2. These will clear the cookies regardless
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Refresh Token Controller
export async function refreshAccessToken(req, res) {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!incomingRefreshToken) {
      return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decodedToken?._id);

    if (!admin || incomingRefreshToken !== admin?.refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token is invalid or expired" });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const options = { httpOnly: true, secure: isProduction, sameSite: isProduction ? 'None' : 'lax' };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);
    const refreshedAdmin = await Admin.findById(admin._id).select("-password -refreshToken");

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Access token refreshed successfully",
        user: refreshedAdmin,
      });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message || "Invalid refresh token" });
  }
}
