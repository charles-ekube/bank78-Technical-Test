import React, { ChangeEvent, useState } from 'react'
import AuthContainer from '../../components/auth/AuthContainer'
import { Link, useNavigate } from 'react-router-dom'
import Text from '../../utils/CustomText'
import CustomInput from '../../utils/CustomInput'
import CustomDropDown from '../../utils/CustomDropDown'
import { BusinessTypeOptions, CountryOptions } from '../../utils/Helpers'
import { useUser } from '../../context/ContextProvider'
import InputErrorContainer from '../../utils/InputErrorContainer'


interface SignUpState {
    firstName: string;
    lastName: string;
    businessName: string;
    phoneNumber: string;
    email: string;
    password: string;
    cacNumber: string;
    businessType: string | null;
    country: string | null;
}


interface Errors {
    firstName?: string;
    lastName?: string;
    businessName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    cacNumber?: string;
    businessType?: string;
    country?: string;
}



const SignUp = () => {
    const [formData, setFormData] = useState<SignUpState>({
        firstName: '',
        lastName: '',
        businessName: '',
        phoneNumber: '',
        email: '',
        password: '',
        cacNumber: '',
        businessType: null,
        country: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});

    const { login } = useUser();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleBusinessType = (businessType: { value: string }) => {
        setFormData({ ...formData, businessType: businessType.value });
        setErrors({ ...errors, businessType: '' });
    };

    const handleCountry = (country: { value: string }) => {
        setFormData({ ...formData, country: country.value });
        setErrors({ ...errors, country: '' });
    };

    const validateForm = () => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.businessType) newErrors.businessType = 'Business type is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.businessName) newErrors.businessName = 'Business name is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.cacNumber) newErrors.cacNumber = 'CAC number is required';

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            login(formData.email);
            navigate('/login');
        }, 2000);
    };



    return (
        <AuthContainer>
            <div>
                <header className={'formContentHeader'}>
                    <Text tag={'h4'}>
                        Join Bank 78
                    </Text>
                    <Text tag={'p'}>
                        Already have an account?
                        <Link to="/signup"> {/* Use the Link component for navigation */}
                            <Text tag="a" className="">
                                Log in
                            </Text>
                        </Link>
                    </Text>
                </header>
                <form onSubmit={handleSubmit} className={'formContent'}>
                    <div className={'inputContainer'}>
                        <CustomInput
                            label="First name"
                            name="firstName"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            error={!!errors.firstName}
                        />
                        {errors.firstName && <InputErrorContainer error={errors.firstName} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="Last name"
                            name="lastName"
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            error={!!errors.lastName}
                        />
                        {errors.lastName && <InputErrorContainer error={errors.lastName} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="Business name"
                            name="businessName"
                            placeholder="Your business name"
                            value={formData.businessName}
                            onChange={handleChange}
                            error={!!errors.businessName}
                        />
                        {errors.businessName && <InputErrorContainer error={errors.businessName} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="Phone number"
                            name="phoneNumber"
                            placeholder="000 000 000"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            error={!!errors.phoneNumber}
                        />
                        {errors.phoneNumber && <InputErrorContainer error={errors.phoneNumber} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomDropDown
                            label="Business Type"
                            options={BusinessTypeOptions}
                            selectData={handleBusinessType}
                            data={formData.businessType}
                            error={!!errors.businessType}
                        />
                        {errors.businessType && <InputErrorContainer error={errors.businessType} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="CAC Number"
                            name="cacNumber"
                            placeholder="Example 137733, 434242"
                            value={formData.cacNumber}
                            onChange={handleChange}
                            error={!!errors.cacNumber}
                        />
                        {errors.cacNumber && <InputErrorContainer error={errors.cacNumber} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="Official Email"
                            name="email"
                            placeholder="Valid email address"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                        />
                        {errors.email && <InputErrorContainer error={errors.email} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomDropDown
                            label="Country"
                            options={CountryOptions}
                            selectData={handleCountry}
                            data={formData.country}
                            error={!!errors.country}
                        />
                        {errors.country && <InputErrorContainer error={errors.country} />}
                    </div>

                    <div className={'inputContainer'}>
                        <CustomInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                        />
                        {errors.password && <InputErrorContainer error={errors.password} />}
                    </div>

                    <button type="submit" className="signupButton" disabled={loading}>
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </AuthContainer>
    )
}

export default SignUp