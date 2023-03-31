'use client'
import React from 'react'
import Link from 'next/link';
import CustomForm, { IFormfields } from '@/app/components/CustomForm';
import styles from '@/app/styles/Login.module.css';
import { Form } from 'antd';

const loginFormItems: IFormfields[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'example@domain.com',
    rules: [{ required: true, message: 'Please input your email!' }],
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    rules: [{ required: true, message: 'Please input your password!' }],
  },
  {
    name: 'loginBtn',
    type: 'button',
    label: 'Login',
  },
];

function Login() {
  const [form] = Form.useForm();

  const handleOnfinish = (values: any) => {
    console.log(values);
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: values?.email,
        password: values?.password
      })
    }).then(res => {
      // res.json()
      console.log(res)
    })
    .then(data => {
      console.log(data)
      localStorage.setItem("access_token", JSON.stringify(data.accessToken))
      localStorage.setItem('user_data', JSON.stringify(data.user))
    })
  }
  return (
    <div>
      <h3>Log in to your account</h3>
      <CustomForm formName={'Login'} formFields={loginFormItems} form={form} onFinish={handleOnfinish}/>
      <p className={styles.forgotPassword}>
          Don't have an account? 
          <Link href={'/auth/signup'}> 
            <span className={styles.signText}>SignUp here</span> 
          </Link>
      </p>
    </div>
  )
}

export default Login