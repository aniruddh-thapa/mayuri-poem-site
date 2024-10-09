import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import FeatherIcon from './feather.svg';
import oldPaperTexture from '../assets/footer.jpg';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-white-500' style={{ 
        backgroundImage: `url(${oldPaperTexture})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        color: '#000000' // Dark brown text to match the "old paper" theme
    }}>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
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
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.instagram.com/amayyez?igsh=MWZremRtaGN5a3J5ag=='
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Poet
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Poems
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.instagram.com/thequotepie?igsh=MXhxMmR3a3c1dHJvaw=='
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  TheQuotePie
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Sahand's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='https://www.instagram.com/thequotepie?igsh=MXhxMmR3a3c1dHJvaw==' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>

          </div>
        </div>
      </div>
    </Footer>
  );
}
