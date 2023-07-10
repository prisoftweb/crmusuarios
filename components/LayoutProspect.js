import React, { Children } from 'react'
import { useRouter } from "next/router";
import HeaderBarProspects from './HeaderBarProspects';

const LayoutProspect = ({children, cli, notexclient, isclients}) => {    
    const router = useRouter();    
    return (
        <>            
            <div className="bg-gray-200 min-h-screen">
                <div className="md:flex min-h-screen">
                    <HeaderBarProspects cli={cli} notexclient={notexclient} isclients={isclients}/>
                    {/* md:flex sm:w-2/3 xl:w-4/5  */}
                    <main className="md:flex min-h-screen">                            
                        {children}                            
                    </main>                    
                </div>
            </div>                        
        </>
    );
}

export default LayoutProspect;