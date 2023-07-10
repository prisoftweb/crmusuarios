import React, { useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from "next/router";
import {ArrowLeftOnRectangleIcon, Cog8ToothIcon} from '@heroicons/react/24/outline';
import { UserLocalStorage } from './CheckLocalStorage';
import Conditional from './Conditional';
import { getCookie } from "cookies-next";

const Sidebar = ({}) => {
    const router = useRouter();
    let name='NOAutorizado', photo='default.jpg', role='', ok=false, id='1234567890'; 
    let user;
    useEffect(() => { // Perform localStorage action  // const token = localStorage.getItem('token')    
            console.log('UseEffect');
        }, []
    );    
    try {
        user = JSON.parse(getCookie('user'));
        // console.log(user);
        if(user){
            name = user.name;
            role = user.role;
            photo = user.photo;
            id = user._id;
            ok = true;
        } else {     
            // router.push('/login');
        }  
        
    } catch (error) {
        console.log('error')
    }
    

    return (
        <aside className="bg-gray-100 xs:w-1/6 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
            <div className='flex space-x-3'>
                <Image                          
                    src='/landpage.svg'
                    alt='Logo Teltan'
                    width={32}
                    height={32}                                    
                    priority="true"                                    
                />
                <p className="text-gray text-2xl font-thin">Prospectos</p>
                <button className="p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-100">
                        <rect width="352" height="32" x="80" y="96"></rect>
                        <rect width="352" height="32" x="80" y="240"></rect>
                        <rect width="352" height="32" x="80" y="384"></rect>
                    </svg>
                </button>
            </div>
            
            <Conditional showComp={ok}>
                <nav className="mt-5 list-none"> 
                    <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  "></div>
                    <li className={router.pathname === '/' ? 'bg-green-300 p-2' : 'p-2'}>
                        <Link className='text-gray-600 ml-2 text-sm tracking-wide truncate' href="/">Prospectos</Link>
                    </li>
                    <li className={`router.pathname === '/clients' ? 'bg-green-300 p-2' : 'p-2' items-center h-8 focus:outline-none hover:bg-green-50 hover:text-gray-900 border-transparent hover:border-indigo-500 pr-6 `}>
                        <Link className='text-gray-600 ml-2 text-sm tracking-wide truncate hover:text-gray-800'  href="/clients">Clientes
                            {/* <a className="text-white block">
                                Clientes
                            </a> */}
                        </Link>
                    </li>
                    <li className={router.pathname === '/incubadora' ? 'bg-green-300 p-2' : 'p-2'}>
                        <Link className='text-gray-600 ml-2 text-sm tracking-wide truncate'  href="/incubadora">Incubadora
                            {/* <a className="text-white block">
                                Incubadora
                            </a> */}
                        </Link>
                    </li>
                    <li className={`router.pathname === '/users' ? 'bg-green-300 p-2' : 'p-2'`}>
                        <Link className='text-gray-600 ml-4 text-sm tracking-wide truncate' href="/users">Usuarios</Link>
                    </li>
                    <li className={router.pathname === '/dashboard' ? 'bg-green-300 p-2' : 'p-2'}>
                        <Link className='text-gray-600 ml-2 text-sm tracking-wide truncate'  href="/dashboard">Dashboard
                            {/* <a className="text-white block">
                                Dashboard
                            </a> */}
                        </Link>
                        <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">New</span>
                    </li>
                    <div className="my-4 bg-gray-600 h-[1px]"></div>
                    <li className={`router.pathname === '/logout' ? 'bg-green-300 p-2' : 'p-2' flex ml-2 h-8`}>
                        <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-gray-600 text-sm tracking-wide truncate space-x-3' href="/logout">Salir
                            <ArrowLeftOnRectangleIcon className="h-5 w-5 space-x-2"/>
                            {/* <a className="text-white block">
                                Dashboard
                            </a> */}
                        </Link>
                    </li>
                    <li className={`router.pathname === '/dashboard' ? 'bg-green-300 p-2' : 'p-2' flex ml-2 h-8`}>
                        <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-gray-600 text-sm tracking-wide truncate space-x-3' href="/dashboard">Configuracion
                            <Cog8ToothIcon className="h-5 w-5 space-x-2"/>
                            {/* <a className="text-white block">
                                Dashboard
                            </a> */}
                        </Link>
                    </li>                    
            </nav>
            </Conditional>
            <Conditional showComp={ok}>
                <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
                    {/* <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" /> */}
                    <Image    
                        className="rounded-full"                      
                        src={`/img/users/${photo}`}
                        alt="Juan"
                        width={54}
                        height={54}                                    
                        priority="true"                                    
                    />
                    <div className='flex flex-col space-y-.5'>
                        <h2 className="text-lg font-semibold">{name.split(' ')[0]}</h2>
                        <Link href={`/users/${id}`} className="font-thin text-xs">Perfil | {role}</Link>
                        {/* <h2 className="text-lg font-semibold">Napo</h2> */}
                        {/* <span className="flex items-center space-x-1">
                            <a rel="noopener noreferrer" href="/login" className="text-xs hover:underline dark:text-gray-400">Perfil</a>
                        </span> */}
                    </div>
                </div>
            </Conditional>
            <Conditional showComp={!ok}>
                <nav className="mt-5 list-none"> 
                    <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  "></div>
                    <li className={router.pathname === '/login' ? 'bg-green-300 p-2' : 'p-2'}>
                        <Link className='text-gray-600 ml-2 text-sm tracking-wide truncate' href="/login">Iniciar sesion</Link>
                    </li>
                </nav>
            </Conditional>
            
        </aside>
        
    );
}


export async function getServerSideProps({req, res}) {      
    console.log('desde SideProps')
    let user = getCookie('user', {req, res});
    console.log(user);
    return {
        props: {
            user
        },
    };
}

export default Sidebar;