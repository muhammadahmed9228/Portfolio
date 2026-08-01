import api from '../../api/axios';

// Public endpoint: Submit contact form
const sendContactMessage = async (messageData) => {
  const response = await api.post('/contact', messageData);
  return response.data;
};

// Admin endpoint: Get all incoming messages
const getMessages = async () => {
  const response = await api.get('/contact');
  return response.data;
};

// Admin endpoint: Toggle read/unread status
const toggleReadStatus = async (id) => {
  const response = await api.patch(`/contact/${id}/read`);
  return response.data;
};

// Admin endpoint: Delete a message
const deleteMessage = async (id) => {
  const response = await api.delete(`/contact/${id}`);
  return response.data;
};

const contactService = {
  sendContactMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
};

export default contactService;