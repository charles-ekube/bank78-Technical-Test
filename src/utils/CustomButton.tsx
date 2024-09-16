import React, { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    name?: string;
    customStyle?: string;
    title: string;
    loading?: boolean;
    img?: string;
}

const CustomButton = (props: CustomButtonProps) => {
    const { title, loading, img, disabled, customStyle, type, onClick, name, ...otherProps } = props
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            name={name}
            className={`button ${customStyle}`}
            {...otherProps}
        >
            {!loading ? title : ''}
            {img && <img src={img} alt="icon" />}
            {loading && <div className="loader"></div>}
        </button>
    );
};

export default CustomButton;
