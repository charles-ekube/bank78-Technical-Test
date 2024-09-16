import React, { ChangeEvent, useState } from 'react'
import AuthContainer from '../../components/auth/AuthContainer'
import { Link, useNavigate } from 'react-router-dom'
import Text from '../../utils/CustomText'
import CustomInput from '../../utils/CustomInput'
import CustomDropDown from '../../utils/CustomDropDown'
import { BusinessTypeOptions, CountryOptions, simpleHash } from '../../utils/Helpers'
import { useAuth } from '../../context/AuthContext'
import InputErrorContainer from '../../utils/InputErrorContainer'
import { Errors } from '../../utils/GeneralTypes'
import CustomButton from '../../utils/CustomButton'


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



interface PasswordFeedbackType {
    minLength: boolean;
    upperCase: boolean;
    number: boolean;
    specialChar: boolean;
    lowerCase: boolean;
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
    const [passwordFeedback, setPasswordFeedback] = useState<PasswordFeedbackType>({
        minLength: false,
        upperCase: false,
        number: false,
        specialChar: false,
        lowerCase: false,
    });

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'password') {
            const passwordError = validatePassword(value);
            setErrors({ ...errors, password: passwordError });
        } else {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleBusinessType = (businessType: { value: string }) => {
        setFormData({ ...formData, businessType: businessType.value });
        setErrors({ ...errors, businessType: '' });
    };

    const handleCountry = (country: { value: string }) => {
        setFormData({ ...formData, country: country.value });
        setErrors({ ...errors, country: '' });
    };

    const validatePassword = (password: string) => {
        const minLength = 8;
        const upperCasePattern = /[A-Z]/;
        const numberPattern = /[0-9]/;
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        const lowerCasePattern = /[a-z]/;

        setPasswordFeedback({
            minLength: password.length >= minLength,
            upperCase: upperCasePattern.test(password),
            number: numberPattern.test(password),
            specialChar: specialCharPattern.test(password),
            lowerCase: lowerCasePattern.test(password),
        });

        if (password.length < minLength) {
            return 'Password must be at least 8 characters long';
        }
        if (!upperCasePattern.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!numberPattern.test(password)) {
            return 'Password must contain at least one number';
        }
        if (!specialCharPattern.test(password)) {
            return 'Password must contain at least one special character';
        }
        if (!lowerCasePattern.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }

        return '';
    };

    const validateForm = () => {
        const newErrors: Errors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else {
            const passwordError = validatePassword(formData.password);
            if (passwordError) newErrors.password = passwordError;
        }
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
            const hashedPassword = simpleHash(formData.password);
            const newUser = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                businessName: formData.businessName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: hashedPassword,
                cacNumber: formData.cacNumber,
                businessType: formData.businessType || '',
                country: formData.country || '',

            };

            register(newUser);
            navigate('/');

            setLoading(false);
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
                        <Link to="/">
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
                        <div className="passwordFeedback">
                            <p className={passwordFeedback.minLength ? 'valid' : 'invalid'}>Minimum 8 characters</p>
                            <p className={passwordFeedback.upperCase ? 'valid' : 'invalid'}>At least one uppercase letter</p>
                            <p className={passwordFeedback.number ? 'valid' : 'invalid'}>At least one number</p>
                            <p className={passwordFeedback.specialChar ? 'valid' : 'invalid'}>At least one special character</p>
                            <p className={passwordFeedback.lowerCase ? 'valid' : 'invalid'}>At least one lowercase letter</p>
                        </div>
                    </div>

                    <CustomButton title={'Sign up'} type='submit' className={'authButton'} loading={loading} />
                </form>
            </div>
        </AuthContainer>
    )
}

export default SignUp