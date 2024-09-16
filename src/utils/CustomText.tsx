import { ElementType, ReactNode } from 'react';


interface CustomTextProps {
    tag?: ElementType;
    className?: string;
    children: ReactNode;
    [key: string]: any;
    color?: string;
    fs?: string;
    fw?: number;
}

const Text = (props: CustomTextProps) => {
    const { tag = 'span', className, children, color, fs, fw, ...otherProps } = props
    const CustomTag: ElementType = tag;
    const combinedClassName = `text ${className}`.trim();
    return (
        <CustomTag className={combinedClassName} {...otherProps} style={{ color: color, fontSize: fs, fontWeight: fw }}>
            {children}
        </CustomTag>
    );
};

export default Text;



