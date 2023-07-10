import Alerta, {showToastMessage,showToastMessageError} from "@/components/Alerta"
import { EnvelopeIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { useState, useRef, useEffect } from "react";
import * as Yup from 'yup';
import { createUser } from "./api/user";
import { getCookie } from "cookies-next";
import Select from 'react-select'
import { Save } from "@/components/shared/icons";

const USERNEW = () => {    
    const router = useRouter();
    const token = getCookie('token');    
    const [selectvalue, setSelectvalue] = useState('user');
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const inputFocusRef = useRef();
    const usersRole = [
        {value:'user', label:'User'}, 
        {value:'admin', label:'Admin'},
        {value:'guide', label:'Guide'}
    ]
    useEffect(() => {
        inputFocusRef.current.focus();
    },[])
    const formik = useFormik({
        initialValues: {
            email:'',
            name:'',
            role:'user',
            passwordCurrent:'',
            passwordConfirm:'',
        }, 
        
        validationSchema: Yup.object({
            email: Yup.string()
                        .email('El email no es valido')
                        .required('El email no puede ir vacio'),
            name: Yup.string()
                        .required('El nombre es obligatorio'),    
            passwordConfirm: Yup.string()
                        .required('El password es obligatorio')
                        .min(6, 'Password de almenos 6 caracteres'),
            password: Yup.string()
                        .required('El password es obligatorio')
                        .min(6, 'Password de almenos 6 caracteres')

        }),    
        onSubmit: async (valores, {resetForm}) => {                        
            const rolok = selectvalue.value;
            const { name, email, password, passwordConfirm } = valores;
            const newUser = {
                name,
                email,
                role:rolok,
                password,
                passwordConfirm
            }        
            let res = await createUser(newUser, token);
            resetForm();
            if(res != undefined)
                if(res === 201) {
                    showToastMessage('Usuario agregado exitosamente!');                            

                } else {
                    showToastMessageError(res);
                }                            
        }
    });

    return (
        <Layout>
            <Alerta></Alerta>
           
            
            {/* <div className="bg-white rounded-lg shadow py-1 md:flex md:px-4 xs:w-full sm:w-5/6 md:w-3/5 lg:w-2/5 lg:w-1/3"> */}
                <div className="w-screen justify-center mt-2 py-1">
                    
                    <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}>                            
                            <h2 className="justify-center text-xl text-indigo-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Usuarios</h2>
                            <h2 className="justify-center text-sm text-gray-600 font-display font-thin lg:text-left xl:text-md xl:text-ligth pb-5">Nuevo usuario</h2>
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">
                                    <label className="focus-visible after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="name">
                                        Nombre
                                    </label>
                                    <input 
                                        className="shadow capitalize appearance-none  rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                                        id="name"
                                        type="text"
                                        ref={inputFocusRef}
                                        placeholder="Nombre usuario"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleChange}>
                                    </input>
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p>{formik.errors.name}</p>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="md:flex-1 md:pr-3">                             
                                    <label className="focus-visible after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="email">
                                        Email
                                    </label>
                                    <div className="flex justify-start items-center relative">
                                        <input 
                                            className="shadow appearance-none border lowercase rounded w-full py-2 px-10   text-base text-gray-500 leading-tight font-sans font-thin focus:ring-1 focus:ring-blue-600"
                                            id="email"
                                            type="email"
                                            value={formik.values.email}
                                            placeholder="Email cliente"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleChange}>
                                        </input>
                                        <EnvelopeIcon className="h-6 w-6 text-amber-400 absolute ml-1 w-10"></EnvelopeIcon>
                                    </div>
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p>{formik.errors.email}</p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="mb-4 text-gray-700">
                                <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="role">
                                    Rool
                                </label>
                                <Select
                                    id="role"                                    
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={usersRole[0]}
                                    name="color"
                                    onChange={setSelectvalue}
                                    isClearable={isClearable}        
                                    isSearchable={isSearchable}                                    
                                    options={usersRole}
                                />
                                {/* <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:ring-1 focus:bg-white focus:ring-blue-600" 
                                    id="role">                                    
                                        <option >ADMIN</option>
                                        <option >USER</option>                                        
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div> */}
                            </div>
                            <div className="md:flex mb-4">
                                <div className="md:flex-1 md:pr-3">                                
                                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="password">
                                        Password nuevo
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="****"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleChange}>
                                    </input>
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p>{formik.errors.password}</p>
                                        </div>
                                    ) : null}                                                            
                                </div>

                                <div className="md:flex-1 md:pr-3">
                                    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" htmlFor="passwordConfirm">
                                        Confirmar Password 
                                    </label>
                                    <input 
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-base text-gray-500 leading-tight font-sans font-ligth focus:outline-none focus:shadow-outline"
                                        id="passwordConfirm"
                                        type="password"
                                        placeholder="****"
                                        value={formik.values.passwordConfirm}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleChange}>
                                    </input>
                                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p>{formik.errors.passwordConfirm}</p>
                                        </div>
                                    ) : null}
                                </div>
                            </div>                            
                            
                            <div className="mt-10">
                            
                                <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit">
                                    <Save />
                                    <p>Guardar usuario </p>
                                </button>
                            </div>                            
                        </form>
                    </div>
                </div>
                        
        </Layout>
    )
}

export default USERNEW;