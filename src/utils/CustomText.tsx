import { ElementType, ReactNode } from 'react';


interface CustomTextProps {
    tag?: ElementType;
    className?: string;
    children: ReactNode;
    [key: string]: any;
}

const Text = (props: CustomTextProps) => {
    const { tag = 'span', className, children, ...otherProps } = props
    const CustomTag: ElementType = tag; // Dynamic tag, default to 'span'
    const combinedClassName = `text ${className}`.trim(); // Combine class names
    return (
        <CustomTag className={combinedClassName} {...otherProps}>
            {children}
        </CustomTag>
    );
};

export default Text;



