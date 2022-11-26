import React, { useRef } from 'react';
import Styles from './Auth.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/auth/login';

const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axios.post(url, data);
      localStorage.setItem("token", response.data.token);
      navigate('/');
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
            Ficti, your way to financial freedom.
          </span>
        </div>

        <div className={Styles.loginRight}>
          <form className={Styles.loginBox} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              ref={email}
              className={Styles.loginInput}
            />

            <input
              type="password"
              placeholder="Password"
              required
              minLength="6"
              ref={password}
              className={Styles.loginInput}
            />

            <button type="submit" className={Styles.loginBtn}>
              Log In
            </button>
            <span className={Styles.loginForgot}>Forgot Password?</span>

            <Link to="/signup" style={{ alignSelf: 'center' }}>
              <button type="button" className={Styles.loginRegistration}>
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login