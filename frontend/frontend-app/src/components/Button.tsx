import React from 'react';
interface ButtonProps {
    onClick? : ()=> void;
    disabled? : boolean;
    type? : string;
    children: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
    return props?.disabled ? 
    <button {...props} className="w-full h-12 text-white bg-gray-300 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800">
        {props.children}
    </button>
    : <button {...props} className="w-full h-12 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        {props.children}
    </button>
}

export default Button