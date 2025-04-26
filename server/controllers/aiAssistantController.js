import AiInteraction from '../models/aiInteractionModel.js';
import Recommendation from '../models/recommendationModel.js';
import { generateAiResponse, generatePolicyRecommendations } from '../services/aiService.js';

// @desc    Get response from AI assistant
// @route   POST /api/ai/assistant
// @access  Private
export const getAiAssistantResponse = async (req, res) => {
  try {
    const { query, sessionId } = req.body;
    const userId = req.user._id;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a query'
      });
    }
    
    // Generate a session ID if not provided
    const session = sessionId || `session_${Date.now()}_${userId}`;
    
    // Get AI response
    const aiResponseData = await generateAiResponse(query, req.user);
    
    // Save interaction to database
    const aiInteraction = await AiInteraction.create({
      user: userId,
      session,
      query,
      context: {
        userRole: req.user.role,
        userPreferences: req.user.preferences
      },
      response: aiResponseData.response,
      metadata: {
        processingTime: aiResponseData.processingTime,
        tokenCount: aiResponseData.tokenCount,
        confidenceScore: aiResponseData.confidenceScore
      }
    });
    
    res.json({
      success: true,
      data: {
        response: aiResponseData.response,
        sessionId: session,
        interactionId: aiInteraction._id
      }
    });
  } catch (error) {
    res.status(500).json({
      error:true,
      success: false,
      message: error.message
    });
  }
};

// @desc    Get policy recommendations from AI
// @route   POST /api/ai/recommend
// @access  Private
export const getAiRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const { context } = req.body;
    
    // Generate AI recommendations
    const recommendationsData = await generatePolicyRecommendations(req.user, context);
    
    // Save recommendations to database
    const recommendation = await Recommendation.create({
      user: userId,
      recommendations: recommendationsData.recommendations,
      context: {
        userProfile: {
          region: req.user.region,
          preferences: req.user.preferences
        },
        ...context
      },
      generatedBy: 'ai'
    });
    
    // Populate policy details
    await recommendation.populate('recommendations.policy');
    
    res.json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    res.status(500).json({
      error:true,
      success: false,
      message: error.message
    });
  }
};

// @desc    Save feedback for AI interaction
// @route   POST /api/ai/feedback
// @access  Private
export const saveAiFeedback = async (req, res) => {
  try {
    const { interactionId, rating, comments, helpful } = req.body;
    
    if (!interactionId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an interaction ID'
      });
    }
    
    // Find the interaction
    const interaction = await AiInteraction.findById(interactionId);
    
    if (!interaction) {
      return res.status(404).json({
        success: false,
        message: 'AI interaction not found'
      });
    }
    
    // Check if user owns this interaction
    if (interaction.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to provide feedback for this interaction'
      });
    }
    
    // Update feedback
    interaction.feedback = {
      rating: rating || interaction.feedback?.rating,
      comments: comments || interaction.feedback?.comments,
      helpful: helpful !== undefined ? helpful : interaction.feedback?.helpful
    };
    
    await interaction.save();
    
    res.json({
      success: true,
      data: {
        message: 'Feedback saved successfully',
        feedback: interaction.feedback
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};