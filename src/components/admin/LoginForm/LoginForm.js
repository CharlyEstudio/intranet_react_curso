import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { loginUsuario } from '../../../api/user';
import { ACCESS_TOKEN, MENU, USUARIO } from '../../../utils/constants';

import './LoginForm.scss';

export default function LoginForm() {
    const [ inputs, setInputs ] = useState({
        email: '',
        password: ''
    });

    const [ formValid, setFormValid ] = useState({
        email: false,
        password: false
    });

    const inputValidation = e => {
        const { type, name } = e.target;

        if (type === 'email') {
            setFormValid({
                ...formValid,
                [name]: emailValidation(e.target)
            });
        }

        if (type === 'password') {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 6)
            });
        }
    };

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const login = async e => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            const result = await loginUsuario(inputs);
            if (result.ok) {
                const { token } = result;
                localStorage.setItem(ACCESS_TOKEN, token);
                notification['success']({
                    message: 'Ingresando...'
                });
                window.location.href = '/admin';
            } else {
                notification['error']({
                    message: result.mensaje
                });
            }
        }
    };

    return (
        <Form className="login_form" onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                <Input
                    prefix={<MailOutlined style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    className="login_form__input"
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}} />}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="login_form__input"
                    onChange={inputValidation}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login_form__button">Entrar</Button>
            </Form.Item>
        </Form>
    );
}