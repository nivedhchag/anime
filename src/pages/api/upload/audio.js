import { getSession } from 'next-auth/react';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const fileStr = req.body.audio;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      resource_type: 'video', // Cloudinary treats audio as video
      folder: 'aniverse/audio',
    });

    res.status(200).json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Audio upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}