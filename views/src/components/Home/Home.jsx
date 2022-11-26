import React from 'react'
import Account from '../Acoount/Account'
import Login from '../Auth/Login'
import Layout from '../Layouts/Layout'
import styles from './Home.module.css'

const Home = () => {
  const isLoggedIn = localStorage.getItem('token');
  return (
    <Layout>
        <div className={styles.container}>
            {isLoggedIn ? <Account /> : <Login />}
        </div>
    </Layout>
  )
}

export default Home