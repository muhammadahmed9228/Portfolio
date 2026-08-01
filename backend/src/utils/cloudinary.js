import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload local file to Cloudinary and clean up disk
 */
export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const fileName = path.basename(localFilePath);
    const backendBaseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 2000}`;
    const useLocalFallback = !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET;

    if (useLocalFallback) {
      return {
        secure_url: `${backendBaseUrl}/temp/${fileName}`,
        public_id: `local:${fileName}`,
      };
    }

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "portfolio_projects" // Organize images inside a folder in Cloudinary
    });

    // Remove local file after successful upload
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    if (localFilePath) {
      const backendBaseUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 2000}`;
      return {
        secure_url: `${backendBaseUrl}/temp/${path.basename(localFilePath)}`,
        public_id: `local:${path.basename(localFilePath)}`,
      };
    }

    return null;
  }
};

/**
 * Delete image from Cloudinary by public_id
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    if (publicId.startsWith('local:')) {
      const fileName = publicId.replace('local:', '');
      const localPath = path.join('public', 'temp', fileName);

      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }

      return { result: 'ok' };
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return null;
  }
};
