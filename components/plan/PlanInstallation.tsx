import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Save } from "../shared/icons";

const PlanInstallation = ({planins, selectPackageIns, setSelectPackageIns} : {
    planins: any, selectPackageIns: boolean, setSelectPackageIns: Dispatch<SetStateAction<boolean>>;
} ) => {
// const PlanInsstallation = ({image, nombre, costo, megas, paqueterentipo, selectPackageIns, setSelectPackageIns} : {
//     image: string, nombre: string, costo: number, megas: string, paqueterentipo: string, selectPackageIns: boolean, setSelectPackageIns: Dispatch<SetStateAction<boolean>>;
// } ) => {
    return (
        <div className="bg-white max-w-xs">
            <div className="flex flex-col items-center pb-10 pt-5 ">
                <Image 
                    className="block mx-auto sm:mx-0 sm:flex-shrink-0 rounded-full"      
                    src={`/img/planes/${planins.imagen}`}
                    alt='Sin imagen'
                    width={64}
                    height={64}                        
                />
                
                <h5 className="mb-1 text-md font-light text-gray-700 dark:text-white">{planins.nombre}</h5>                
                <h5 className="text-xs font-extralight text-gray-500 dark:text-white">{planins.paqueterentipo}</h5>
                <span className="mt-2 text-sm font-semibold text-red-500 dark:text-green-100">${planins.costo}.00</span>
                <div className="flex mt-3 space-x-3 md:mt-4">                    
                    <button onClick={() => setSelectPackageIns(!selectPackageIns)} className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800" type="submit">
                        <Save />
                        <p>Seleccionar</p>
                    </button>                    
                </div>
            </div>
    
        </div>
    )
}

export default PlanInstallation;