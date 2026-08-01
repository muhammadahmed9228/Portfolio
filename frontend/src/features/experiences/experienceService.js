import api from '../../api/axios';

// Get all experiences (Public / Admin)
const getExperiences = async () => {
  const response = await api.get('/experiences');
  return response.data;
};

// Create new experience (Admin)
const createExperience = async (experienceData) => {
  const response = await api.post('/experiences', experienceData);
  return response.data;
};

// Update experience (Admin)
const updateExperience = async ({ id, experienceData }) => {
  const response = await api.put(`/experiences/${id}`, experienceData);
  return response.data;
};

// Delete experience (Admin)
const deleteExperience = async (id) => {
  const response = await api.delete(`/experiences/${id}`);
  return response.data;
};

const experienceService = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};

export default experienceService;