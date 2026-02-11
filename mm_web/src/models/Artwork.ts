import mongoose, { Schema, Document } from 'mongoose';

export interface IArtwork extends Document {
  title: string;
  image: string;
  description?: string;
  price: number;
  createdAt: Date;
}

const ArtworkSchema: Schema<IArtwork> = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  description: {
    type: String,
    trim: true,
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

export default mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);