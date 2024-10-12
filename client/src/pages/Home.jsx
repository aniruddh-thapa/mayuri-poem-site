import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Mayuri's Poems</h1>
        <p className='text-[#4b3621] text-xs sm:text-sm'>
        Welcome to my world of poems, where words come alive through the art of poetry. I'm Mayuri Sharma, and my passion lies in crafting poems that capture the beauty of emotions, the depth of life, and the subtleties of everyday moments. Through my writing, I explore love, melancholy, inspiration, and everything in between, hoping to resonate with your heart. Whether you're here to find comfort in familiar feelings or discover a fresh perspective, I invite you to journey with me through the world of poetry.
        </p>
        <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all poems
        </Link>
      </div>
      <div className='p-1 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-900 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
