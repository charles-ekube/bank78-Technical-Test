import React, { ChangeEvent, useState } from 'react';
import { ArrowDown2 } from 'iconsax-react';
import { Option } from './GeneralTypes';

interface CustomDropDownProps {
    options?: Option[];
    selectData: (item: Option) => void;
    data?: string | null;
    label: string;
    error?: boolean;
}

const CustomDropDown = (props: CustomDropDownProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const { selectData, data, label, options, error } = props;
    const [inputValue, setInputValue] = useState<string>(data || '');

    const toggler = () => {
        setOpen((prev) => !prev);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleOptionSelect = (item: Option) => {
        setInputValue(item.value);
        selectData(item);
        setOpen(false); // Ensure the dropdown closes after selecting an option
    };

    return (
        <div className={`customDropDownWrapper `}>
            <label className={"customDropDownLabel"}>{label}</label>
            <div className={`customDropDown ${error ? 'dropdownError' : ''}`} onClick={toggler}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Select option"
                    readOnly
                />
                <ArrowDown2 size="18" color="#000" />
            </div>
            {open && (
                <ul className="customDropDownListContainer">
                    {options?.map((item, index) => (
                        <li
                            className="customDropDownListItem"
                            onClick={() => handleOptionSelect(item)}
                            key={index}
                        >
                            {item.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropDown;
