import cloudinary from 'cloudinary';
import User from '../models/userModel.js';
import Policy from '../models/policyModel.js';
import Claim from '../models/claimModel.js';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Generate a report based on type and format
 * @param {Object} user - User object
 * @param {string} type - Report type
 * @param {string} format - Report format
 * @param {Object} parameters - Additional parameters
 * @returns {Promise<Object>} - Generated report data
 */
export const generateReport = async (user, type, format, parameters = {}) => {
  try {
    // In a real implementation, this would generate actual reports
    // For demonstration, we'll return mock data
    
    let reportData;
    
    switch (type) {
      case 'policy':
        reportData = await generatePolicyReport(user, format, parameters);
        break;
      case 'claim':
        reportData = await generateClaimReport(user, format, parameters);
        break;
      case 'analytics':
        reportData = await generateAnalyticsReport(user, format, parameters);
        break;
      default:
        throw new Error(`Unsupported report type: ${type}`);
    }
    
    // In a real implementation, this would upload to Cloudinary
    // For demonstration, we'll return a mock URL
    const timestamp = Date.now();
    const reportName = `report_${type}_${user._id}_${timestamp}.${format}`;
    const mockFileUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/v${timestamp}/${reportName}`;
    
    return {
      fileUrl: mockFileUrl,
      fileSize: Math.floor(Math.random() * 1000000) + 500000 // Random file size between 500KB and 1.5MB
    };
  } catch (error) {
    console.error('Report Service Error:', error);
    throw new Error(`Failed to generate ${type} report: ${error.message}`);
  }
};

/**
 * Generate a policy report
 * @param {Object} user - User object
 * @param {string} format - Report format
 * @param {Object} parameters - Additional parameters
 * @returns {Promise<Object>} - Report data
 */
const generatePolicyReport = async (user, format, parameters = {}) => {
  // Get policies for user (in a real app, would filter by user's policies)
  const policies = await Policy.find({ isActive: true }).limit(10);
  
  // Generate report data
  const reportData = {
    title: 'Policy Report',
    user: {
      name: user.name,
      email: user.email,
      policyNumber: user.policyNumber
    },
    generatedAt: new Date(),
    policies: policies.map(policy => ({
      name: policy.name,
      category: policy.category,
      premium: policy.premium.base,
      coverage: policy.coverage
    }))
  };
  
  return reportData;
};

/**
 * Generate a claim report
 * @param {Object} user - User object
 * @param {string} format - Report format
 * @param {Object} parameters - Additional parameters
 * @returns {Promise<Object>} - Report data
 */
const generateClaimReport = async (user, format, parameters = {}) => {
  // Get claims for user
  const claims = await Claim.find({ user: user._id }).populate('policy');
  
  // Generate report data
  const reportData = {
    title: 'Claim Report',
    user: {
      name: user.name,
      email: user.email,
      policyNumber: user.policyNumber
    },
    generatedAt: new Date(),
    claims: claims.map(claim => ({
      claimNumber: claim.claimNumber,
      policyName: claim.policy.name,
      incidentDate: claim.incidentDate,
      amount: claim.amount,
      status: claim.status,
      approvedAmount: claim.approvedAmount
    })),
    summary: {
      totalClaims: claims.length,
      pendingClaims: claims.filter(c => c.status === 'pending' || c.status === 'reviewing').length,
      approvedClaims: claims.filter(c => c.status === 'approved' || c.status === 'paid').length,
      totalAmount: claims.reduce((sum, claim) => sum + claim.amount, 0),
      totalApprovedAmount: claims.reduce((sum, claim) => sum + (claim.approvedAmount || 0), 0)
    }
  };
  
  return reportData;
};

/**
 * Generate an analytics report
 * @param {Object} user - User object
 * @param {string} format - Report format
 * @param {Object} parameters - Additional parameters
 * @returns {Promise<Object>} - Report data
 */
const generateAnalyticsReport = async (user, format, parameters = {}) => {
  // Generate mock analytics data
  const reportData = {
    title: 'Analytics Report',
    user: {
      name: user.name,
      email: user.email,
      policyNumber: user.policyNumber
    },
    generatedAt: new Date(),
    parameters,
    analytics: {
      policyDistribution: {
        health: 45,
        life: 30,
        auto: 15,
        home: 10
      },
      claimTrends: [
        { month: 'Jan', claims: 3 },
        { month: 'Feb', claims: 2 },
        { month: 'Mar', claims: 4 },
        { month: 'Apr', claims: 1 },
        { month: 'May', claims: 5 },
        { month: 'Jun', claims: 2 }
      ],
      customerSatisfaction: {
        overall: 4.2,
        claimResolution: 3.9,
        customerService: 4.5,
        policyOptions: 4.1
      }
    }
  };
  
  return reportData;
};