import twilio from 'twilio';
import User from '../models/userModel.js';

/**
 * Send WhatsApp message to a user
 * @param {string} userId - User ID
 * @param {string} message - Message content
 * @returns {Promise<Object>} - Message sending result
 */
export const sendWhatsAppMessage = async (userId, message) => {
  try {
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user wants WhatsApp notifications
    if (user.preferences?.notifications?.whatsapp === false) {
      return {
        success: false,
        message: 'User has opted out of WhatsApp notifications'
      };
    }
    
    // Initialize Twilio client
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);
    
    // Format phone number (remove any non-digit characters and ensure it starts with country code)
    let phoneNumber = user.phone.replace(/\D/g, '');
    if (!phoneNumber.startsWith('+')) {
      phoneNumber = `+${phoneNumber}`;
    }
    
    // In development, log instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('WhatsApp message would be sent:', {
        to: `whatsapp:${phoneNumber}`,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        body: message
      });
      return {
        success: true,
        message: 'WhatsApp message log (development mode)'
      };
    }
    
    // Send message
    const twilioMessage = await client.messages.create({
      to: `whatsapp:${phoneNumber}`,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      body: message
    });
    
    return {
      success: true,
      sid: twilioMessage.sid
    };
  } catch (error) {
    console.error('WhatsApp Service Error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};