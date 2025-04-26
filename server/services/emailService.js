import nodemailer from 'nodemailer';
import User from '../models/userModel.js';

/**
 * Send email to a user
 * @param {string} userId - User ID
 * @param {string} subject - Email subject
 * @param {string} message - Email message
 * @returns {Promise<Object>} - Email sending result
 */
export const sendEmail = async (userId, subject, message) => {
  try {
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if user wants email notifications
    if (user.preferences?.notifications?.email === false) {
      return {
        success: false,
        message: 'User has opted out of email notifications'
      };
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Email options
    const mailOptions = {
      from: `"SmartLife AI" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #0047AB; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">SmartLife AI</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #ddd; border-top: none;">
            <h2 style="color: #333;">${subject}</h2>
            <p style="color: #555; line-height: 1.6;">${message}</p>
            <p style="margin-top: 30px; color: #777;">
              If you have any questions, please contact our support team.
            </p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            <p>SmartLife AI Insurance, Inc.</p>
            <p>
              This email was sent to ${user.email}. If you prefer not to receive these emails,
              you can <a href="#" style="color: #0047AB;">update your preferences</a>.
            </p>
          </div>
        </div>
      `
    };
    
    // In development, log instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent:', mailOptions);
      return {
        success: true,
        message: 'Email log (development mode)'
      };
    }
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email Service Error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};