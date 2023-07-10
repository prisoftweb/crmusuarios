import React, { Children } from 'react'
import { useRouter } from "next/router";

const LayoutClient = ({children, cli}) => {
    // Hook de Routing
    const router = useRouter();
    // console.log(cli);
    return (
        <>            
            <div className="bg-gray-200 min-h-screen">
                <div className="md:flex min-h-screen">
                    {/* <HeaderBarClient cli={cli} /> */}
                    {/* md:flex sm:w-2/3 xl:w-4/5  */}
                    <main className="md:flex min-h-screen">                            
                        {children}                            
                    </main>                    
                </div>
            </div>                        
        </>
    );
}

export default LayoutClient;