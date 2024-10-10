import { Button, TextInput } from 'flowbite-react'
import {useSelector} from 'react-redux'

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md
            overflow-hidden rounded-full'>
                <img src={currentUser.profilePicture} alt="user" 
                className='rounded-full w-full h-full object-cover border-8
                border-[lighgray]' 
                style={{
                    backgroundColor: '#f5f5dc', // Light beige background to match old paper
                    border: '1px solid #4b3621', // Dark brown border
                    padding: '0.5rem'
                }}/>
            </div>
            <TextInput type='text' id='username' placeholder='username'
            defaultValue={currentUser.username} 
            style={{
                backgroundColor: '#f5f5dc', // Light beige background to match old paper
                border: '1px solid #4b3621', // Dark brown border
                color: '#4b3621', // Dark brown text
                padding: '0.5rem'
            }}/>
            <TextInput type='email' id='email' placeholder='email'
            defaultValue={currentUser.email} 
            style={{
                backgroundColor: '#f5f5dc', // Light beige background to match old paper
                border: '1px solid #4b3621', // Dark brown border
                color: '#4b3621', // Dark brown text
                padding: '0.5rem'
            }}/>
            <TextInput type='password' id='password' placeholder='password'
            style={{
                backgroundColor: '#f5f5dc', // Light beige background to match old paper
                border: '1px solid #4b3621', // Dark brown border
                color: '#4b3621', // Dark brown text
                padding: '0.5rem'
            }}/>
            <Button type='submit' gradientDuoTone='redToYellow'>
                Update
            </Button>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
        </form>
    </div>
  )
}