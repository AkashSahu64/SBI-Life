import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['policy', 'claim', 'analytics', 'recommendation', 'custom'],
      required: true
    },
    format: {
      type: String,
      enum: ['pdf', 'excel', 'csv'],
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parameters: {
      type: Object,
      default: {}
    },
    status: {
      type: String,
      enum: ['processing', 'completed', 'failed'],
      default: 'processing'
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

const Report = mongoose.model('Report', reportSchema);

export default Report;