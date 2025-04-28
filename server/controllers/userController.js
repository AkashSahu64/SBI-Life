import { errorHandler } from '../middlewares/errorMiddleware.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const registerUser = async (req, res) => {
  const { name, email, password, phone, policyNumber, role, region } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      policyNumber,
      role,
      region
    });
    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          policyNumber: user.policyNumber,
          role: user.role,
          region: user.region,
          preferences: user.preferences
        }
      });
    }
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find
    { email };
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        policyNumber: user.policyNumber,
        role: user.role,
        region: user.region,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//logout user 
export const logoutUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to logout',
      });
    }

    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'None', 
      secure: true,     
    });

    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while logging out',
    });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        policyNumber: user.policyNumber,
        role: user.role,
        region: user.region,
        preferences: user.preferences,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update only allowed fields
    const { name, phone, region, preferences } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (region) user.region = region;
    if (preferences) {
      // Merge preferences rather than replace
      user.preferences = {
        ...user.preferences,
        ...preferences
      };
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        policyNumber: updatedUser.policyNumber,
        role: updatedUser.role,
        region: updatedUser.region,
        preferences: updatedUser.preferences
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User removed'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};