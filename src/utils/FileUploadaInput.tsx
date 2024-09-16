import React, { ChangeEvent, useRef, useState } from 'react';
import Text from './CustomText';
import '../assets/styles/utils.css'
import { shortenXterLength } from './Helpers';

interface FileUploadProps {
    label: string;
    customInputContainer?: string;
    inputStyle?: string;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    label,
    customInputContainer = '',

    onFileChange,
}) => {
    const [preview, setPreview] = useState<string | null>(null);
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setPreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }

        onFileChange(e);
    };

    return (
        <div
            className={`inputContainer ${customInputContainer}`}
            onClick={handleClick}
        >
            <label>
                {label}
            </label>

            <div
                className={`inputStyle`}
                style={{ padding: '0 16px', height: '48px' }}
            >
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={hiddenFileInput}
                />
                {preview ? (
                    <Text tag={'p'} >{shortenXterLength(preview)}</Text>
                ) : (
                    <Text tag={'p'}>
                        Upload document for verification in jpg or png (size within 6mb).
                    </Text>
                )}
                <label style={{ position: 'absolute', right: '16px' }}>

                </label>
            </div>

            {preview && <img src={preview} alt="Uploaded" className={'previewImage'} />}
        </div>
    );
};

export default FileUpload;
