import { InputHTMLAttributes, ReactNode, Ref } from 'react';
import '../assets/styles/utils.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    customLabel?: string;
    customInputContainer?: string;
    inputStyle?: string;
    icon?: ReactNode;
    error?: boolean;
}

const CustomInput = (props: CustomInputProps) => {
    const { label, type, name, value, onChange, placeholder, disabled, icon,
        customInputContainer, error, ...otherProps } = props;


    return (
        <div className={`${customInputContainer}`}>
            {label && (
                <label className={'inputLabel'}>
                    {label}
                </label>
            )}
            <div className={`input ${error ? 'inputError' : ''}`}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`inputBox`}
                    disabled={disabled}
                    {...otherProps}
                />
                {icon && icon}
            </div>
        </div>
    );
};

export default CustomInput;
