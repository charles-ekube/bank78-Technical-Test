import React, { ChangeEvent, useState } from 'react';
import AuthContainer from '../../components/auth/AuthContainer';
import CustomInput from '../../utils/CustomInput';
import Text from '../../utils/CustomText';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/ContextProvider';
import InputErrorContainer from '../../utils/InputErrorContainer';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useUser();
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setEmailError(null);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordError(null);
    };

    const validateForm = () => {
        let isValid = true;
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (email === 'user@example.com' && password === 'password') {
                login(email);
                navigate('/dashboard');
            } else {
                setPasswordError('Invalid email or password');
            }
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
                        New to Bank 78?{' '}
                        <Link to="/signup">
                            <Text tag="a" className="">
                                {' '}Sign up
                            </Text>
                        </Link>
                    </Text>
                </header>
                <form onSubmit={handleSubmit} className={'formContent'}>
                    <div className={'inputContainer'}>
                        <CustomInput
                            label='Email'
                            name='email'
                            placeholder='Valid email'
                            value={email}
                            onChange={handleEmailChange}
                            error={!!emailError}
                        />
                        {emailError && <InputErrorContainer error={emailError} />}
                    </div>
                    <div className={'inputContainer'}>
                        <CustomInput
                            label='Password'
                            type='password'
                            name='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={handlePasswordChange}
                            error={!!passwordError}
                        />
                        {passwordError && <InputErrorContainer error={passwordError} />}
                    </div>
                    <button type='submit' className='loginButton' disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </AuthContainer>
    );
};

export default Login;
