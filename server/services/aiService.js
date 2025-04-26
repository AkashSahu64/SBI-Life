import fetch from 'node-fetch';
import Policy from '../models/policyModel.js';

/**
 * Generate AI response using HuggingFace Inference API
 * @param {string} query - User's query
 * @param {Object} user - User object
 * @returns {Promise<Object>} - AI response data
 */
export const generateAiResponse = async (query, user) => {
  try {
    const startTime = Date.now();
    
    // Simple context preparation
    const context = `You are an insurance assistant for SmartLife AI. The user's name is ${user.name} and they are from ${user.region}.`;
    
    // In a real implementation, this would call the HuggingFace API
    // For demonstration, we'll create a mock response
    const apiUrl = process.env.HUGGINGFACE_API_URL;
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    
    // Simulated API call (would be replaced with actual API call)
    /*
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: `${context}\n\nUser: ${query}\n\nAssistant:`
      })
    });
    
    const data = await response.json();
    const aiResponse = data.generated_text;
    */
    
    // Mock response - in production, use the commented code above
    let aiResponse = '';
    if (query.toLowerCase().includes('policy')) {
      aiResponse = `Based on your profile, I'd recommend our Comprehensive Life Care policy that covers health emergencies and has additional retirement benefits. Would you like me to provide more details about this policy?`;
    } else if (query.toLowerCase().includes('claim')) {
      aiResponse = `To file a claim, you'll need to provide your policy number, description of the incident, date of occurrence, and any supporting documentation. You can start the process from your dashboard or I can guide you through it now.`;
    } else if (query.toLowerCase().includes('coverage')) {
      aiResponse = `Your current policy covers medical emergencies, hospitalization, and outpatient care. However, it doesn't include dental and vision coverage. Would you like to explore options to add these to your existing policy?`;
    } else {
      aiResponse = `Thank you for your question. As your SmartLife AI assistant, I'm here to help with all your insurance needs. How can I assist you further with your insurance policies or claims?`;
    }
    
    const endTime = Date.now();
    const processingTime = endTime - startTime;
    
    return {
      response: aiResponse,
      processingTime,
      tokenCount: Math.floor(aiResponse.length / 4), // Simplified token count estimation
      confidenceScore: 0.92 // Mock confidence score
    };
  } catch (error) {
    console.error('AI Service Error:', error);
    throw new Error('Failed to generate AI response');
  }
};

/**
 * Generate policy recommendations based on user profile
 * @param {Object} user - User object
 * @param {Object} context - Additional context
 * @returns {Promise<Object>} - Recommendations data
 */
export const generatePolicyRecommendations = async (user, context = {}) => {
  try {
    // Get policies from database
    const policies = await Policy.find({ isActive: true }).lean();
    
    if (!policies || policies.length === 0) {
      throw new Error('No active policies found');
    }
    
    // In a real implementation, this would use an AI model to rank policies
    // For demonstration, we'll use a simple ranking algorithm
    
    // Filter policies based on user preferences
    const userCategories = user.preferences?.policyCategories || ['health', 'life'];
    const filteredPolicies = policies.filter(policy => 
      userCategories.includes(policy.category)
    );
    
    // Score and rank policies (simplified version)
    const scoredPolicies = filteredPolicies.map(policy => {
      // Simple scoring based on matching category
      let score = userCategories.includes(policy.category) ? 75 : 50;
      
      // Adjust score based on risk tolerance
      if (user.preferences?.riskTolerance === 'low' && policy.premium.base < 500) {
        score += 10;
      } else if (user.preferences?.riskTolerance === 'high' && policy.coverage.amount > 100000) {
        score += 15;
      }
      
      // Random factor for demonstration
      score += Math.floor(Math.random() * 15);
      
      // Cap at 100
      score = Math.min(score, 100);
      
      return {
        policy: policy._id,
        score,
        reasons: [
          `Matches your preferred category: ${policy.category}`,
          `Aligns with your risk tolerance: ${user.preferences?.riskTolerance || 'medium'}`
        ],
        customPremium: policy.premium.base
      };
    });
    
    // Sort and take top 3
    const topRecommendations = scoredPolicies
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    return {
      recommendations: topRecommendations
    };
  } catch (error) {
    console.error('AI Recommendation Error:', error);
    throw new Error('Failed to generate policy recommendations');
  }
};

/**
 * Generate purchase likelihood prediction
 * @param {Object} user - User object
 * @param {Object} policy - Policy object
 * @param {Object} userBehavior - User behavior data
 * @returns {Promise<Object>} - Prediction data
 */
