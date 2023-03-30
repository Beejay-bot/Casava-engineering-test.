"use client"; // this is a client component 👈🏽
import React from 'react';
import { Input } from 'antd';
import styles from '../styles/CustomInput.module.css'

type ITYPE = 
| 'email'
| 'password'
| 'button'
| 'username'

interface IPROPS {
   placeholder: string;
   disabled?: boolean;
   type: ITYPE;
   size?: 'large' | 'small';
   className?:  string;
}

const CustomInput = ({placeholder, size, type, disabled, className}: IPROPS) => {
  return (
    <>
        {type !== 'password' ? 
            (
                <Input 
                    placeholder={placeholder} 
                    className={`${className} ${styles.input}`}
                    size={size}
                    disabled={disabled} 
                />
            ) : 
            (
                <Input.Password 
                    placeholder={placeholder} 
                    className={`${className} ${styles.input}`}
                    size={size} 
                    disabled={disabled} 
                />
            )
        }
    </>
  )
}

export default CustomInput;