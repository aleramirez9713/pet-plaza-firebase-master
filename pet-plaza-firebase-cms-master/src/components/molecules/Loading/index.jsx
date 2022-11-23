import React from 'react'
import { Spin } from 'antd';
import { Icon } from '../../atoms'
import './style.css'

const antIcon = <Icon name='LoadingOutlined' className='size-icon' spin />;

const Loading=()=> {
    return (
        <div className='content-loading'>
            <Spin indicator={antIcon} />
        </div>
    )
}
export default Loading