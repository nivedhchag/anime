import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {session && <CreatePost />}
      <div className="space-y-4">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}