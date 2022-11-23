import React from 'react'
import {Image,Button} from '../../atoms'

const ImageButton = ({onClick,className,...rest}) => {
    return (
        <div className={className}>
            <Button type="link" onClick={onClick}>
                <figure>
                    <figcaption>
                        <Image {...rest} className={className}/>
                    </figcaption>
                </figure>
            </Button>
        </div>
    )
}

export default ImageButton
