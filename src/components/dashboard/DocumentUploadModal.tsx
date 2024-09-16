import React, { ChangeEvent, useState } from 'react'
import { UserData } from '../../utils/GeneralTypes';
import { fileToBase64, IDType } from '../../utils/Helpers';
import Text from '../../utils/CustomText';
import CustomDropDown from '../../utils/CustomDropDown';
import CustomInput from '../../utils/CustomInput';
import FileUpload from '../../utils/FileUploadaInput';
import CustomButton from '../../utils/CustomButton';

interface DocumentUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface State {
    IDTypeSelected: string | null;
    IDNumber: string;
}

const DocumentUploadModal = (props: DocumentUploadModalProps) => {
    const { isOpen, onClose } = props;
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<State>({
        IDTypeSelected: '',
        IDNumber: '',
    });

    const resetState = () => {
        setFile(null);
        setFormData({
            IDTypeSelected: '',
            IDNumber: '',
        });
    };
    const uploadFileForUser = async (file: File) => {
        const currentUserString = localStorage.getItem('currentUser');
        if (!currentUserString) {
            console.error('No user is currently logged in.');
            return;
        }

        const currentUser: UserData = JSON.parse(currentUserString);
        const fileBase64 = await fileToBase64(file);
        const updatedUser = {
            ...currentUser,
            uploadedFiles: [...(currentUser.uploadedFiles || []), { file: fileBase64, fileName: file.name }]
        };

        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map((user: UserData) =>
            user.email === currentUser.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        console.log('File uploaded and attached to the user.');
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleIDType = (IDType: { value: string }) => {
        setFormData({ ...formData, IDTypeSelected: IDType.value });
    };

    const handleFileUpload = async () => {
        if (file) {
            await uploadFileForUser(file);
            // alert('File uploaded successfully!');
            onClose()
            resetState()
        } else {
            alert('Please select a file first.');
        }
    };

    return (
        <div className={`documentsModal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className="documentsModalContent" onClick={(e) => e.stopPropagation()}>
                <header className={'mb-10'}>
                    <Text tag={'h4'}>Documents Verification</Text>
                </header>
                <div className={'mb-10'}>
                    <CustomDropDown
                        label="Business Type"
                        options={IDType}
                        selectData={handleIDType}
                        data={formData.IDTypeSelected}
                    />
                </div>
                <div className={'mb-10'}>
                    <CustomInput
                        label="ID Number"
                        name="IDNumber"
                        placeholder="Type in full ID number"
                        value={formData.IDNumber}
                        onChange={handleChange}
                    />
                </div>
                <div className={'mb-10'}>
                    <FileUpload label="Upload Document" onFileChange={handleFileChange} />
                </div>
                <CustomButton title="Submit" className={'uploadButton'} onClick={handleFileUpload} />
            </div>
        </div>
    );
};

export default DocumentUploadModal;
