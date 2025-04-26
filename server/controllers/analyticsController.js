import User from '../models/userModel.js';
import Policy from '../models/policyModel.js';
import AiInteraction from '../models/aiInteractionModel.js';
import { generatePurchasePrediction, generateUserSegment } from '../services/aiService.js';

// @desc    Predict purchase likelihood
// @route   POST /api/analytics/predict
// @access  Private
export const predictPurchaseLikelihood = async (req, res) => {
  try {
    const { policyId, userBehavior } = req.body;
    
    if (!policyId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a policy ID'
      });
    }
    
    // Find the policy
    const policy = await Policy.findById(policyId);
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }
    
    // Generate prediction
    const prediction = await generatePurchasePrediction(
      req.user,
      policy,
      userBehavior || {}
    );
    
    res.json({
      success: true,
      data: {
        policyId,
        policyName: policy.name,
        prediction
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get behavior trend analysis
// @route   GET /api/analytics/trends
// @access  Private/Admin
export const getBehaviorTrends = async (req, res) => {
  try {
    // Get AI interactions for trend analysis
    const interactions = await AiInteraction.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 },
          averageRating: { $avg: "$feedback.rating" },
          helpfulCount: {
            $sum: {
              $cond: [{ $eq: ["$feedback.helpful", true] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    // Get user registration trends
    const userTrends = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        aiInteractions: interactions,
        userRegistrations: userTrends
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Generate AI-driven user segmentation
// @route   POST /api/analytics/segment
// @access  Private/Admin
export const segmentUsers = async (req, res) => {
  try {
    const { criteria } = req.body;
    
    if (!criteria || !Array.isArray(criteria) || criteria.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide segmentation criteria'
      });
    }
    
    // Find users based on criteria
    const users = await User.find({});
    
    // Generate segments using AI
    const segments = await generateUserSegment(users, criteria);
    
    res.json({
      success: true,
      data: segments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};