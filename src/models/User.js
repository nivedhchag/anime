import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '/default-avatar.png' },
  coverPhoto: { type: String, default: '/default-cover.jpg' },
  bio: { type: String, default: '' },
  favoriteAnime: [{ type: String }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  badges: [{ type: String }],
  powerLevel: { type: Number, default: 1 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);