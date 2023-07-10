import React, { useState} from 'react';
import Layout from '../components/Layout';
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { setLogin } from './api/user';
import Alerta, {showToastMessage, showToastMessageError} from "@/components/Alerta";
import 'react-toastify/dist/ReactToastify.css';
import { setCookie } from 'cookies-next';
import Link from 'next/link';
import { Save } from '@/components/shared/icons';

function LOGIN({}) {
    const router = useRouter();
    let user: any;
    const formik = useFormik({
        initialValues: {
            email:'',
            password:''
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es valido')
                        .required('El email no puede ir vacio'),
            password: Yup.string()
                        .required('El password es obligatorio')
        }),
    
        onSubmit: async valores => {
            const { email, password } = valores;
            let res = await setLogin(email, password);
            if(res.status === 'success') {
                showToastMessage(`Ha iniciado sesion exitosamente ${email}!`);            
                saveLocalStorage('key', 'Hola prisoft');
                saveLocalStorage('token', res.token);
                saveLocalStorage('user', JSON.stringify(res.data.user));
                setCookie('token', res.token);
                setCookie('user', res.data.user);
                const {photo, name, role, _id } = res.data.user;
                setCookie('id', _id);
                setTimeout(() => {                
                    router.push(
                        {
                            pathname: '/' || '/clients',
                            query: {
                                user1:email,
                                name:name,
                                photo:photo,
                                role:role,
                                id:_id
                            }                                              
                        }
                    );
                }, 1000); 
            } else {
                showToastMessageError(res);
            }
        }
    });
    const removeLocalStorage = () => {
        localStorage.removeItem('key');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }   
    const saveLocalStorage = (key, data) => {
        localStorage.setItem(key, data);
    } 
    
    return (        
        <div>      
            <Layout>
                <Alerta></Alerta>
                <div className="flex justify-center mt-12">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}>
                            <a className='py-8 w-full'
                                href="https://teltan.com.mx"
                                target="_blank"
                                rel="noopener noreferrer"
                                >         
                                <Image
                                    className={styles.logo}
                                    src="/teltan-logo-2022.svg"
                                    alt="Teltan Logo"
                                    width={180}
                                    height={37}                                    
                                    priority="true"                                    
                                />
                            </a>
                            <h2 className="justify-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold py-8">Log in</h2>
                            <div className="mb-4">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"                                    
                                    placeholder="Email usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleChange}>
                                </input>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="password">
                                    Password
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password usuario"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleChange}>
                                </input>
                                
                            </div>
                            <div className="mb-4">
                                <div>
                                    <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-blue-600 text-sm tracking-wide truncate align-middle' href="/forgotPassword">
                                        Olvido password ?
                                    </Link>                                    
                                </div>
                            </div>
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                            <div className="mt-10">
                                <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit">
                                    <Save />
                                    <p>Iniciar sesion</p>
                                </button>

                                
                            </div>                            
                        </form>
                    </div>
                
                </div>
               
                
            </Layout>
        </div>
    );
}
export default LOGIN;