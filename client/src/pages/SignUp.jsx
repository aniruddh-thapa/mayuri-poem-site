import { Link } from "react-router-dom";
import FeatherIcon from './feather.svg';
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return(
    <div className='min-h-screen mt-20' style={{ backgroundImage: `url('./assets/old-paper-texture.jpg')`, backgroundSize: 'cover' }}>
      <div className="flex flex-col md:flex-row p-3 max-w-5xl mx-auto gap-10">
        {/* Left side (Mayuri's Poems) */}
        <div className="flex-1 md:w-1/2">
          <Link to='/' className='font-bold text-4xl text-brown-700'>
            <span className='px-2 py-1 bg-gradient-to-r'>
              <em style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2rem', fontWeight: '700' }}>
                Mayuri's
              </em>
            </span>
            <em style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2rem', fontWeight: '700' }}>
              Poems
            </em>
            <img 
              src={FeatherIcon} 
              alt="Feather Icon" 
              className='inline-block w-5 h-5 ml-2' 
              style={{ verticalAlign: 'baseline', marginTop: '-4px' }} 
            />
          </Link>
          <p className="text-sm mt-5 text-brown-700">
            Welcome to the world of poems by Mayuri Sharma. You can sign
            up with your email and password or with Google. Hope you love 
            the poems :)
          </p>
        </div>

        {/* Right side (Sign Up form) */}
        <div className='flex-1 md:w-1/2'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' className='text-brown-600' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                className='bg-beige-100'
                style={{
                  backgroundColor: '#f5f5dc', // Light beige background to match old paper
                  border: '1px solid #4b3621', // Dark brown border
                  color: '#4b3621', // Dark brown text
                  padding: '0.5rem'
                }}
              />
            </div>
            <div>
              <Label value='Your email' className='text-brown-600' />
              <TextInput
                type='email'
                placeholder='Email'
                id='email'
                className='bg-beige-100'
                style={{
                  backgroundColor: '#f5f5dc', // Light beige background to match old paper
                  border: '1px solid #4b3621', // Dark brown border
                  color: '#4b3621', // Dark brown text
                  padding: '0.5rem'
                }}
              />
            </div>
            <div>
              <Label value='Your password' className='text-brown-600' />
              <TextInput
                type='password'
                placeholder='Password'
                id='password'
                className='bg-beige-100'
                style={{
                  backgroundColor: '#f5f5dc', // Light beige background to match old paper
                  border: '1px solid #4b3621', // Dark brown border
                  color: '#4b3621', // Dark brown text
                  padding: '0.5rem'
              }}
              />
            </div>
            <Button className='bg-brown-600 hover:bg-brown-700 text-beige-100'  style={{
                        backgroundColor: '#4b3621', // Dark brown for night mode button
                        color: '#f5f5dc', // Light beige text
                        border: 'none'
                    }}>
              Sign Up
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span className='text-brown-600'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
