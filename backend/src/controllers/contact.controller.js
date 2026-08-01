import { Contact } from '../models/contact.model.js';
import { sendEmailNotification } from '../utils/sendEmail.js';

// ==========================================
// PUBLIC CONTROLLER (No Auth Required)
// ==========================================

/**
 * Submit contact form (Saves to DB + triggers email)
 */
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields"
      });
    }

    // 1. Save to Database
    const newMessage = await Contact.create({
      name,
      email,
      subject: subject || "Portfolio Contact Form",
      message
    });

    // 2. Trigger Email Notification asynchronously
    sendEmailNotification({
      name,
      email,
      subject: subject || "Portfolio Contact Form",
      message
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: newMessage
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// ADMIN CONTROLLERS (Auth Required)
// ==========================================

/**
 * Get all contact messages for Admin Dashboard
 */
export const getAllMessages = async (req, res) => {
  try {
    // Sort by newest first
    const messages = await Contact.find().sort({ createdAt: -1 });

    const unreadCount = messages.filter(msg => !msg.isRead).length;

    return res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Mark a message as read or unread
 */
export const toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findById(id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    message.isRead = !message.isRead;
    await message.save();

    return res.status(200).json({
      success: true,
      message: `Message marked as ${message.isRead ? 'read' : 'unread'}`,
      data: message
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a message from Admin Dashboard
 */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};