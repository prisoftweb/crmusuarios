import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";
import {ArrowLeftOnRectangleIcon, ShieldCheckIcon, BriefcaseIcon, UsersIcon, UserGroupIcon, ChartBarSquareIcon, MapIcon, GlobeAmericasIcon, WifiIcon} from '@heroicons/react/24/outline';
import { UserLocalStorage } from './CheckLocalStorage';
import Conditional from './Conditional';
import { getCookie } from "cookies-next";



const Sidebar = ({}) => {
    const router = useRouter();    
    let name='NOAutorizado', photo='default.jpg', role='', ok=false, id='1234567890'; 
    const [open, setOpen] = useState(true);
    let user;
    let arrRoutes;
    let objsRoutes=[];
    
    const validateRoute = () => {
        arrRoutes = router.asPath.split('/');
        arrRoutes.shift();
        arrRoutes.map( (item, index) => {
            let objRoute;
            if(index === 0) { // Solo la primera vez
                const objRouteIni = {name:'Home', route:`/`};
                objsRoutes.push(objRouteIni);                
                objRoute = {name:item, route:`/${item}`};
            } else { // Si ya tiene 1 elemento
                objRoute = {name:item, route:`${objsRoutes[index].route}/${item}`};                
            }
            objsRoutes.push(objRoute);
        })
        objsRoutes.pop();        
    }
    validateRoute();
    useEffect(() => { // Perform localStorage action  // const token = localStorage.getItem('token')    
            // //console.log('UseEffect');
        }, []
    );    
    try {
        user = JSON.parse(getCookie('user'));
        // //console.log(user);
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
        //console.log('error')
    }
    return (        
        <>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center justify-start">
                        <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" onClick={() => setOpen(!open)} className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ml-2 md:mr-24">

                        <Image
                            className='space-x-4'                          
                            src='/landpage.svg'
                            alt='Logo Teltan'
                            width={32}
                            height={32}                                    
                            priority="true"                                    
                        />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Prospectos</span>
                        </a>
                        <nav className="flex invisible transition-transform -translate-x-full md:translate-x-0 md:visible " aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                {objsRoutes.map( rou => (
                                    <li key={rou.name} className="inline-flex items-center">
                                        <a href={rou.route} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white capitalize">
                                            <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                            </svg>
                                            {rou.name}
                                        </a>
                                    </li>                                    
                                ))}
                            </ol>
                        </nav>

                    </div>
                    <Conditional showComp={ok}>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <Image    
                                        className="rounded-full"                      
                                        src={`/img/users/${photo}`}
                                        alt="Juan"
                                        width={32}
                                        height={32}                                    
                                        priority="true"                                    
                                    />
                                    </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                    <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        neil.sims@flowbite.com
                                    </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Conditional>
                </div>
            </div>
        </nav>
        {/* <aside id="logo-sidebar" class={`{fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full hidden bg-white border-r border-gray-200 sm:translate-x-0 sm:visible dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar"> */}
        <Conditional showComp={ok}>
            <aside id="logo-sidebar" className={`top-0 left-0 z-40  transition-transform  h-screen pt-10 -translate-x-full lg:translate-x-0 lg:w-64 lg:visible md:static bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${open ? 'w-64 translate-x-0 overflow-visible absolute' : 'w-0 -translate-x-full overflow-hidden'}`} aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                       

                        <li className={`${router.pathname.startsWith('/user') ? 'bg-green-300 p-2' : 'p-2'} flex ml-2 h-10 justify-start  hover:bg-gray-100 dark:hover:bg-gray-600 items-center`}>
                            <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-gray-600 text-sm tracking-wide truncate align-middle' href="/users">Usuarios
                                <ShieldCheckIcon className="h-5  mr-2"/>                            
                            </Link>
                        </li>
                        <div className="my-4 bg-gray-700 h-[1px]"></div>
                        <li className={`${router.pathname.startsWith('/logout') ? 'bg-green-300 p-2' : 'p-2'} flex ml-2 h-10 justify-start  hover:bg-gray-100 dark:hover:bg-gray-600 items-center`}>
                            <Link className='flex mx-0 order-last flex-row-reverse mr-1 text-gray-600 text-sm tracking-wide truncate align-middle' href="/logout">Salir
                                <ArrowLeftOnRectangleIcon className="h-5  mr-2"/>                            
                            </Link>
                        </li>
                       
                    </ul>                   
                </div>
            </aside>

        </Conditional>
        </>
    );
}

export async function getServerSideProps({req, res}) {      
    //console.log('desde SideProps')
    let user = getCookie('user', {req, res});
    //console.log(user);
    return {
        props: {
            user
        },
    };
}

export default Sidebar;