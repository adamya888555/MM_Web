import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  enquiryId?: Types.ObjectId;
  createdAt: Date;
}

const ContactSchema: Schema<IContact> = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    trim: true,
  },
  enquiryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enquiry',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);