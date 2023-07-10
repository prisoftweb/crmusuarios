import React, { Children } from 'react'
import Head from 'next/head';
import Script from 'next/script'
import { useRouter } from "next/router";
import Sidebar2 from '../components/Sidebar2'
import Header from './Header';

const Layout = ({children}) => {
    // Hook de Routing
    const router = useRouter();
    // console.log(children);
    const initMap = () => {
        console.log('init map');
    }
    
    return (
        <>
            <Script src="https://cdn.tailwindcss.com"></Script>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.js"></Script>
            <Script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></Script>
            <Script src="https://jsuites.net/v4/jsuites.js"></Script>
            <Script src="https://polyfill.io/v3/polyfill.min.js?features=default"></Script>
            <Script src="https://canvasjs.com/assets/script/canvasjs.min.js"></Script>
            <Script  async="false" defer  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&v=weekly&v=3.30&libraries=places`}></Script>            
            <Head>
                <title>USUARIOS</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.4/flowbite.min.css" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossorigin="anonymous" />                
                <link type="html/css" href="https://unpkg.com/browse/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
                <link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet"/>
            </Head>
            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center top-10 md:left-0">
                    {children}
                </div>
            ) : (
                <div className="bg-gray-200 min-h-screen md:top-0 md:left-0 mt-14">
                    <div className="flex min-h-screen md:top-0 md:left-0">
                        <Sidebar2/>
                        <main className="md:top-0 md:left-0 sm:w-2/3 xl:w-4/5 sm:min-h-screen sm:p-1 p-0 ">                            
                            {children}
                        </main>
                    </div>
                </div>
            )}
            
            
        </>
    );
}

export default Layout;