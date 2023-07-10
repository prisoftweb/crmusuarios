import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from "next/router";
import Layout from '../components/Layout';
import Conditional from './../components/Conditional';
import { getCookie } from "cookies-next";
import React from 'react';
import { Save } from '@/components/shared/icons';


const inter = Inter({ subsets: ['latin'] })

const Index = ({}) => { 
  let user;
  let ok = false;
  const router = useRouter();
  const { pathname, query } = router;
  const goToSignIn = () => {
    router.push({
      pathname: '/login'          
    }
  );
  }  
  try {
    user = JSON.parse(getCookie('user'));
    
    if(user){
        ok = true;
    } else {             
    }      
  } catch (error) {
      console.log('error')
  }
  return (
    <div>
    <Layout >    
      <Head>
        <title>USERS</title>
        <meta name="description" content="CRM para clientes prospectos Teltan " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={`${styles.center} flex mx-auto flex-col`}>
          <Image
            className={styles.logo}
            src="/teltan-logo-2022.svg"
            alt="Teltan Logo"
            width={240}
            height={45}
            priority
          />          
          <Conditional showComp={!ok}>
            <div className="mt-10">
              <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={() => goToSignIn()}>
                  <Save />
                  <p>Iniciar sesion </p>
              </button>            
            </div>                   
          </Conditional>
        </div>
        <h1 className="flex items-center text-5xl font-extrabold dark:text-white">Usuarios<span className="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">CRM</span></h1>
      </main>    
    </Layout>
    </div>
  )

}
export default Index;
