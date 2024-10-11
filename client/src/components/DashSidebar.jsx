import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl)
      }
    }, [location.search]);

    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    return(
        <Sidebar className='w-full md:w-56'>
             <div 
    className='h-full overflow-y-auto overflow-x-hidden rounded px-3 py-4 bg-[#f5deb3] bg-cover bg-center text-[#4b3621]'>
<Sidebar.Items>
  <Sidebar.ItemGroup className='flex flex-col gap-1'>
    <Sidebar.Item
      active={tab === 'profile'}
      icon={HiUser}
      label={currentUser.isAdmin ? 'Admin' : 'User'}
      labelColor='dark'
      as='div'
      className="bg-[#DEB887] text-[#4b3621] hover:bg-[#D2B48C]" // Wooden brown background
    >
      <Link to='/dashboard?tab=profile'>
        Profile
      </Link>
    </Sidebar.Item>
    {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
                className="bg-[#DEB887] text-[#4b3621] hover:bg-[#D2B48C]"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
    <Sidebar.Item
      active
      icon={HiArrowSmRight}
      className="cursor-pointer bg-[#DEB887] text-[#4b3621] hover:bg-[#D2B48C]" // Wooden brown background
      onClick={handleSignout}
    >
      SignOut
    </Sidebar.Item>
  </Sidebar.ItemGroup>
</Sidebar.Items>
            </div>
        </Sidebar>
    );
}