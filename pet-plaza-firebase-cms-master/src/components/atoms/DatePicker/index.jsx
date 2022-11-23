import React from 'react'
import {DatePicker} from 'antd'

const { RangePicker } = DatePicker;

export {RangePicker}

const DatePickers = ({...rest}) => {
    return (
        <DatePicker {...rest}/>
    )
}

export default DatePickers
