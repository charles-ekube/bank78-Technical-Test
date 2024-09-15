import { InputHTMLAttributes, ReactNode, Ref } from 'react';
import '../assets/styles/utils.css';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    customLabel?: string;
    customInputContainer?: string;
    inputStyle?: string;
    icon?: ReactNode;
}

const CustomInput = (props: CustomInputProps) => {
    const { label, type, name, value, onChange, placeholder, disabled, icon, customLabel,
        inputStyle, customInputContainer, ...otherProps } = props
    return (
        <div className={`inputContainer ${customInputContainer}`}>
            {label && (
                <label className={`${customLabel}`}>
                    {label}
                </label>
            )}
            <div className={`input flexRow alignCenter justifyBetween ${inputStyle}`}>
                <input type={type} name={name} value={value} onChange={onChange}
                    placeholder={placeholder} className={'inputBox'}
                    disabled={disabled}
                    {...otherProps}
                />
                {icon && icon}
            </div>
        </div>
    );
};

export default CustomInput;
