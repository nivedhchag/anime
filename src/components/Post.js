import { useState } from 'react';
import { HeartIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline';

export default function Post({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${post._id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment }),
    });
    const data = await res.json();
    setComments([...comments, data]);
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2 mb-2">
        <img 
          src={post.user.avatar} 
          alt={post.user.username} 
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">{post.user.username}</span>
      </div>
      
      {post.image && (
        <img src={post.image} alt="Post" className="w-full rounded mb-2" />
      )}
      
      <p className="mb-2">{post.caption}</p>
      
      <div className="flex space-x-4 text-gray-500">
        <button className="flex items-center space-x-1">
          <HeartIcon className="h-5 w-5" />
          <span>{post.likes.length}</span>
        </button>
        <button 
          className="flex items-center space-x-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChatAltIcon className="h-5 w-5" />
          <span>{comments.length}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ShareIcon className="h-5 w-5" />
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4">
          <div className="space-y-2">
            {comments.map(comment => (
              <div key={comment._id} className="flex space-x-2">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.username} 
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="font-semibold">{comment.user.username}</span>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-2 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 border rounded-l px-2 py-1"
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-3 py-1 rounded-r"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}