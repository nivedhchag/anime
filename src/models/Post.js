import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  // ... existing fields
  hashtags: [{ type: String, lowercase: true }],
  // ... rest of schema
});

// Add text index for searching
PostSchema.index({ hashtags: 'text', caption: 'text' });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);