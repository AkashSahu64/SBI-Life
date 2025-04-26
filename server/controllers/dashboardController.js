import Policy from '../models/policyModel.js';
import Claim from '../models/claimModel.js';
import Recommendation from '../models/recommendationModel.js';
import Notification from '../models/notificationModel.js';

// @desc    Get dashboard overview data
// @route   GET /api/dashboard
// @access  Private
export const getDashboardOverview = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get count of policies related to user
    const policies = await Policy.find({
      $or: [
        { isActive: true },
        { createdBy: userId }
      ]
    }).limit(5);
    
    // Get recent claims
    const claims = await Claim.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(3);
    
    // Get any alerts/notifications
    const alerts = await Notification.find({ 
      user: userId,
      'channels.app.read': false,
      expiresAt: { $gt: new Date() }
    }).sort({ priority: -1, createdAt: -1 }).limit(5);
    
    // Get metrics
    const totalClaims = await Claim.countDocuments({ user: userId });
    const pendingClaims = await Claim.countDocuments({ 
      user: userId,
      status: { $in: ['pending', 'reviewing'] }
    });
    const approvedClaims = await Claim.countDocuments({ 
      user: userId,
      status: 'approved'
    });
    
    // Calculate claim approval rate
    const approvalRate = totalClaims > 0 
      ? Math.round((approvedClaims / totalClaims) * 100)
      : 0;
    
    res.json({
      success: true,
      data: {
        policySummary: {
          total: policies.length,
          categories: policies.reduce((acc, policy) => {
            if (!acc[policy.category]) {
              acc[policy.category] = 0;
            }
            acc[policy.category]++;
            return acc;
          }, {})
        },
        claimMetrics: {
          total: totalClaims,
          pending: pendingClaims,
          approved: approvedClaims,
          approvalRate: `${approvalRate}%`
        },
        recentClaims: claims,
        alerts: alerts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get recommendations for dashboard
// @route   GET /api/dashboard/recommendations
// @access  Private
export const getDashboardRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get latest recommendations
    const recommendations = await Recommendation.find({
      user: userId,
      expiresAt: { $gt: new Date() },
      'interactionStatus.purchased': false
    })
      .populate('recommendations.policy')
      .sort({ createdAt: -1 })
      .limit(3);
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get notifications for dashboard
// @route   GET /api/dashboard/notifications
// @access  Private
export const getDashboardNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get notifications
    const notifications = await Notification.find({
      user: userId,
      expiresAt: { $gt: new Date() }
    }).sort({ priority: -1, createdAt: -1 }).limit(10);
    
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};