import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {forgotPassword} from './api/user';
import Alerta, {showToastMessage,showToastMessageError} from "@/components/Alerta"
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Layout from '@/components/Layout';
import { Save } from '@/components/shared/icons';

const FORGOT = () => {
    const formik = useFormik({
        initialValues: {
            email:''                        
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .required('Favor de ingresar su correo electronico')
                        .email('El email no es valido')            
        }),    
        onSubmit: async (valores, {resetForm}) => {                        
            const { email } = valores;
            const newEmail = {
                email,                
            }            
            let res = await forgotPassword(email);
            resetForm();            
            if(res != undefined)
                if(res === 201) {
                    showToastMessage('Varifica tu correo para reestablecer el password');                
                } else {
                    showToastMessageError(res);
                }                            
        }
    });

    return (
        <Layout>
        <div className='w-screen mt-10 flex flex-col items-center space-y-10'>
            <Alerta></Alerta>            
            <Image
                className={styles.logo}
                src="/teltan-logo-2022.svg"
                alt="Teltan Logo"
                width={240}
                height={45}
                priority
            />                          
            <form className="max-w-md bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={formik.handleSubmit}>                 
                <h2 className="justify-center text-xl text-indigo-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Olvidaste tu contraseña?</h2>
                <h2 className="justify-center text-sm text-gray-600 font-display font-thin lg:text-left xl:text-md xl:text-ligth pb-5">Recuperacion de contraseña (valido por 10 mins)</h2>
                <div className="md:flex mb-4">
                    <div className="md:flex-1 md:pr-3 md:w-2/3">
                        <label className="block text-gray-700 text-sm  mb-2 font-sans font-semibold" htmlFor="email">
                            Email
                        </label>
                        <div className="flex justify-start items-center relative">
                            <input 
                                className="shadow appearance-none border lowercase rounded w-full py-2 px-9   text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                                id="email"
                                type="email"
                                value={formik.values.email}
                                placeholder="Email cliente"
                                onChange={formik.handleChange}
                                onBlur={formik.handleChange}>
                            </input>
                            <EnvelopeIcon className="h-6 text-amber-400 absolute ml-1 w-10"></EnvelopeIcon>
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="mt-10">
                    <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit">
                        <Save />
                        <p>Enviar </p>
                    </button>
                    
                </div>    
                <p className='text-xs font-sans font-thin mt-5'>Ingrese la dirección de correo electrónico que utiliza para iniciar sesion con CRM Prospectos, se verificara su cuenta de usuario y le enviaremos un enlace para restablecer la contraseña valido durante 10 minutos.</p>
                
                <div className='flex flex-1 items-end space-x-8 justify-between'>
                    <p className='text-xs font-sans font-thin mt-5'>¿Ya tienes una cuenta en CRM Prospectos?</p>
                    <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-blue-600 text-sm tracking-wide truncate align-middle' href="/login">
                        Iniciar sesion
                    </Link>
                </div>

            </form>
        </div>         
        </Layout>   
    )
}
export default FORGOT;