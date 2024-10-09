import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from './feather.svg';
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    } 
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        return setErrorMessage('User already exists');
      }
      setLoading(false);
      if(res.ok) {
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  console.log(formData);
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
            in with your email and password or with Google. Hope you love 
            the poems :)
          </p>
        </div>

        {/* Right side (Sign Up form) */}
        <div className='flex-1 md:w-1/2'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                onChange={handleChange}
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
              onChange={handleChange}
              />
            </div>
            <Button className='text-beige-100 bg-[#4b3621] hover:bg-[#3a2918]'  style={{
                        backgroundColor: '#4b3621', // Dark brown for night mode button
                        color: '#f5f5dc', // Light beige text
                        border: 'none'
                    }}
                    type='submit' disabled={loading}>
               {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span className='text-brown-600'>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
