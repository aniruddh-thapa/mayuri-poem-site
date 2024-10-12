import { Avatar,Dropdown, Navbar, NavbarCollapse } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { TextInput } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { FaMoon } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

// Import the Feather SVG
import FeatherIcon from './feather.svg'; // Adjust the path based on where you store the SVG

// Import the Old Paper Texture
import oldPaperTexture from '../assets/old-paper-texture.jpg'; // Adjust the path accordingly

// Add a Google Font for Calligraphy (e.g., "Dancing Script")
import '@fontsource/dancing-script'; // You can also use 'Great Vibes' or other calligraphy fonts

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
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

      const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };

      
    
    return (
        <Navbar 
            className='border-b-2' 
            style={{ 
                backgroundImage: `url(${oldPaperTexture})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                color: '#4b3621' // Dark brown text to match the "old paper" theme
            }}
        >
            <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r'>
                    <em style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.5rem', fontWeight: '600' }}>
                        Mayuri's
                    </em>
                </span>
                <em style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.5rem', fontWeight: '600' }}>
                    Poems
                </em>
                <img 
                    src={FeatherIcon} 
                    alt="Feather Icon" 
                    className='inline-block w-5 h-5 ml-2' 
                    style={{ verticalAlign: 'baseline', marginTop: '-4px' }} 
                />
            </Link>

            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline text-sm' 
                    style={{
                        backgroundColor: '#f5f5dc', // Light beige background to match old paper
                        border: '1px solid #4b3621', // Dark brown border
                        color: '#4b3621', // Dark brown text
                        padding: '0.5rem'
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            
            <Button 
                className='w-12 h-10 lg:hidden' 
                style={{
                    backgroundColor: '#4b3621', // Dark brown
                    color: '#f5f5dc', // Light beige text
                    borderRadius: '50%',
                    border: 'none'
                }}
                onClick={handleSubmit}
            >
                <AiOutlineSearch />
            </Button>

            <div className="flex gap-2 md:order-2">
                <Button 
                    className='w-12 h-10 hidden sm:inline'
                    style={{
                        backgroundColor: '#4b3621', // Dark brown for night mode button
                        color: '#f5f5dc', // Light beige text
                        borderRadius: '50%',
                        border: 'none'
                    }}
                >
                    <FaMoon />
                </Button>
                {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
            <Link to='/sign-in'>
                                <Button 
                        style={{
                            backgroundColor: '#b38b6d', // Soft sepia tone for sign-in button
                            color: '#f5f5dc', // Light beige text
                            border: '1px solid #4b3621', // Dark brown border
                            padding: '0.5rem 1rem',
                            borderRadius: '12px'
                        }}
                    >

              Sign In
            </Button>
          </Link>
        )}
                <Navbar.Toggle />
            </div>
            
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/poems"} as={'div'}>
                    <Link to='/poems'>
                        Poems
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
