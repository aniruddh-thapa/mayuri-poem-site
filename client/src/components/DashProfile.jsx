import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,  ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const {currentUser} = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
        setImageFile(e.target.files[0]);
    };
    useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
      }, [imageFile]);
      const uploadImage = async() => {
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() +  imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError(
                  'Could not upload image (File must be less than 2MB)'
                );
                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );       
      };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef}
            hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md
            overflow-hidden rounded-full' onClick ={()=>
                filePickerRef.current.click()}>
                    {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(139, 69, 19, 1) ${
                    imageFileUploadProgress / 100
                  })`,
                },
                text: {
                    fill: 'rgba(101, 67, 33, 1)', // Adjusts the text color as well to match the old paper tone
                    fontSize: '16px',
                  },
              }}
            />
          )}
                <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
                className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
                    imageFileUploadProgress &&
                    imageFileUploadProgress < 100 &&
                    'opacity-60'
                  }`}
                  style={{
                    backgroundColor: '#f5f5dc', // Light beige background to match old paper
                    border: '1px solid #4b3621', // Dark brown border
                    padding: '0.5rem'
                }}
                />
            </div>
            {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
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