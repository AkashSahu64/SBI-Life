import { sendEmail } from '../services/emailService.js';
import { sendWhatsAppMessage } from '../services/whatsappService.js';
import Notification from '../models/notificationModel.js';


export const sendEmailNotification = async (req, res) => {
  try {
    const { userId, subject, message, type, priority, relatedTo } = req.body;
    
    if (!userId || !subject || !message || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId, subject, message, and type'
      });
    }
    
    // Send the email
    const emailResult = await sendEmail(userId, subject, message);
    
    // Create notification record
    const notification = await Notification.create({
      user: userId,
      title: subject,
      message,
      type,
      priority: priority || 'medium',
      relatedTo: relatedTo || { model: null, id: null },
      channels: {
        app: {
          sent: true,
          sentAt: new Date()
        },
        email: {
          sent: emailResult.success,
          sentAt: emailResult.success ? new Date() : null
        }
      }
    });
    
    res.status(201).json({
      success: true,
      data: {
        notification,
        emailSent: emailResult.success
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const sendWhatsAppNotification = async (req, res) => {
  try {
    const { userId, message, type, priority, relatedTo } = req.body;
    
    if (!userId || !message || !type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId, message, and type'
      });
    }
    
    // Send the WhatsApp message
    const whatsappResult = await sendWhatsAppMessage(userId, message);
    
    // Create notification record
    const notification = await Notification.create({
      user: userId,
      title: 'WhatsApp Notification',
      message,
      type,
      priority: priority || 'medium',
      relatedTo: relatedTo || { model: null, id: null },
      channels: {
        app: {
          sent: true,
          sentAt: new Date()
        },
        whatsapp: {
          sent: whatsappResult.success,
          sentAt: whatsappResult.success ? new Date() : null
        }
      }
    });
    
    res.status(201).json({
      success: true,
      data: {
        notification,
        whatsappSent: whatsappResult.success
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};