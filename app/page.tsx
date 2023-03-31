'use client';

import styles from './page.module.css'
import CustomBtn from './components/CustomBtn';
import Link from 'next/link';
import { useEffect } from 'react';
import { refreshToken } from '@/functions/auth';

export default function Home() {

  useEffect(() => {
    //initial funciton
    refreshToken().then(data => {
      if(data?.ok) {
        localStorage.setItem("access_token", JSON.stringify(data.accessToken))
        localStorage.setItem('user_data', JSON.stringify(data.user))
      }
    })

    //starts silent refreshes countdown
    setInterval(() => {
      refreshToken().then(data => {
        if(data.ok) {
          localStorage.setItem("access_token", JSON.stringify(data.accessToken))
          localStorage.setItem('user_data', JSON.stringify(data.user))
        }
      })
    },600000)
  },[])


  return (
    <main>
      <h1>Welcome 👋🏽 </h1>
      <Link href='/auth/login'>
        <CustomBtn title='Please Proceed to login' className={styles.button} />
      </Link>
    </main>
  )
}
