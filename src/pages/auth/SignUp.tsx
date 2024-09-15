import React, { useState } from 'react'
import AuthContainer from '../../components/auth/AuthContainer'
import { Link, useNavigate } from 'react-router-dom'
import Text from '../../utils/CustomText'
import CustomInput from '../../utils/CustomInput'
import CustomDropDown from '../../utils/CustomDropDown'
import { BusinessTypeOptions, CountryOptions } from '../../utils/Helpers'
import { useUser } from '../../context/ContextProvider'


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
    const [loading, setLoading] = useState(false);

    const { login } = useUser();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBusinessType = (businessType: { value: string }) => {
        setFormData({ ...formData, businessType: businessType.value });
    };

    const handleCountry = (country: { value: string }) => {
        setFormData({ ...formData, country: country.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.businessType || !formData.country) {
            alert('Please fill in all required fields.');
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
                        Welcome back, Please Sign in
                    </Text>
                    <Text tag={'p'}>
                        New to Bank 78?
                        <Link to="/signup"> {/* Use the Link component for navigation */}
                            <Text tag="a" className="">
                                Sign up
                            </Text>
                        </Link>
                    </Text>
                </header>
                <form onSubmit={handleSubmit} className={'formContent'}>
                    <div>
                        <CustomInput
                            label="First name"
                            name="firstName"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Last name"
                            name="lastName"
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Business name"
                            name="businessName"
                            placeholder="Your business name"
                            value={formData.businessName}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Phone number"
                            name="phoneNumber"
                            placeholder="000 000 000"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomDropDown
                            label="Business Type"
                            options={BusinessTypeOptions}
                            selectData={handleBusinessType}
                            data={formData.businessType}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="CAC Number"
                            name="cacNumber"
                            placeholder="Example 137733, 434242"
                            value={formData.cacNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Official Email"
                            name="email"
                            placeholder="Valid email address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <CustomDropDown
                            label="Country"
                            options={CountryOptions}
                            selectData={handleCountry}
                            data={formData.country}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
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