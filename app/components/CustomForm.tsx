"use client"; // this is a client component 👈🏽
import React from 'react';
import {Form, Input} from 'antd';
import CustomBtn from './CustomBtn';
import CustomInput from './CustomInput';
import { FormInstance, Rule } from 'antd/es/form';

type ITYPE = 
| 'email'
| 'password'
| 'button'
| 'username'

export interface IFormfields {
    name: string;
    type: ITYPE;
    label: string;
    placeholder?: string;
    rules?: Rule[];
}

interface FORMPROPS {
    formName: string;
    onFinish?: (e: Object) => void | Promise<any>;
    onFinishFailed?: (e: Object) => void | Promise<any>;
    formFields?: IFormfields[];
    form:  FormInstance<Object>;
    disabled?: boolean;
}

const CustomForm= ({formName, onFinish, formFields, form, disabled, onFinishFailed}: FORMPROPS) => {

  return (
        <Form 
            name={formName} 
            initialValues={{remember: true}}
            onFinish={onFinish}
            scrollToFirstError={true}
            form={form}
            validateTrigger={['onChange', 'onBlur', 'onFinish']}
            onFinishFailed={onFinishFailed}
            >
            {formFields && formFields.map((data, index)=> (
                <Form.Item name={data.name} rules={data.rules}  key={index}>
                    {data.type === 'button' ? (
                        <CustomBtn title={data.label} htmlType='submit' disabled={disabled} />
                    ) : (
                        <Input placeholder={data.placeholder || ''} type={data.type} />
                    )}
                </Form.Item>
            ))}
        </Form>
  )
}

export default CustomForm;