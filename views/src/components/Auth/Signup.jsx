import React, { useRef } from 'react';
import Styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../utils';

const url ='http://localhost:3000/api/v1/auth/signup';

const Signup = () => {
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const phoneNumber = useRef();


   const handleSubmit = async(e) => {
    e.preventDefault();

    const data = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      phone_number: phoneNumber.current.value
    };
     
     try {
      const response = await postData(url, data);
      if(response.status === 201) {
        navigate('/login');
      }
     } catch (error) {
        console.log(error);
      }
   };
  
  return (
    <div className={Styles.login}>
      <div className={Styles.loginWrapper}>
        <div className={Styles.loginLeft}>
          <h3 className={Styles.loginLogo}>Ficti Bank</h3>
          <span className={Styles.loginDesc}>
            Ficti your way to unending financial freedom.
          </span>
        </div>

        <div className={Styles.loginRight}>
          <form className={Styles.loginBox} onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="Enter Name"
              className={Styles.loginInput}
              ref={name}
            />
            <input
              type="email"
              required
              placeholder="Email"
              className={Styles.loginInput}
              ref={email}
            />

            <input
              type="password"
              required
              minLength="6"
              placeholder="Password"
              className={Styles.loginInput}
              ref={password}
            />

            <input
              type="text"
              required
              minLength="6"
              placeholder="Enter phone number"
              className={Styles.loginInput}
              ref={phoneNumber}
            />

            <button className={Styles.loginBtn} type="submit">
              Sign Up
            </button>

            <Link to="/login" style={{ alignSelf: 'center' }}>
              <button type="button" className={Styles.loginRegistration}>
                Login
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup