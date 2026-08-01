import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  techStack: [{ type: String, required: true }], // e.g., ["React", "Node.js", "MongoDB"]
  image: {
    url: { type: String, required: true },       // Cloudinary URL
    public_id: { type: String, required: true }  // Cloudinary ID for deletion
  },
  githubLink: { type: String, trim: true },
  liveDemoLink: { type: String, trim: true },
  featured: { type: Boolean, default: false },
  category: { 
    type: String, 
    enum: ['Full-Stack', 'Frontend', 'Backend', 'Mobile'], 
    default: 'Full-Stack' 
  }
}, { timestamps: true });

export const Project = mongoose.model('Project', projectSchema);