export const generatePurchasePrediction = async (user, policy, userBehavior = {}) => {
  try {
    // In a real implementation, this would use an ML model
    // For demonstration, we'll create a simple prediction
    
    // Base likelihood
    let likelihood = 0.5;
    
    // Adjust based on policy category matching user preferences
    if (user.preferences?.policyCategories?.includes(policy.category)) {
      likelihood += 0.15;
    }
    
    // Adjust based on user behavior (if provided)
    if (userBehavior.viewCount > 3) {
      likelihood += 0.1;
    }
    
    if (userBehavior.timeSpent > 120) { // seconds
      likelihood += 0.05;
    }
    
    // Cap between 0 and 1
    likelihood = Math.max(0, Math.min(1, likelihood));
    
    return {
      likelihood,
      percentLikelihood: Math.round(likelihood * 100),
      factors: [
        {
          name: 'Category match',
          impact: user.preferences?.policyCategories?.includes(policy.category) ? 'positive' : 'negative'
        },
        {
          name: 'Previous engagement',
          impact: userBehavior.viewCount > 3 ? 'positive' : 'neutral'
        }
      ],
      suggestedActions: [
        'Send personalized email with policy details',
        'Offer free consultation call'
      ]
    };
  } catch (error) {
    console.error('Purchase Prediction Error:', error);
    throw new Error('Failed to generate purchase prediction');
  }
};

/**
 * Generate user segment
 * @param {Array} users - Array of user objects
 * @param {Array} criteria - Segmentation criteria
 * @returns {Promise<Object>} - Segmentation results
 */
export const generateUserSegment = async (users, criteria = []) => {
  try {
    // In a real implementation, this would use clustering algorithms
    // For demonstration, we'll create simple segments
    
    // Segment by region
    const regionSegments = {};
    users.forEach(user => {
      const region = user.region || 'Unspecified';
      if (!regionSegments[region]) {
        regionSegments[region] = [];
      }
      regionSegments[region].push(user._id);
    });
    
    // Segment by risk tolerance
    const riskSegments = {
      low: [],
      medium: [],
      high: []
    };
    
    users.forEach(user => {
      const riskTolerance = user.preferences?.riskTolerance || 'medium';
      riskSegments[riskTolerance].push(user._id);
    });
    
    // Segment by notification preferences
    const notificationSegments = {
      email: [],
      sms: [],
      whatsapp: []
    };
    
    users.forEach(user => {
      if (user.preferences?.notifications?.email) {
        notificationSegments.email.push(user._id);
      }
      if (user.preferences?.notifications?.sms) {
        notificationSegments.sms.push(user._id);
      }
      if (user.preferences?.notifications?.whatsapp) {
        notificationSegments.whatsapp.push(user._id);
      }
    });
    
    return {
      segments: {
        byRegion: regionSegments,
        byRiskTolerance: riskSegments,
        byNotificationPreference: notificationSegments
      },
      segmentCounts: {
        totalUsers: users.length,
        byRegion: Object.entries(regionSegments).map(([region, users]) => ({
          name: region,
          count: users.length
        })),
        byRiskTolerance: Object.entries(riskSegments).map(([risk, users]) => ({
          name: risk,
          count: users.length
        }))
      }
    };
  } catch (error) {
    console.error('User Segmentation Error:', error);
    throw new Error('Failed to generate user segments');
  }
};

/**
 * Simulate a scenario for upsell testing
 * @param {Object} user - User object
 * @param {Object} scenario - Scenario details
 * @returns {Promise<Object>} - Simulation results
 */
export const simulateScenario = async (user, scenario = {}) => {
  try {
    // In a real implementation, this would use an AI model to simulate user responses
    // For demonstration, we'll create a simple simulation
    
    const scenarioType = scenario.type || 'email_upsell';
    const product = scenario.product || 'premium_health';
    
    // Generate random success probability based on scenario
    let successProbability = 0.5;
    
    // Adjust based on user preferences
    if (user.preferences?.policyCategories?.includes('health') && product.includes('health')) {
      successProbability += 0.2;
    }
    
    if (scenarioType === 'email_upsell' && user.preferences?.notifications?.email) {
      successProbability += 0.1;
    } else if (scenarioType === 'whatsapp_upsell' && user.preferences?.notifications?.whatsapp) {
      successProbability += 0.15;
    }
    
    // Cap between 0 and 1
    successProbability = Math.max(0, Math.min(1, successProbability));
    
    return {
      scenarioType,
      product,
      user: {
        id: user._id,
        name: user.name
      },
      results: {
        successProbability,
        percentSuccess: Math.round(successProbability * 100),
        expectedConversion: Math.random() < successProbability,
        reasoning: [
          `User's preferences ${user.preferences?.policyCategories?.includes('health') ? 'include' : 'don\'t include'} the product category`,
          `User ${user.preferences?.notifications?.[scenarioType.split('_')[0]] ? 'prefers' : 'doesn\'t prefer'} communication via ${scenarioType.split('_')[0]}`
        ]
      },
      recommendations: [
        `Highlight key benefits of ${product.replace('_', ' ')}`,
        'Personalize message with user name and current policy details',
        'Include limited-time offer to create urgency'
      ]
    };
  } catch (error) {
    console.error('Scenario Simulation Error:', error);
    throw new Error('Failed to simulate scenario');
  }
};