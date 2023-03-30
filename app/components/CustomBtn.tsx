"use client"; // this is a client component 👈🏽
import React from 'react';
import { Button, ButtonProps } from 'antd';
import styles from '../styles/Button.module.css';

const CustomBtn = ({title, type, className, onClick, ...props}: ButtonProps) => {
  return (
    <div>
        <Button type={type} className={`${className} ${styles.button}`} onClick={onClick} {...props}>
            {title?.toUpperCase()}
        </Button>
    </div>
  )
}

export default CustomBtn