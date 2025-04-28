import Policy from '../models/policyModel.js';


export const getPolicies = async (req, res) => {
  try {
    const { category, active } = req.query;
    
    // Build query
    const query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (active !== undefined) {
      query.isActive = active === 'true';
    }
    
    const policies = await Policy.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: policies.length,
      data: policies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const createPolicy = async (req, res) => {
  try {
    // Add user ID to the policy
    req.body.createdBy = req.user._id;
    
    const policy = await Policy.create(req.body);
    
    res.status(201).json({
      success: true,
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePolicy = async (req, res) => {
  try {
    let policy = await Policy.findById(req.params.id);
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }
    
    policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.json({
      success: true,
      data: policy
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found'
      });
    }
    
    await policy.deleteOne();
    
    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const comparePolicies = async (req, res) => {
  try {
    const { policyIds } = req.body;
    
    if (!policyIds || !Array.isArray(policyIds) || policyIds.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least two policy IDs for comparison'
      });
    }
    
    const policies = await Policy.find({
      _id: { $in: policyIds },
      isActive: true
    });
    
    if (policies.length !== policyIds.length) {
      return res.status(404).json({
        success: false,
        message: 'One or more policies not found or are inactive'
      });
    }
    
    // Create comparison structure
    const comparison = {
      policies: policies.map(p => ({
        id: p._id,
        name: p.name,
        category: p.category,
        premium: p.premium.base,
        coverage: p.coverage,
        benefits: p.benefits,
        exclusions: p.exclusions
      })),
      comparisonPoints: [
        'premium',
        'coverage',
        'benefits',
        'exclusions'
      ]
    };
    
    res.json({
      success: true,
      data: comparison
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};