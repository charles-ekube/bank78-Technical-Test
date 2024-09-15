import React, { ReactNode } from 'react'
import { Globe, Logo } from '../../assets/images/Index'
import '../../assets/styles/authStyles.css';
import Text from '../../utils/CustomText';


interface AuthContainerProps {
    children: ReactNode,
}

const AuthContainer = (props: AuthContainerProps) => {
    const { children } = props
    return (
        <main className={'authContainer'}>
            <header>
                <img src={Logo} alt='bank_78' />
            </header>
            <section className={'formContainer'}>
                <div className={'formImageContainer'}>
                    <img src={Globe} alt='globe_image' />
                    <Text tag={'h4'}>
                        One global bank, every way your money moves
                    </Text>
                </div>
                <div>
                    {children}
                </div>
            </section>
        </main>
    )
}

export default AuthContainer