import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({value, onChange, label, placeholder, type}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    <div>
        <label className=" text-[13px] text-slate-700">{label}</label>

        <div className="input-box">
            <input
                type={type === "password" ? (showPassword ? "text" : "password") : type}
                value={value}
                onChange= {(e) => onChange(e)}
                placeholder={placeholder}
                className="w-full border border-none rounded-md px-10 py-2 focus:outline-none"
            />

            {type === "password" && (
                <>
                {showPassword ? (
                    <FaRegEye
                    size ={20}
                    className="text-primary cursor-pointer"
                    onClick={ () => toggleShowPassword() }
                    />
                ) : (
                    <FaRegEyeSlash
                    size ={20}
                    className="text-slate-400 cursor-pointer"
                    onClick={ () => toggleShowPassword() }
                    />
                )}
                </>
            )}


        </div>
    </div>
  );
};

export default Input;