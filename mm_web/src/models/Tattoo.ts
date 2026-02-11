import mongoose, { Schema, Document } from 'mongoose';

export interface ITattoo extends Document {
  title: string;
  image: string;
  price: number;
  createdAt: Date;
}

const TattooSchema: Schema<ITattoo> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Tattoo || mongoose.model<ITattoo>('Tattoo', TattooSchema);
