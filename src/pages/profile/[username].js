import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Post from '../../components/Post';

export default function ProfilePage() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!username) return;
    
    const fetchData = async () => {
      const [userRes, postsRes] = await Promise.all([
        fetch(`/api/users/${username}`),
        fetch(`/api/users/${username}/posts`)
      ]);
      
      setUser(await userRes.json());
      setPosts(await postsRes.json());
    };
    fetchData();
  }, [username]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="relative">
        <img 
          src={user.coverPhoto || '/default-cover.jpg'} 
          alt="Cover" 
          className="w-full h-48 object-cover"
        />
        <div className="absolute -bottom-16 left-4">
          <img 
            src={user.avatar} 
            alt={user.username}
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 px-4">
        <h1 className="text-3xl font-bold">{user.username}</h1>
        <p className="text-gray-600">{user.bio}</p>
        
        <div className="flex space-x-4 mt-4">
          <div>
            <span className="font-bold">{user.followers.length}</span> Followers
          </div>
          <div>
            <span className="font-bold">{user.following.length}</span> Following
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-semibold px-4">Posts</h2>
        <div className="space-y-4 mt-4">
          {posts.map(post => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}