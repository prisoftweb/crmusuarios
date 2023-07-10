/* eslint-disable @next/next/no-typos */
import Layout from "@/components/Layout";
import Image from 'next/image'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alerta, {showToastMessage, showToastMessageError, showToastMessageInfo} from "@/components/Alerta";
import { updateMeUser, updateMePassword, getUser } from '../api/user';
import { getCookie } from "cookies-next";
import { useState } from "react";
import { read } from "fs";
import { Save } from "@/components/shared/icons";


const USR = ({usr, token}) => {
    const {photo, name, email, role, _id } = usr.data.data
    const [file, setFile] = useState('');
    const [pathImage, setPathImage] = useState('pathImage.jpg');

    const formik = useFormik({
        initialValues: {
            email:'',
            name:'',
            photo:'',      
        }, 
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es valido')
                        .required('El email no puede ir vacio'),
            name: Yup.string()
                        .required('El nombre es obligatorio'),        
        }),
        onSubmit: async (valores) => {            
            const {email, name, photo } = valores;                        
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('photo', file);      
            console.log(file);
            console.log(pathImage);
            // formData.append('photo', photo);            
            let res = await updateMeUser(_id, formData, token);
            // let res = await updateUser(_id, email, name);
            if(res.status === 'success') {
                showToastMessage(`Usuario ${name} modificado exitosamente!`);            
                usr = res.data.data;                
            } else {
                showToastMessageError(res);
            }                            
        },       
    });
    const onFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if(file.type.includes("image")) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function load() {
                    setPathImage(reader.result);
                    console.log(reader.result);
                }
                setFile(file);
            } else {
                showToastMessageError('Esta no es una imagen!, favor de agregar imagen');
            }
        }

    }

    const formikPass = useFormik({
        initialValues: {
            password:'',
            passwordCurrent:'',
            passwordConfirm:'',
        }, 
        validationSchema: Yup.object({
            password: Yup.string()
                        .required('El password es obligatorio')
                        .min(6, 'Password de almenos 6 caracteres'),
            passwordConfirm: Yup.string()
                        .required('El password es obligatorio')
                        .min(6, 'Password de almenos 6 caracteres'),
            passwordCurrent: Yup.string()
                        .required('El password es obligatorio')
                        .min(6, 'Password de almenos 6 caracteres'),
        }),
    
        onSubmit: async valores => {            
            const {passwordCurrent, password, passwordConfirm} = valores;            
            let res = await updateMePassword(_id, passwordCurrent, password, passwordConfirm);
            if(res.status === 'success') {
                showToastMessage(`Password de ${email} modificado exitosamente!`);
            } else {
                showToastMessageError(res);
            }                            
        },       
    });

    return (
        
        <Layout >            
            <Alerta></Alerta>
            <div className="w-screen justify-center mt-0 py-0">
                <div className="container bg-white rounded-lg shadow">
                    <div className="bg-white rounded-lg shadow w-1/2 mx-auto py-3 md:flex md:px-4 lg:w-1/2 xl:w-1/2">
                        
                        <div className="mx-auto w-5/6 self-center md:mx-4">
                            <Image    
                            className="rounded-full"                      
                            src={`/img/users/${photo}`}
                            alt={name}
                            width={86}
                            height={86}                                    
                            priority="true"                                    
                            />
                        </div>                        
                        <div className="mt-3 mx-auto w-3/4 self-center">    
                            <p className="text-xl text-gray-800 tracking-wide leading-5 md:leading-6">{name}</p>
                            <p className="text-lg text-purple-500 tracking-wide leading-5 md:leading-6">{role}</p>
                            <p className="text-sm text-gray-500 leading-5 md:leading-6">{email}</p>
                            <p className="text-xs text-gray-400 leading-4 md:leading-5">{_id}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="justify-start lg:flex">
                <div className="mx-auto w-screen justify-start mt-6 py-4">
                
                    <div className="w-full max-w-sm">
                        <form type="file" className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" encType="multipart/form-data" onSubmit={formik.handleSubmit}>                            
                            <h2 className="justify-center text-xl text-indigo-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Usuario</h2>
                            <h2 className="justify-center text-sm text-gray-600 font-display font-thin lg:text-left xl:text-md xl:text-ligth pb-5">Configuracion de su cuenta</h2>
                            <div className="mb-4">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="name">
                                    Nombre
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                    id="name"
                                    type="text"                                
                                    placeholder={name}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleChange}>
                                </input>
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null}
                            <div className="mb-4 text-gray-700">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    value={formik.values.email}
                                    placeholder={email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleChange}>
                                </input>
                            </div>
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null}
                             <div className="space-y-1 justify-center">
                                <div className="shrink-0 self-center">
                                    <Image    
                                        className="rounded-full"                      
                                        src={`/public/img/users/${photo} || /public/img/users/default.jpg`}
                                        alt={name}
                                        width={86}
                                        height={86}                                    
                                        priority="true"                                    
                                    />
                                </div>
                                <label className="justify-center">
                                    <span className="sr-only">Elige foto de perfil</span>
                                    <input 
                                        type="file" 
                                        id="photo" 
                                        name="photo" 
                                        value={formik.values.photo}
                                        onChange={onFileChange}
                                        onBlur={formik.handleChange}
                                        className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50 file:text-violet-700
                                        hover:file:bg-violet-100">                                            
                                    </input>
                                </label>
                            </div>
                            <div className="mt-10">
                                <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit">
                                    <Save />
                                    <p>Guardar usuario</p>
                                </button>                                
                            </div>                            
                        </form>
                    </div>
                </div>
                <div className="w-screen justify-start mt-6 py-4">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 " 
                            onSubmit={formikPass.handleSubmit}>
                            <h2 className="justify-center text-xl text-indigo-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Password</h2>
                            <h2 className="justify-center text-sm text-gray-600 font-display font-thin lg:text-left xl:text-md xl:text-ligth pb-6">Cambiar password actual</h2>
                            <div className="mb-4 text-gray-700">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="passwordCurrent">
                                    Password actual
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                    id="passwordCurrent"
                                    type="password"
                                    placeholder="****"
                                    value={formikPass.values.passwordCurrent}
                                    onChange={formikPass.handleChange}
                                    onBlur={formikPass.handleChange}>
                                </input>
                            </div>
                            {formikPass.touched.passwordCurrent && formikPass.errors.passwordCurrent ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formikPass.errors.passwordCurrent}</p>
                                </div>
                            ) : null}
                            <div className="mb-4 text-gray-700">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="password">
                                    Password nuevo
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="****"
                                    value={formikPass.values.password}
                                    onChange={formikPass.handleChange}
                                    onBlur={formikPass.handleChange}>
                                </input>
                            </div>
                            {formikPass.touched.password && formikPass.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formikPass.errors.password}</p>
                                </div>
                            ) : null}
                            <div className="mb-4 text-gray-700">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="passwordConfirm">
                                    Confirmar Password 
                                </label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                    id="passwordConfirm"
                                    type="password"
                                    placeholder="****"
                                    value={formikPass.values.passwordConfirm}
                                    onChange={formikPass.handleChange}
                                    onBlur={formikPass.handleChange}>
                                </input>
                            </div>
                            {formikPass.touched.passwordConfirm && formikPass.errors.passwordConfirm ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p>{formikPass.errors.passwordConfirm}</p>
                                </div>
                            ) : null}
                            <div className="mt-10">
                                <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit">
                                    <Save />
                                    <p>Guardar password</p>
                                </button>                                
                            </div>
                            
                        </form>
                    </div>                        
                </div>
            </div>
        </Layout>     
    );
}
export async function getServerSideProps({req, res, query:{id}}) {
    let token: any;
    token = getCookie('token', {req, res});
    let usr;
    console.log(token);
    try {
        if(token != '') {
            usr = await getUser(id, token);
        } else {
            showToastMessageInfo('Favor de iniciar sesion!');
        }
    } catch (e) {    /*** Si algo salio mal con la solicitud, 404 page */
        return {
            notFound: true,
        };
    }
    if (!usr) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            usr, token
        },
    };
}

export default USR;