import multer from 'multer';
import Report from '../models/reportModel.js';
import { generateReport } from '../services/reportService.js';

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/uploads'); // Temporary storage
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File filter for allowed types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/vnd.ms-excel' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format'), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});


export const createReport = async (req, res) => {
  try {
    const { name, type, format, parameters } = req.body;
    
    if (!name || !type || !format) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, type, and format'
      });
    }
    
    // Generate the report
    const reportData = await generateReport(req.user, type, format, parameters);
    
    // Save report to database
    const report = await Report.create({
      name,
      type,
      format,
      fileUrl: reportData.fileUrl,
      fileSize: reportData.fileSize,
      user: req.user._id,
      parameters: parameters || {},
      status: 'completed'
    });
    
    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


export const downloadReport = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    // Find the report
    const report = await Report.findById(fileId);
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    // Check if user owns this report or is admin
    if (report.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to download this report'
      });
    }
    
    // Redirect to the file URL 
    res.redirect(report.fileUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};