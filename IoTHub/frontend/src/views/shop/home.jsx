import { useEffect, useState } from 'react';
import { login } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Products from './Products';
import Chatbot from './Chatbot';
import '../style/Home.css';
import UseProfileData from '../plugin/UseProfileData'
import ProdView from './ProdView';
// This is a functional component named 'Home.'
const Home = () => {

  // Using the 'useAuthStore' hook to get the user's authentication state.
  // It returns an array with two elements: isLoggedIn and user.
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <div>
      {/* Using a conditional statement to render different views based on whether the user is logged in or not. */}
      {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
    </div>
  );
};

// This is another functional component named 'LoggedInView' which receives 'user' as a prop.
const LoggedInView = ({ user }) => {
  const userProfile = UseProfileData()
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userProfile) {
        setLoading(false)
    }

  })

  return (
    <div>
      
       {/* Start slider section */}
       <section className="welcome" >
          <div className="content_welc">
              <h2>Welcome, {userProfile?.full_name}</h2>
          </div>
      </section>
       <section className="home_cus">
          <div className="content">
              <Link className="btnhome link-no-underline" to="/products/" >Rent Now!!!</Link>
          </div>
      </section>
       <section className="home" id="home">
          <div className="content">
              <Link className="btnhome link-no-underline" to="/about" >About Us</Link>
          </div>
      </section>
      {/* End slider section */}
      <section className="chatbot">
          <div className="content">
              <Link className="btnhome link-no-underline" to="/about" >Learn more</Link>
          </div>
      </section>
      <Products />
      <Chatbot />  {/* Including the Chatbot component here */}
    </div>
  );
};

// This is a functional component named 'LoggedOutView,' which has an optional 'title' prop.
export const LoggedOutView = ({ title = 'Home' }) => {
  return (
    <div>
      {/* Start slider section */}
      <section className="welcome" >
          <div className="content_welc">
              <h2>Welcome new user</h2>
          </div>
      </section>
      <section className="home_cus">
          <div className="content">
          <Link className="btnhome link-no-underline" to="/products/" >Rent Now!!!</Link>
          </div>
      </section>
      <section className="home" id="home">
          <div className="content">
          <Link className="btnhome link-no-underline" to="/about" >About Us</Link>
          </div>
      </section>
      {/* End slider section */}
      <section className="chatbot">
          <div className="content">
              <Link className="btnhome link-no-underline" to="/about" >Learn more</Link>
          </div>
      </section>
      <Products />
      <Chatbot />  {/* Including the Chatbot component here */}
    </div>
  );
};

// Exporting the 'Home' component as the default export of this module.
export default Home;



















































// // This is a functional component named 'Home.'
// const Home = () => {
//     // Using the 'useAuthStore' hook to get the user's authentication state.
//     // It returns an array with two elements: isLoggedIn and user.
//     const [isLoggedIn, user] = useAuthStore((state) => [
//         state.isLoggedIn,
//         state.user,
//     ]);

//     return (
//         <div>
//             {/* Using a conditional statement to render different views based on whether the user is logged in or not. */}
//             {isLoggedIn() ? <LoggedInView user={user()} /> : <LoggedOutView />}
//         </div>
//     );
// };

// // This is another functional component named 'LoggedInView' which receives 'user' as a prop.
// const LoggedInView = ({ user }) => {
//     return (
//         <div>
//             <h1>Welcome {user.username}</h1>
//             {/* Creating a link to a private page with a button. */}
//             <Link to="/private">
//                 <button className='btn btn-primary me-2'>Private</button>
//             </Link>
//             {/* Creating a link for user logout with a button. */}
//             <Link to="/logout">
//                 <button className='btn btn-danger'>Logout</button>
//             </Link>
//         </div>
//     );
// };

// // This is a functional component named 'LoggedOutView,' which has an optional 'title' prop.
// export const LoggedOutView = ({ title = 'Home' }) => {
//     return (
//         <div>
//             {/* Displaying a title which defaults to 'Home' if not provided as a prop. */}
//             <h1>{title}</h1>
//             {/* Creating links for user login and registration with buttons. */}
//             <Link to="/login">
//                 <button>Login</button>
//             </Link>
//             <Link to="/register">
//                 <button>Register</button>
//             </Link>
//         </div>
//     );
// };

// // Exporting the 'Home' component as the default export of this module.
// export default Home;