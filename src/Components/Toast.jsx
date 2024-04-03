import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Toast(){
    const notify = () => toast.success('Product Added To Cart ❤️', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        
        });

    return (
        <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
        </div>
    );
}