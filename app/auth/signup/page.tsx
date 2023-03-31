'use client'

import React, {useState} from 'react';
import Link from 'next/link';
import CustomForm, { IFormfields } from '@/app/components/CustomForm';
import { passwordValidations } from '@/utils/constants';
import { Form } from 'antd';
import styles from '@/app/styles/Signup.module.css';


const SignUp= () => {
  const [form] = Form.useForm();
  const [errorOcurred , setErrorOcurred] = useState(false);

  const signUpFormItems: IFormfields[] = [
    {
        name: 'username',
        type: 'username',
        label: 'Username',
        placeholder: 'Please enter your Username',
        rules: [{ required: true, min: 4, message: 'Please choose a username!' }],
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      placeholder: 'example@domain.com',
      rules: [{ required: true, type:'email', message: 'Please enter a valid email!' }],
      
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Password',
      rules: [
        ...passwordValidations.map(({ name, regExp }) => ({
          name,
          validator: async (_: any, Password: string) => {
            const regex = new RegExp(regExp);
            if (!regex.test(Password)) {
              setErrorOcurred(true)
              return Promise.reject(new Error(name));
            }
            setErrorOcurred(false)
          },
        })),
      ],
    },
    {
        name: 'confirm_password',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Re-enter your password',
        rules: [
            {
              validator: async (_, confirmNewPassword) => {
                if (form.getFieldValue('password') !== confirmNewPassword) {
                    setErrorOcurred(true)
                    return Promise.reject(new Error('Make sure both password matches'));
                }
                else{
                  setErrorOcurred(false)
                  return Promise.resolve();
                }
              },
            }
          ],
      },
    {
      name: 'signUpBtn',
      type: 'button',
      label: 'Signup',
    },
];

    const handleOnfinish = (values: any) => {
      console.log(values)
      fetch('/api/signup',{
        method:'POST',
        body:JSON.stringify({
          email: values?.email,
          username: values?.username,
          password: values?.password
        })
      }).then(res => {
        if(res.status === 409) throw new Error('Please use other email')
        console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
        localStorage.setItem("access_token", JSON.stringify(data.accessToken))
        localStorage.setItem('user_data', JSON.stringify(data.user))
      })
      .catch(e => {
        return console.log(e)
      })
    }
  return (
    <div>
        <h2>Sign up</h2>
        <p>Let's get started</p>
        <div className={styles.formContainer}> 
            <CustomForm 
                formFields={signUpFormItems}
                formName='signUpForm'
                form={form}
                disabled={errorOcurred} 
                onFinish={handleOnfinish} 
            />
        </div>
        <p className={styles.loginContainer}>
            Already have an account?
            <Link href='/auth/login'>
                <span className={styles.loginText}>Login</span>
            </Link>
        </p>
    </div>
  )
}

export default SignUp;