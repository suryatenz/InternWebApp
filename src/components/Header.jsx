import React, { useState ,useEffect ,useRef} from 'react';
import { Link, useLocation ,useNavigate  } from 'react-router-dom';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FaCaretDown } from 'react-icons/fa';
import Notification from './Notification';
import ProfileBar from './ProfileBar'; 
import { ChevronLeft } from 'lucide-react';
export default function Header() {
    const location = useLocation();
    const [isNotificationOpen, setNotificationOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false); 
    const [currentDate, setCurrentDate] = useState(new Date());
    const notificationRef = useRef();
    const profileRef = useRef();
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setNotificationOpen(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setIsProfileOpen(false);
        }
      };
    
      // Adding the event listener
      document.addEventListener('mousedown', handleClickOutside);
    
      // Cleanup function to remove the event listener when the component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount
        useEffect(() => {
        const timer = setInterval(() => {
          setCurrentDate(new Date());
        }, 60000); // Updates every minute
        return () => clearInterval(timer);
      }, []);
     
    let headerText;
    switch (true) {
      case location.pathname.includes('ProductInfo'):
          headerText = 'Product Information';
          break;
      case location.pathname === '/search':
          headerText = 'Home';
          break;
      case location.pathname === '/search/ProductVariants':
          headerText = 'Product Profile';
          break;
      case location.pathname === '/search/AddProduct':
          headerText = 'Add Product';
          break;
      default:
          headerText = 'Unknown';
  }
    const formattedDate=currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const toggleNotification = (e) => {
        e.stopPropagation();
        setNotificationOpen(!isNotificationOpen);
        if (isProfileOpen) setIsProfileOpen(false); // Close ProfileBar if it's open
      };
      
      const toggleProfile = (e) => {
        e.stopPropagation();
        setIsProfileOpen(!isProfileOpen);
        if (isNotificationOpen) setNotificationOpen(false); // Close Notification if it's open
      };
      const navigate = useNavigate();

const handleChevronClick = (e) => {
  e.preventDefault();
  const pathArray = location.pathname.split('/');
  pathArray.pop();
  const newPath = pathArray.join('/');
  navigate(newPath);
};

    return (
        <div className='relative flex p-4 h-16 items-center justify-between mr-4'>
            <div className='flex items-center gap-3'>
               <div  className='' onClick={handleChevronClick}>
  {location.pathname !== "/search" && <ChevronLeft className='text-orange-500 cursor-pointer' size={28} />}
</div>
                    <h1 className='font-semibold text-xl flex flex-wrap '>
                         <span className='text-orange-500'>{headerText}</span>
                    </h1>
                
            </div>
            <div className='pr-2 mr-2'>
                <ul className='flex gap-4 w-full items-center'>
                    <li className='text-neutral-400 font-normal text-xs cursor-default'>
                        {formattedDate}
                    </li>
                    <li onClick={toggleNotification} className='hover:text-orange-500 cursor-pointer'>
                        <img src='/Notification.svg' alt="Notification" className='w-6' />
                    </li>
                    {isNotificationOpen &&       <Notification ref={notificationRef} isOpen={isNotificationOpen} />}
                    <li className='flex flex-col hover:text-orange-500'>
                        <span className='text-sm cursor-pointer'>Aisha Sharma</span>
                        <span className='text-xs font-extralight text-neutral-400 '>Fresher</span>
                    </li>
                    <li className='flex items-center gap-3 hover:opacity-50 cursor-pointer ' onClick={toggleProfile} >
                        <CgProfile size={30} />
                        <FaCaretDown size={15} />
                    </li>
                    {isProfileOpen && <ProfileBar ref={profileRef} isOpen={isProfileOpen} toggleProfile={toggleProfile} />}
                </ul>
            </div>
        </div>
    );
}