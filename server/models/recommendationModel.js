import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recommendations: [
      {
        policy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Policy',
          required: true
        },
        score: {
          type: Number,
          required: true,
          min: 0,
          max: 100
        },
        reasons: [String],
        customPremium: Number
      }
    ],
    context: {
      userProfile: Object,
      triggers: [String],
      lifeEvents: [String]
    },
    interactionStatus: {
      viewed: {
        type: Boolean,
        default: false
      },
      clicked: {
        type: Boolean,
        default: false
      },
      purchased: {
        type: Boolean,
        default: false
      }
    },
    generatedBy: {
      type: String,
      enum: ['ai', 'agent', 'system'],
      default: 'ai'
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

// Index for faster retrieval of active recommendations
recommendationSchema.index(
  { user: 1, 'interactionStatus.purchased': 1, expiresAt: 1 },
  { name: 'active_recommendations' }
);

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

export default Recommendation;