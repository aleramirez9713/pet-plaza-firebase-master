import React, { useEffect, useState, Fragment } from "react";
import {
  getAProduct,
  removeStorage,
  updateProductStore,
  removeElementFromArray,
  getToken,
} from "../../../hooks";
import { useParams } from "react-router-dom";
import { Loading, ModalImage } from "../../molecules";
import {
  Row,
  Col,
  Space,
  Form,
  message,
  Button,
  Icon
} from "../../atoms";
import { NoData, ContentDetailsCards } from "../../organisms";
import { TEditProduct, TDeleteProduct } from "../../templates";
import { formatterHNL } from "../../../consts";
import "./style.css";

const DetailsProducts = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingModalImage, setloadingModalImage] = useState(false);
  const [err, setErr] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [imageProduct, setImageProduct] = useState("");
  const [index, setindex] = useState(0);
  const [form] = Form.useForm();
  const { id } = useParams();

  const getData = async (id) => {
    setLoading(true);
    let data = await getAProduct(id);
    if (data.success) {
      setInfo(data.data);
      if (data.data.images) {
        setImageProduct(data.data.images.length > 0 ? data.data.images : []);
      }
    } else {
      setErr(true);
      setInfo({});
      setImageProduct([]);
    }
    setLoading(false);
  };

  const handleOnCacel = () => {
    setVisibleEditModal(false);
    form.resetFields();
  };

  const removeImage = async (urlImage) => {
    setloadingModalImage(true);
    let response = await removeStorage(urlImage);
    if (response.success) {
      let value = {
        images: removeElementFromArray(info.images, urlImage, "url"),
      };
      let token = await getToken();
      if (token.success) {
        let response = await updateProductStore(
          token.token,
          value,
          id
        );
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response);
        }
      } else {
        message.error(token.error);
      }
    } else {
      message.error("Error en la solicitud");
    }
    getData(id);
    setVisibleImage(false);
    setloadingModalImage(false);
  };

  useEffect(() => {
      getData(id);
  }, [id]);

  const prev=()=>{
    let temp = index - 1
    if (temp >= 0) {
      setindex(temp)
    }
  }

  const next=()=>{
    let temp = index + 1
    if (temp < imageProduct.length) {
      setindex(temp)
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : Object.entries(info).length > 0 ? (
        <Row className="content-product-full">
          <Col span={24} className="content-edit-delete">
            <Space>
              <TEditProduct
                visible={visibleEditModal}
                onCancel={handleOnCacel}
                onClick={() => setVisibleEditModal(true)}
                info={info}
                getData={() => getData(id)}
                id={id}
                initialValues={{
                  "hidden-true": info.hidden ? true : false,
                  "hidden-false": info.hidden ? false : true,
                  "available-true": info.available ? true : false,
                  "available-false": info.available ? false : true,
                  ...info,
                }}
                form={form}
                image
              />
              <TDeleteProduct id={id} info={info} />
            </Space>
          </Col>
          <Row className="scroll-y-section-product">
            <ContentDetailsCards
              cardImage={{
                span: {},
                image: info.images,
                description: (
                  <div className='content-description'>
                    <Button onClick={()=>setVisibleImage(true)} icon={<Icon name='ExpandOutlined' />}>Maximizar</Button>
                  </div>
                )
              }}
              cardInfo={{
                span: {},
                title: "Detalles del Producto",
                info: [
                  { label: "Nombre", item: info.name },
                  { label: "Código", item: info.code },
                  {
                    label: "Precio",
                    item: formatterHNL.format(Math.ceil(info.price)),
                  },
                  {
                    label: "Detalle del precio",
                    item: info.priceDetail,
                  },
                  {
                    label: "Tipo de producto",
                    item: info.type === "product" ? "Producto" : "Accesorio",
                  },
                  { label: "Posición", item: info.position },
                  {
                    label: "Producto disponible",
                    item: info.available ? "Si" : "No",
                  },
                  {
                    label: "Estado",
                    item: info.hidden ? "Oculto" : "Visible",
                  },
                  { label: "Información", item: info.description },
                ],
              }}
            />
            <ModalImage
              title={info.name}
              visible={visibleImage}
              image={imageProduct[index].url}
              loading={loadingModalImage}
              onCancel={() => {
                setVisibleImage(false);
                setindex(0);
              }}
              onClick={{ remove: () => removeImage(imageProduct[index].url) }}
              prevArrow={prev}
              nextArrow={next}
              text={`${index+1}/${imageProduct.length}`}
            />
          </Row>
        </Row>
      ) : (
        <NoData visible={err} onCancel={() => setErr(false)} />
      )}
    </Fragment>
  );
};

export default DetailsProducts;
