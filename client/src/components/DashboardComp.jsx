import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import sidebarImage from '../assets/lolo.jpg'; // Import the background image

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  // Custom background image style
  const backgroundStyle = {
    backgroundImage: `url(${sidebarImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Ensures text is visible over the image
  };

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        {/* Total Users Section */}
        <div
          className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-900 text-md uppercase'>Total Users</h3>
              <p className='text-2xl text-blue-900'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-900  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-900 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-900'>Last month</div>
          </div>
        </div>

        {/* Total Comments Section */}
        <div
          className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-900 text-md uppercase'>Total Comments</h3>
              <p className='text-2xl text-blue-600'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-900 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-900'>Last month</div>
          </div>
        </div>

        {/* Total Posts Section */}
        <div
          className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-900 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl text-green-700'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-900 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-900'>Last month</div>
          </div>
        </div>
      </div>

      {/* Recent Users, Comments, Posts Sections */}
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        {/* Recent Users Section */}
        <div
          className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2 text-black'>Recent users</h1>
            <Button gradientDuoTone='tealToLime'>
              <Link to={'/dashboard?tab=users'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">User image</Table.HeadCell>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className='divide-y'>
                  <Table.Row className="bg-[#f5e6c1] dark:border-[#7d6245] dark:bg-[#e6c8a5]">
                    <Table.Cell className="text-[#4b3621]">
                      <img
                        src={user.profilePicture}
                        alt='user'
                        className='w-10 h-10 rounded-full bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className="text-[#4b3621]">{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* Recent Comments Section */}
        <div
          className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2 text-black'>Recent comments</h1>
            <Button gradientDuoTone='tealToLime'>
              <Link to={'/dashboard?tab=comments'}>See all</Link>
            </Button>
          </div>
          <Table hoverable >
            <Table.Head>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Comment content</Table.HeadCell>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className='divide-y'>
                  <Table.Row className="bg-[#f5e6c1] dark:border-[#7d6245] dark:bg-[#e6c8a5]">
                    <Table.Cell className="w-96 text-[#4b3621]">
                      <p className='line-clamp-2'>{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell className="text-[#4b3621]">{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>

        {/* Recent Posts Section */}
        <div
          className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'
          style={backgroundStyle} // Apply the background image
        >
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2 text-black'>Recent posts</h1>
            <Button gradientDuoTone='tealToLime'>
              <Link to={'/dashboard?tab=posts'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Post image</Table.HeadCell>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Post Title</Table.HeadCell>
              <Table.HeadCell className="bg-[#c7a57a] text-[#4b3621]">Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className="bg-[#f5e6c1] dark:border-[#7d6245] dark:bg-[#e6c8a5]">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className="text-[#4b3621] w-96">{post.title}</Table.Cell>
                    <Table.Cell className="text-[#4b3621] w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
