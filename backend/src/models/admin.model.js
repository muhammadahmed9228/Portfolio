import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
}, { timestamps: true });

// Hash password before saving
// Remove "next" from the function parameters
adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Just return to skip, no next() needed

  this.password = await bcrypt.hash(this.password, 10);
  // No next() at the end either
});

// Compare password
adminSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m'
    }
  );
};

// Generate Refresh Token
adminSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d'
    }
  );
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;