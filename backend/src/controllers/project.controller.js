import { Project } from '../models/project.model.js';
import { uploadOnCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

// ==========================================
// PUBLIC CONTROLLERS (No Auth Required)
// ==========================================

/**
 * Get all projects with optional filtering by category & tag
 */
export const getAllProjects = async (req, res) => {
  try {
    const { category, tag, featured } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    if (tag) filter.techStack = { $in: [tag] };

    // Sort by newest first
    const projects = await Project.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single project by ID
 */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADMIN CONTROLLERS (Auth Required)
// ==========================================

/**
 * Create a new Project
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, techStack, githubLink, liveDemoLink, featured, category } = req.body;

    // 1. Validation
    if (!title || !description || !techStack) {
      return res.status(400).json({ success: false, message: "Title, description, and techStack are required" });
    }

    // 2. Check if image file was attached by Multer
    const localImagePath = req.file?.path;
    if (!localImagePath) {
      return res.status(400).json({ success: false, message: "Project image is required" });
    }

    // 3. Upload image to Cloudinary
    const cloudinaryResponse = await uploadOnCloudinary(localImagePath);
    if (!cloudinaryResponse) {
      return res.status(500).json({ success: false, message: "Error uploading image to Cloudinary" });
    }

    // 4. Parse techStack if sent as comma-separated string or stringified JSON from frontend
    let parsedTechStack = Array.isArray(techStack) 
      ? techStack 
      : techStack.split(',').map(item => item.trim());

    // 5. Save Project to Database
    const project = await Project.create({
      title,
      description,
      techStack: parsedTechStack,
      image: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id
      },
      githubLink,
      liveDemoLink,
      featured: featured === 'true' || featured === true,
      category
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing Project
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, githubLink, liveDemoLink, featured, category } = req.body;

    let project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Handle new image upload if provided
    if (req.file?.path) {
      // Delete old image from Cloudinary
      if (project.image?.public_id) {
        await deleteFromCloudinary(project.image.public_id);
      }

      // Upload new image
      const newCloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (newCloudinaryResponse) {
        project.image = {
          url: newCloudinaryResponse.secure_url,
          public_id: newCloudinaryResponse.public_id
        };
      }
    }

    // Update text fields
    if (title) project.title = title;
    if (description) project.description = description;
    if (githubLink !== undefined) project.githubLink = githubLink;
    if (liveDemoLink !== undefined) project.liveDemoLink = liveDemoLink;
    if (featured !== undefined) project.featured = featured === 'true' || featured === true;
    if (category) project.category = category;

    if (techStack) {
      project.techStack = Array.isArray(techStack)
        ? techStack
        : techStack.split(',').map(item => item.trim());
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a Project
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Delete image from Cloudinary
    if (project.image?.public_id) {
      await deleteFromCloudinary(project.image.public_id);
    }

    // Delete document from MongoDB
    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};