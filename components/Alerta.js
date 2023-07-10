import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerta = () => {
    
    return (
        <div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />            
            <ToastContainer/>
        </div>
    );
}
export const  showToastMessage = (msg) => {
    toast.success((msg), {
        position: toast.POSITION.TOP_CENTER                        
    });
};
export const showToastMessageError = (msg) => {
    toast.error((msg), {
        position: toast.POSITION.TOP_CENTER                        
    });
};
export const showToastMessageWarning = (msg) => {
    toast.warn((msg), {
        position: toast.POSITION.TOP_CENTER                        
    });
};

export const showToastMessageInfo = (msg) => {
    toast.info((msg), {
        position: toast.POSITION.TOP_CENTER                        
    });
};

export default Alerta;