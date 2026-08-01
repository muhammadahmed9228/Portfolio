import { Experience } from '../models/experience.model.js';

// ==========================================
// PUBLIC CONTROLLERS (No Auth Required)
// ==========================================

/**
 * Get all experiences sorted by startDate descending (most recent first)
 */
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });

    return res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single experience entry by ID
 */
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience entry not found" });
    }

    return res.status(200).json({ success: true, data: experience });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADMIN CONTROLLERS (Auth Required)
// ==========================================

/**
 * Create a new Experience / Internship entry
 */
export const createExperience = async (req, res) => {
  try {
    const { company, companyLogo, location, startDate, endDate, description } = req.body;

    // 1. Validation
    if (!company || !startDate || !description) {
      return res.status(400).json({
        success: false,
        message: "Company, startDate, and description are required"
      });
    }

    // 2. Format description into an array if sent as string or array
    let parsedDescription = Array.isArray(description)
      ? description
      : typeof description === 'string'
        ? description.split('\n').filter(line => line.trim() !== '') // Convert newline-separated string to bullet array
        : [];

    if (parsedDescription.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one description bullet point is required"
      });
    }

    // 3. Create document in MongoDB
    const experience = await Experience.create({
      company,
      companyLogo,
      location,
      startDate,
      endDate: endDate || null, // null indicates present / ongoing role
      description: parsedDescription
    });

    return res.status(201).json({
      success: true,
      message: "Experience entry added successfully",
      data: experience
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing Experience entry
 */
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, companyLogo, location, startDate, endDate, description } = req.body;

    let experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience entry not found" });
    }

    // Parse description if updated
    if (description) {
      experience.description = Array.isArray(description)
        ? description
        : typeof description === 'string'
          ? description.split('\n').filter(line => line.trim() !== '')
          : experience.description;
    }

    if (company) experience.company = company;
    if (companyLogo !== undefined) experience.companyLogo = companyLogo;
    if (location !== undefined) experience.location = location;
    if (startDate) experience.startDate = startDate;
    if (endDate !== undefined) experience.endDate = endDate ? endDate : null;

    await experience.save();

    return res.status(200).json({
      success: true,
      message: "Experience entry updated successfully",
      data: experience
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete an Experience entry
 */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ success: false, message: "Experience entry not found" });
    }

    await Experience.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Experience entry deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};