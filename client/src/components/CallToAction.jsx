import { Button } from 'flowbite-react';
import mayuriImage from '../assets/mayuri.jpg';
import oldPaperTexture from '../assets/footer.jpg';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-black justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'
    style={{ 
        backgroundImage: `url(${oldPaperTexture})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: '#000000' // Dark brown text to match the "old paper" theme
    }}>
        <div className="flex-1 justify-center flex flex-col">
            <h1 className='text-2xl'>
                Poems by Mayuri Sharma
            </h1>
            <p className='text-gray-700 my-2'>
            Hi guys! I'm Mayuri Sharma, currently pursuing engineering with a deep passion for writing poems. I believe that poetry is a beautiful way to express emotions, thoughts, and ideas. Writing has always been my escape, and I love sharing my words to inspire others. Whether you're new to poetry or an experienced writer, I encourage you to start penning down your thoughts and let your creativity flow. Let's embark on this poetic journey together!

             <p>For more poems, click below.</p>
            </p>
            <Button gradientDuoTone='redToYellow' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.instagram.com/thequotepie?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' rel='noopener noreferrer'>
                    More Poems
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src={mayuriImage} alt="Mayuri" />
        </div>
    </div>
  )
}