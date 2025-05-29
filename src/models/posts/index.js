import { getSession } from 'next-auth/react';
import dbConnect from '../../../lib/dbConnect';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await Post.find().populate('user').sort({ createdAt: -1 });
    res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: 'Unauthorized' });

    const { caption, image } = req.body;
    const post = await Post.create({
      user: session.user.id,
      caption,
      image,
    });

    res.status(201).json(post);
  }
}