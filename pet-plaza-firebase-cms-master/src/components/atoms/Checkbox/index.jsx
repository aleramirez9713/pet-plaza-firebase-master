import React from 'react'
import { Checkbox } from 'antd';

export const {Group}=Checkbox

const Checkboxs = ({children,...rest}) => {
    return (
        <Checkbox {...rest}>{children}</Checkbox>
    )
}

export default Checkboxs
