import React from 'react'
import {Modal,Row,Space,Icon} from '../../atoms'
import './style.css'

const Err=(props)=> {
    return (
        <Modal
          title={
            <Row>
              <Space>
                <Icon name='WarningOutlined' className='warning-color'/>
                <h2>Error</h2>
              </Space>
            </Row>
          }
          visible={props.visible}
          footer=''
          onCancel={props.onCancel}
          >
            <div>
              <p>Error al obtener los datos,</p>
              <p>Recargue la página nuevamente.</p>
            </div>
          </Modal>

    )
}
export default Err