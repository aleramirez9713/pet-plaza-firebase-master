import React from 'react'
import {Select} from 'antd'

const { Option } = Select;

export {Option}

const Selects = ({children, ...rest}) => {
    return (
        <Select {...rest}>
            {
                children
            }
        </Select>
    )
}

export default Selects
