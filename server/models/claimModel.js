import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    policy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Policy',
      required: true
    },
    claimNumber: {
      type: String,
      required: true,
      unique: true
    },
    incidentDate: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    documents: [String],
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'approved', 'rejected', 'paid'],
      default: 'pending'
    },
    approvedAmount: {
      type: Number,
      default: 0
    },
    notes: [
      {
        text: String,
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    resolution: {
      status: {
        type: String,
        enum: ['resolved', 'escalated', 'appealed', 'closed'],
        default: null
      },
      date: Date,
      details: String
    }
  },
  {
    timestamps: true
  }
);

const Claim = mongoose.model('Claim', claimSchema);

export default Claim;