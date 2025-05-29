import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Post from '../../components/Post';

export default function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!tag) return;
    
    const fetchPosts = async () => {
      const res = await fetch(`/api/posts/hashtag?tag=${encodeURIComponent(tag)}`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [tag]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">#{tag}</h1>
      <div className="space-y-4">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}