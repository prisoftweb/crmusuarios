import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Save } from "../shared/icons";

const PlanInternet = ({planin, selectPackage, setSelectPackage} : {
    planin: any, selectPackage: boolean, setSelectPackage: Dispatch<SetStateAction<boolean>>;
} ) => {
// const PlanInternet = ({image, nombre, costo, megas, paqueterentipo, selectPackage, setSelectPackage} : {
//     image: string, nombre: string, costo: number, megas: string, paqueterentipo: string, selectPackage: boolean, setSelectPackage: Dispatch<SetStateAction<boolean>>;
// } ) => {
    return (
        <div className="bg-white max-w-xs">
            <div className="flex flex-col items-center pb-10 pt-5 ">
                <Image 
                    className="block mx-auto sm:mx-0 sm:flex-shrink-0 rounded-full"      
                    src={`/img/planes/${planin.imagen}`}
                    alt='Sin imagen'
                    width={64}
                    height={64}                        
                />
                
                <h5 className="mb-1 text-md font-light text-gray-700 dark:text-white">{planin.nombre}</h5>
                <h5 className="text-xs font-extralight text-gray-500 dark:text-white">{planin.megas}</h5>
                <h5 className="text-xs font-extralight text-gray-500 dark:text-white">{planin.paqueterentipo}</h5>
                <span className="mt-2 text-sm font-semibold text-red-500 dark:text-green-100">${planin.costo}.00</span>
                <div className="flex mt-3 space-x-3 md:mt-4">
                    {/* <button onClick={() => setSelectPackage(!selectPackage)} className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black" type="submit"> */}
                    <button onClick={() => setSelectPackage(!selectPackage)} className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800" type="submit">
                        <Save />
                        <p>Seleccionar</p>
                    </button>
                    {/* <a href="#" onClick={() => setSelectPackage(!selectPackage)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{planin.megas}</a>                     */}
                </div>
            </div>
    
        </div>
    )
}

export default PlanInternet;