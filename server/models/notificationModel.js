import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['renewal', 'claim', 'payment', 'recommendation', 'policy_update', 'other'],
      required: true
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    relatedTo: {
      model: {
        type: String,
        enum: ['Policy', 'Claim', 'Recommendation', null],
        default: null
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'relatedTo.model',
        default: null
      }
    },
    channels: {
      app: {
        sent: { type: Boolean, default: false },
        sentAt: Date,
        read: { type: Boolean, default: false },
        readAt: Date
      },
      email: {
        sent: { type: Boolean, default: false },
        sentAt: Date
      },
      sms: {
        sent: { type: Boolean, default: false },
        sentAt: Date
      },
      whatsapp: {
        sent: { type: Boolean, default: false },
        sentAt: Date
      }
    },
    expiresAt: {
      type: Date,
      default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days from now
    }
  },
  {
    timestamps: true
  }
);

// Index for faster retrieval of unread notifications
notificationSchema.index(
  { user: 1, 'channels.app.read': 1, expiresAt: 1 },
  { name: 'unread_notifications' }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;