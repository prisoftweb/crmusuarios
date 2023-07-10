import Layout from "@/components/Layout";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { TrashIcon } from '@heroicons/react/24/solid';
import Alerta, {showToastMessage, showToastMessageError, showToastMessageWarning, showToastMessageInfo} from "@/components/Alerta";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {useEffect, useState} from 'react';
import { getCookie } from "cookies-next";
import { getAllUsers, removeUser } from "./api/user";
import { Save } from "@/components/shared/icons";

function USER({ users, token:string }) {
  const router = useRouter();
  let [dataok, setDataok]=useState(users.data.data);
  useEffect(() => { // Perform localStorage action  // const token = localStorage.getItem('token')    
  }, [])
    
  /**
   * Metodo para eliminar un determinado usuario
   * @param id Id del usuario
   * @param user Nombre del usuario
   */
  const deleteUser = async (id:string, user:any)  => {
    //console.log(id);
    confirmAlert({
      title: 'Confirmacion para eliminar Usuario?',
      message: `Desea eliminar al usuario ${user}`,
      buttons: [
        {
          label: 'Si',
          onClick: async () => {
            let res = await removeUser(id, token);
            //console.log('Despues de removeUser');
            //console.log(res);
            if(res != undefined) {
              if(res === 204) {
                showToastMessage('Usuario eliminado exitosamente!');
                users = await getAllUsers(token);
                  //console.log(users);
                } else {
                  showToastMessageError(res);
                }
              } else {
                users = await getAllUsers(token);
                // data = users.data.data;
                setDataok(users.data.data);
                //console.log(dataok);
                //console.log(data);
                query=' ';                                
              }
            }
          },
          {
            label: 'No',
            onClick: () => {
              showToastMessageInfo('Se ha cancelado la eliminacion!');            
            }
          }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {
        showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
      },
      onKeypress: () => {
        showToastMessageInfo('Favor de seleccionar SI o NO');
      },
      onKeypressEscape: () => {
        showToastMessageWarning('Se ha cerrado dialogo, volver a intentar!');
      },
      overlayClassName: "overlay-custom-class-name"
    });      
  }
  const goToNewUser = () => {
    router.push({
      pathname: `/usersnew`
    });
  }

    return (
      <div>
        <Alerta></Alerta>
        <Layout >
          <div className="flex flex-row flex-1 justify-between items-center pb-2">
            <div className="flex space-x-5">
                {/* <h2 className="justify-center text-xl text-indigo-900 font-display font-light lg:text-left xl:text-2xl xl:text-normal">Usuarios: {router.pathname}</h2>                  
                 */}
              <span className="flex items-center text-xs font-thin text-gray-900 dark:text-white"><span className="flex w-2.5 h-2.5 bg-blue-600 rounded-full mr-1.5 flex-shrink-0"></span>Admin</span>
              <span className="flex items-center text-xs font-thin text-gray-900 dark:text-white"><span className="flex w-2.5 h-2.5 bg-purple-500 rounded-full mr-1.5 flex-shrink-0"></span>User</span>
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>                
            </div>
            <button className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" onClick={() => goToNewUser()}>
                <Save />
                <p>Nuevo </p>
            </button>
          </div>
          <div className="table-responsive">

          <table className="table table-striped min-w-full leading-normal">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nombre/ID</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Usuario</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rol</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users.data.data.map(user => (
                <tr key={user.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex">
                      <div className="flex-shrink-0 w-10 h-10">                       
                        <Link  href={`/user/${user._id}`}>
                          <Image    
                            className="rounded-full"                      
                            src={`/img/users/${user.photo}`}
                            alt={user.name}
                            width={48}
                            height={48}                                    
                            priority="true"                                    
                          />
                        </Link>
                      </div>
                      <div className="ml-3">
                        <Link  href={`/user/${user._id}`}>
                          <p className="text-gray-900 whitespace-no-wrap">
                            {user.name}
                          </p>
                        </Link>
                        <p className="text-gray-600 whitespace-no-wrap">{user._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{user.email}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">****</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`inline-flex items-center bg-${user.role === 'admin' ? 'blue' : 'purple'}-100 text-${user.role === 'admin' ? 'blue' : 'purple'}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-${user.role === 'admin' ? 'blue' : 'purple'}-900 dark:text-${user.role === 'admin' ? 'blue' : 'purple'}-300`}>
                        <span className={`w-2 h-2 mr-1 bg-${user.role === 'admin' ? 'blue' : 'purple'}-500 rounded-full`}></span>
                        {user.role}
                    </span>
                  </td>                  
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><Link  href={`/user/${user._id}`}>Activo</Link></td>
                  <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
                    <button type="button" onClick={() => deleteUser(user._id, user.name)}>
                      <TrashIcon className="h-4 w-4 text-red-300"/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          </div>
        </Layout>
      </div>
    );
  }
export async function getServerSideProps({req, res}) {      
    let users;
    let token: any;
    token = getCookie('token', {req, res});
    try {
        if(token != '') {
          users = await getAllUsers(token);
        } else {
          showToastMessageInfo('Favor de iniciar sesion!');
        }        
      } catch (e) {    /*** Si algo salio mal con la solicitud, 404 page */
        return {
          notFound: true,
        };
      }
      if (!users) { /*** Si no recuperamos un `perro`, devolvemos una página 404 */ 
        return {
          notFound: true,
        };
      }
      return {
        props: {
          users, token
        },
      };
}
export default USER;