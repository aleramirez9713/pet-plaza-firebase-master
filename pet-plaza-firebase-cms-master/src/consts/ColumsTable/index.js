import React from "react";
import { Tag } from "../../components/atoms";

export const columnsTableSpecial = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Producto total",
    dataIndex: "totalProduct",
    key: "totalProduct",
    align: "center",
  },
  {
    title: "Posición",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "Estado",
    dataIndex: "active",
    key: "active",
    align: "center",
  },
];

export const columnsTableProducts = [
  {
    title: "",
    dataIndex: "image",
    key: "image",
    align: "center",
  },
  {
    title: "Codigo",
    dataIndex: "code",
    key: "code",
    align: "center",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Descripción",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Estado",
    dataIndex: "hidden",
    key: "hidden",
    align: "center",
  },
  {
    title: "Posición",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    align: "center",
  },
];

export const columnsTableOrders = [
  {
    title: "Código de orden",
    dataIndex: "orderId",
    key: "orderId",
    align: "center",
  },
  {
    title: "",
    key: "tags",
    dataIndex: "tags",
    render: (date) => {
      let status = minutesOld(date);
      return (
        <>{status ? <Tag color="green">{status.toUpperCase()}</Tag> : null}</>
      );
    },
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
  {
    title: "Hora",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "Tipo de orden",
    dataIndex: "orderType",
    key: "orderType",
    align: "center",
  },
  {
    title: "Método de pago",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    align: "center",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    align: "center",
  },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: "center",
  },
];

export const columnsTableProductsOfTheOrders = [
  {
    title: "",
    dataIndex: "image",
    key: "image",
    align: "center",
  },
  {
    title: "Código",
    dataIndex: "code",
    key: "code",
    align: "center",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    align: "center",
  },
];

export const columnsExel = [
  {
    label: "Código",
    key: "orderId",
  },
  {
    label: "Fecha",
    key: "date",
  },
  {
    label: "Hora",
    key: "hour",
  },
  {
    label: "Estado",
    key: "status",
  },
  {
    label: "Tipo de orden",
    key: "orderType",
  },
  {
    label: "Tienda",
    key: "store",
  },
  {
    label: "Cliente",
    key: "buyer-name",
  },
  {
    label: "Teléfono del comprador",
    key: "buyer-phone",
  },
  {
    label: "Dirección exacta",
    key: "shipping-address-complete",
  },
  {
    label: "Costo de envío",
    key: "shippingCost",
  },
  {
    label: "Sub total",
    key: "subtotal",
  },
  {
    label: "Total",
    key: "total",
  },
];

export const columnsExelListVets = [
  {
    label: "Nombre",
    key: "name",
  },
  {
    label: "Correo",
    key: "email",
  },
  {
    label: "Falcultad",
    key: "faculty",
  },
  {
    label: "Especialidad",
    key: "speciality",
  },
  {
    label: "Holario",
    key: "horaries",
  },
];

export const columnsTableCollaborators = [
  {
    title: "Nombre",
    dataIndex: "fullName",
    key: "fullName",
    align: "center",
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "Rol",
    dataIndex: "role",
    key: "role",
    align: "center",
  },
  {
    title: "Disponibilidad",
    dataIndex: "enable",
    key: "enable",
    align: "center",
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    align: "center",
  },
];

export const columnsTableCategories = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Posición",
    dataIndex: "position",
    key: "position",
    align: "center",
  },
  {
    title: "Visible en APP",
    dataIndex: "active",
    key: "active",
    align: "center",
  },
  {
    title: "Tipo de categoría",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];

export const columnsTableVets = [
  {
    title: "Nombre",
    dataIndex: "fullName",
    key: "fullName",
    align: "center",
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    align: "center",
  },
  {
    title: "Facultad",
    dataIndex: "faculty",
    key: "faculty",
    align: "center",
  },
  {
    title: "Especialidad",
    dataIndex: "speciality",
    key: "speciality",
    align: "center",
  },
  {
    title: "Disponibilidad",
    dataIndex: "enable",
    key: "enable",
    align: "center",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: "center",
  },
];

export const columnsTableSpecialities = [
  {
    title: "Especialidad",
    dataIndex: "value",
    key: "value",
    align: 'center',
  },
  {
    title: "Cant. Veterinarios",
    dataIndex: "lengthVets",
    key: "lengthVets",
    align: 'center',
  },
];

export const columnsTableHistoryVaccines = [
  {
    title: "Vacuna",
    dataIndex: "vaccineName",
    key: "vaccineName",
    align: 'center',
  },
  {
    title: "Fecha",
    dataIndex: "initialDate",
    key: "initialDate",
    align: 'center',
  },
  {
    title: "Para",
    dataIndex: "pets",
    key: "pets",
    align: 'center',
  },
  {
    title: "Dasis",
    dataIndex: "dose",
    key: "dose",
    align: 'center',
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: 'center',
  },
];

