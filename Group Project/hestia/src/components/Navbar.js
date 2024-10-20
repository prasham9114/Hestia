
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import '../compStyles/Navbar.css';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
//   const [visible, setVisible] = useState(true);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState('');
//   const [searchQuery, setSearchQuery] = useState(''); // State for search query
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userCookie = Cookies.get('user');
//     const usernameCookie = Cookies.get('username');
//     setIsLoggedIn(!!userCookie);
//     setUsername(usernameCookie || '');

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       if (window.innerWidth >= 768) {
//         setIsOpen(false);
//       }
//     };

//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;
//       setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [prevScrollPos]);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };


//   return (
//     <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           Hestia Cafe
//         </Link>
//         <div className="menu-icon" onClick={toggleMenu}>
//           <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>

        

//         <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
//           <li className="nav-item">
//             <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/menu" className="nav-link" onClick={() => setIsOpen(false)}>
//               Menu
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/cart" className="nav-link" onClick={() => setIsOpen(false)}>
//               Cart
//             </Link>
//           </li>
//           {isLoggedIn ? (
//             <>
//               <li className="nav-item">
//                 <Link to="/user" className="nav-link"onClick={() => setIsOpen(false)}>
//                   {username}
//                 </Link>
//               </li> 
//             </>
//           ) : (
//             <li className="nav-item">
//               <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../compStyles/Navbar.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    const usernameCookie = Cookies.get('username');
    setIsLoggedIn(!!userCookie);
    setUsername(usernameCookie || '');

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false); // Close the menu if the screen size increases
      }
    };

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle menu visibility on click
  };

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Hestia Cafe
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''} ${isMobile ? 'mobile' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/about' className='nav-link' onClick={()=>setIsOpen(false)}>about</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={() => setIsOpen(false)}>
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link" onClick={() => setIsOpen(false)}>
              Cart
            </Link>
          </li>
          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <Link to="/user" className="nav-link" onClick={() => setIsOpen(false)}>
                  {username}
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;