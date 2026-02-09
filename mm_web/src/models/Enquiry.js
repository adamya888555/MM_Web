import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  artworkType: {
    type: String,
    enum: ['painting', 'tattoo'],
    required: [true, 'Artwork type is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  enquiryImage: {
    type: String, // URL of uploaded reference image
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'closed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);