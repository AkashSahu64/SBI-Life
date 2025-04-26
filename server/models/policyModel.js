import mongoose from 'mongoose';

const policySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a policy name'],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['health', 'life', 'auto', 'home', 'travel', 'business', 'other']
    },
    coverage: {
      type: Object,
      required: [true, 'Please add coverage details']
    },
    premium: {
      base: {
        type: Number,
        required: [true, 'Please add a base premium amount']
      },
      factors: {
        type: Map,
        of: Number,
        default: {}
      }
    },
    eligibility: {
      minAge: Number,
      maxAge: Number,
      region: [String],
      occupation: [String],
      healthConditions: [String]
    },
    benefits: [String],
    exclusions: [String],
    documents: [String],
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for faster searches
policySchema.index({ name: 1, category: 1, isActive: 1 });

const Policy = mongoose.model('Policy', policySchema);

export default Policy;