import Alerta, {showToastMessage} from "@/components/Alerta";
import Layout from "@/components/Layout";
import Image from 'next/image'
import {logOut} from './api/user';
import { useRouter } from "next/router";
import { deleteCookie } from 'cookies-next';
import styles from '@/styles/Home.module.css'

function LOGOUT() {
    const router = useRouter();
    
    // const removeLocalStorage = () => {
    //     localStorage.removeItem('key');
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    // }

    const removeCookies = () => {
        deleteCookie('token');
        deleteCookie('user');
    }
    // removeLocalStorage();
    removeCookies();
    showToastMessage(`Se ha cerrado sesion!`)

    return (        
        <div>      
            <Layout>
                <Alerta></Alerta>
                <div className="flex justify-center mt-12">
                    <div className="w-full max-w-sm">
                        <p className="text-3xl">Hasta la proxima!!!</p>
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
                        <a rel="noopener noreferrer" href="/login" className="px-8 py-10 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Iniciar sesion</a>  
                    </div>                
                </div>                               
            </Layout>
        </div>
    );
}

export async function getServerSideProps() {    
    let usr;
    try {
        usr = await logOut();        
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
            usr
        },
    };
}

export default LOGOUT;