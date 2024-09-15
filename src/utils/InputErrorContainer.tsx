import { InfoCircle } from 'iconsax-react'
import React from 'react'
import Text from './CustomText'


interface ErrorContainerProps {
    error: string;
}


const InputErrorContainer = (props: ErrorContainerProps) => {
    const { error } = props
    return (
        <div className={'inputErrorContainer'}>
            <InfoCircle size="14" color="#e71d36" />
            <Text tag={'p'}>
                {error}
            </Text>
        </div>
    )
}

export default InputErrorContainer