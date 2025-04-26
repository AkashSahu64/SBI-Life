import mongoose from 'mongoose';

const aiInteractionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    session: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    },
    context: {
      type: Object,
      default: {}
    },
    response: {
      type: String,
      required: true
    },
    metadata: {
      processingTime: Number,
      tokenCount: Number,
      confidenceScore: Number
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
      },
      comments: String,
      helpful: Boolean
    },
    tags: [String]
  },
  {
    timestamps: true
  }
);

const AiInteraction = mongoose.model('AiInteraction', aiInteractionSchema);

export default AiInteraction;