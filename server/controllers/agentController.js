import User from '../models/userModel.js';
import Recommendation from '../models/recommendationModel.js';
import { simulateScenario } from '../services/aiService.js';


export const getCustomers = async (req, res) => {
  try {
    // Agents can only see users (not other agents or admins)
    const customers = await User.find({ role: 'user' })
      .select('_id name email phone policyNumber region createdAt')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: customers.length,
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCustomerInsights = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get recommendations
    const recommendations = await Recommendation.find({
      user: userId,
      expiresAt: { $gt: new Date() }
    })
      .populate('recommendations.policy')
      .sort({ createdAt: -1 })
      .limit(3);
    
    // Get conversion metrics (placeholder - in a real app this would query actual conversion data)
    const conversionInsights = {
      conversionRate: Math.random() * 0.4 + 0.1, // Random value between 10-50%
      lastInteraction: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date in last 7 days
      interestCategories: ['health', 'life'].sort(() => Math.random() - 0.5), // Random order
      nextBestActions: [
        'Send renewal reminder email',
        'Suggest family coverage add-on',
        'Schedule policy review call'
      ].sort(() => Math.random() - 0.5).slice(0, 2) // Random 2 actions
    };
    
    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          policyNumber: user.policyNumber,
          region: user.region,
          preferences: user.preferences
        },
        recommendations,
        conversionInsights
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const simulateUpsellScenario = async (req, res) => {
  try {
    const { userId, scenario } = req.body;
    
    if (!userId || !scenario) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both user ID and scenario'
      });
    }
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Simulate the scenario
    const simulationResult = await simulateScenario(user, scenario);
    
    res.json({
      success: true,
      data: simulationResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};