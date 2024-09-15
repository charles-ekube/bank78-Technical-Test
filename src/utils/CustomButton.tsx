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
            className={`button f16 semiBoldText ${customStyle}`}
            style={{ backgroundColor: disabled ? '#68E8E3' : '#04D9D1' }}
            {...otherProps}
        >
            {!loading ? title : ''}
            {img && <img src={img} alt="icon" />}
            {loading && <span className="loader"></span>}
        </button>
    );
};

export default CustomButton;
