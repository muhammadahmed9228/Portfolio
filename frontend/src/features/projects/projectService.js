import api from '../../api/axios';

// Get all projects (Public / Admin)
const getProjects = async (params = {}) => {
  const response = await api.get('/projects', { params });
  return response.data;
};

// Create new project (Admin - multipart/form-data)
const createProject = async (projectFormData) => {
  const response = await api.post('/projects', projectFormData);
  return response.data;
};

// Update project (Admin - multipart/form-data)
const updateProject = async ({ id, formData }) => {
  const response = await api.put(`/projects/${id}`, formData);
  return response.data;
};

// Delete project (Admin)
const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

const projectService = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};

export default projectService;