import React from 'react'
import AuthContainer from '../../components/auth/AuthContainer'
import CustomInput from '../../utils/CustomInput'
import Text from '../../utils/CustomText'
import { Link } from 'react-router-dom'

const Login = () => {
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
                <div className={''}>
                    <CustomInput label='Email' placeholder='Valid email' />
                    <CustomInput label='Password' placeholder='Enter your password' />

                </div>
            </div>
        </AuthContainer>
    )
}

export default Login