import React from 'react'
import { Image } from "antd";

const Images=({source,className,...rest})=> {
    return(
        <div className={className}>
            <Image src={source} alt='image' width="100%" height="100%" {...rest} />
        </div>
    )
}
export default Images