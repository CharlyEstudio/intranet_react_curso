import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from '../../../utils/formValidation';
import { crearUsuario } from '../../../api/user';

import './RegisterForm.scss';

export default function RegisterForm() {
    const [ inputs, setInputs ] = useState({
        nombre: "",
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false
    });

    const [ formValid, setFormValid ] = useState({
        nombre: false,
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false
    });

    const changeForm = e => {
        if (e.target.name === 'privacyPolicy') {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.checked
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        }
    };

    const inputValidation = e => {
        const { type, name } = e.target;
        if (type === 'text') {
            setFormValid({
                ...formValid,
                [name]: minLengthValidation(e.target, 12)
            });
        }

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

        if (type === 'checkbox') {
            setFormValid({
                ...formValid,
                [name]: e.target.checked
            });
        }
    };

    const register = async e => {
        e.preventDefault();
        const passwordVal = inputs.password;
        const repeatPssVal = inputs.repeatPassword;

        if (!inputs.nombre || !inputs.email || !passwordVal || !repeatPssVal || !inputs.privacyPolicy) {
            notification['error']({
                message: 'Todos los campos son obligatorios.'
            });
        } else {
            if (passwordVal !== repeatPssVal) {
                notification['error']({
                    message: 'Las contraseña no son idénticas.'
                });
            } else {
                const result = await crearUsuario(inputs);
                if (result.ok) {
                    notification['success']({
                        message: 'Usuario creado con éxito.'
                    });
                    resetForm();
                } else {
                    notification['error']({
                        message: result.errors.errors.email.message
                    });
                }
            }
        }
    };

    const resetForm = () => {
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('success');
            inputs[i].classList.remove('error');
            setInputs({
                nombre: "",
                email: "",
                password: "",
                repeatPassword: "",
                privacyPolicy: false
            });

            setFormValid({
                nombre: false,
                email: false,
                password: false,
                repeatPassword: false,
                privacyPolicy: false
            });
        }
    };

    return (
        <Form className="register_form" onSubmitCapture={register} onChange={changeForm}>
            <Form.Item>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="text"
                    name="nombre"
                    placeholder="Nombre Completo"
                    className="register_form__input"
                    onChange={inputValidation}
                    value={inputs.nombre}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<MailOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="email"
                    name="email"
                    placeholder="Correo Eléctronico"
                    className="register_form__input"
                    onChange={inputValidation}
                    value={inputs.email}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="register_form__input"
                    onChange={inputValidation}
                    value={inputs.password}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    type="password"
                    name="repeatPassword"
                    placeholder="Repetir Contraseña"
                    className="register_form__input"
                    onChange={inputValidation}
                    value={inputs.repeatPassword}
                />
            </Form.Item>
            <Form.Item>
                <Checkbox
                    name="privacyPolicy"
                    onChange={inputValidation}
                    checked={inputs.privacyPolicy}
                >
                    He leído y acepto las políticas de privacidad.
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    className="register_form__button"
                >
                    Crear Cuenta
                </Button>
            </Form.Item>
        </Form>
    );
}