export const columnsTableVaccines = [
  {
    title: "Vacuna",
    dataIndex: "vaccineName",
    key: "vaccineName",
    align: 'center',
  },
  {
    title: "Para",
    dataIndex: "pets",
    key: "pets",
    align: 'center',
  },
  {
    title: "Fecha de aplicacion",
    dataIndex: "dateApplied",
    key: "dateApplied",
    align: 'center',
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: 'center',
  },
];

export const columnsTablePetsApointments = [
  {
    title: "Tipo de cita",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: 'center',
  },
  {
    title: "Género",
    dataIndex: "gender",
    key: "gender",
    align: "center",
  },
  {
    title: "Especie",
    dataIndex: "species",
    key: "species",
    align: "center",
  },
  {
    title: "Raza",
    dataIndex: "breed",
    key: "breed",
    align: "center",
  },
];

export const columnsTableAppointmentsByDate = [
  {
    title: "Fecha",
    dataIndex: "dateA",
    key: "dateA",
    align: 'center',
  },
  {
    title: "Hora",
    dataIndex: "hourA",
    sortDirections:["descend"],
    key: "hourA",
    align: 'center',
  },
  {
    title: "Usuario",
    dataIndex: "userName",
    key: "userName",
    align: 'center',
  },
  {
    title: "Mascotas",
    dataIndex: "petDescrption",
    key: "petDescrption",
    //align: 'center',
  },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    align: 'center',
  },
];

export const columnsTableProductsView = [
  {
    title: "Imagen",
    dataIndex: "image",
    key: "image",
    align: 'center',
  },
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    align: 'center',
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    align: 'center',
  },
  {
    title: "Estado",
    dataIndex: "available",
    key: "available",
    align: 'center',
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: 'center',
  },
];

export const columnsTablePets = [
  {
    title: "Imagen",
    dataIndex: "image",
    key: "image",
    align: "center",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Propietario",
    dataIndex: "owner",
    key: "owner",
    align: "center",
  },
  {
    title: "Fecha de nacimiento",
    dataIndex: "birthday",
    key: "birthday",
    align: "center",
  },
  {
    title: "Especie",
    dataIndex: "species",
    key: "species",
    align: "center",
  },
  {
    title: "Raza",
    dataIndex: "breed",
    key: "breed",
    align: "center",
  },
  {
    title: "Colores",
    dataIndex: "colors",
    key: "colors",
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];

const minutesOld = (date) => {
  const limit = new Date();
  limit.setMinutes(limit.getMinutes() - 5);
  if (date > limit.getTime()) {
    return "nuevo";
  } else {
    return null;
  }
};
//description

export const columnsTableTypeApointment = [
  {
    title: "Tipo de cita",
    dataIndex: "type",
    key: "type",
    align: "center",
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "",
    dataIndex: "actions",
    key: "actions",
    align: "center",
  },
]

export const columnsTableStore = [
  {
    title: "Local",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Direccion",
    dataIndex: "address",
    key: "address",
    align: "center",
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
]

export const columnsTableAppointments = [
  {
    title: "Fecha",
    dataIndex: "dateA",
    key: "dateA",
    align: "center",
  },
  {
    title: "",
    key: "tags",
    dataIndex: "tags",
    render: (date) => {
      let status = minutesOld(date);
      return (
        <>{status ? <Tag color="green">{status.toUpperCase()}</Tag> : null}</>
      );
    },
  },
  {
    title: "Hora",
    dataIndex: "hour",
    key: "hour",
    align: "center",
  },
  {
    title: "Tiempo apartado",
    dataIndex: "time",
    key: "time",
    align: "center",
  },
  {
    title: "Usuario",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
  {
    title: "Medico",
    dataIndex: "vet",
    key: "vet",
    align: "center",
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    align: "center",
  },
];

export const columnsExelListPets = [
  {
    label: "Nombre",
    key: "name",
  },
  {
    label: "Propietario",
    key: "owner",
  },
  {
    label: "Fecha de nacimiento",
    key: "birthday",
  },
  {
    label: "Especie",
    key: "species",
  },
  {
    label: "Raza",
    key: "breed",
  },
];

export const columnsExelApointments = [
  {
    label: "Código",
    key: "id",
  },
  {
    label: "Fecha",
    key: "dateA",
  },
  {
    label: "Hora",
    key: "hour",
  },
  {
    label: "Tiempo de cita",
    key: "time",
  },
  {
    label: "N° de mascotas",
    key: "pets",
  },
  {
    label: "Cliente",
    key: "name",
  },
  {
    label: "Teléfono",
    key: "phone",
  },
  {
    label: "Médico",
    key: "vet",
  },
  {
    label: "Estado",
    key: "status",
  },
];
