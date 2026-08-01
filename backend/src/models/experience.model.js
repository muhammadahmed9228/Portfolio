import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },         // e.g. "Tech Corp"
  companyLogo: { type: String },                     // Optional URL
  location: { type: String },                        // e.g. "Remote" or "New York, NY"
  startDate: { type: Date, required: true },
  endDate: { type: Date },                           // Null if currently working here
  description: [{ type: String, required: true }],  // Bullet points of achievements
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);