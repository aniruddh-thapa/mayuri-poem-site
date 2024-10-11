import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import oldPaperTexture from '../assets/sidebar.jpg';


export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
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
  <Sidebar.ItemGroup>
    <Sidebar.Item
      active={tab === 'profile'}
      icon={HiUser}
      label={'User'}
      labelColor='dark'
      as='div'
      className="bg-[#DEB887] text-[#4b3621] hover:bg-[#D2B48C]" // Wooden brown background
    >
      <Link to='/dashboard?tab=profile'>
        Profile
      </Link>
    </Sidebar.Item>
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