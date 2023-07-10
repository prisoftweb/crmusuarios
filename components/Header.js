import React from "react";
import { useRouter } from "next/router";
import {setLogout} from '../pages/api/user';
import Alerta, {showToastMessage, showToastMessageError } from '../components/Alerta';


const Header = ({usr}) => {
    const router = useRouter();
    const nombre='Prisco';
    const login = () => {        
        router.push('/login');
    }
    const  cerrarSesion = async () => {        
        let res = await setLogout();
        if(res.status === 'success') {            
            showToastMessage('Se ha cerrado sesion!');
        } else {
            showToastMessageError(res);            
        }                            
    }
    return (
        <>
            <Alerta></Alerta>
            <div className="flex justify-between ">
                <p className="mr-2">Hola: {nombre}</p>
                <button
                    onClick={() => login()}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button">
                    Login
                </button>
                <button
                    onClick={() => cerrarSesion()}
                    className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs text-white rounded py-1 px-2 shadown-md"
                    type="button">
                    Cerrar
                </button>
            </div>
        </>
    );
}
export async function getStaticProps() {
    const url = `${process.env.API_URL}/api/v1/users/islogin`;
    const usr = await fetch(url).json();
    return {
        props: {
            usr
        }
    }
}
export default Header;