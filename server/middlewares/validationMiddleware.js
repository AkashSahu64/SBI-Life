// Generic validation middleware creator
export const validate = (validationSchema) => {
  return (req, res, next) => {
    try {
      const { error } = validationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

// AI bias check middleware
export const aiResponseBiasCheck = async (req, res, next) => {
  try {
    // This is a placeholder for a more sophisticated bias checking algorithm
    const { response } = req.body;
    
    if (!response) {
      return next();
    }
    
    // Check for potentially biased language
    const biasedTerms = [
      'always', 'never', 'all', 'none', 'everyone', 'nobody', 
      'definitely', 'absolutely', 'guaranteed', 'certainly'
    ];
    
    let hasBiasedTerms = false;
    const responseText = response.toLowerCase();
    
    for (const term of biasedTerms) {
      if (responseText.includes(term)) {
        hasBiasedTerms = true;
        break;
      }
    }
    
    if (hasBiasedTerms) {
      req.aiResponseWarning = 'Potential bias detected in AI response';
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Rate limiting for specific routes
export const apiRateLimit = (limit, windowMs) => {
  return (req, res, next) => {
    // Implementation would use a rate limiter library or custom logic
    // This is a placeholder for the actual implementation
    next();
  };
};