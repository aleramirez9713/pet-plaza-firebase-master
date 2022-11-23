import React from "react";
import {
  InputNumber,
  Input,
  Password,
  Icon,
  Checkbox,
  Row,
  Form,
  Select,
  TimePicker,
  DatePicker,
} from "../../components/atoms";
import { disabledDateAfterToday, disabledDateBeforeToday } from "../../hooks";

const selectDays = [
  { text: "Lun", value: "Lunes" },
  { text: "Mar", value: "Martes" },
  { text: "Mié", value: "Miércoles" },
  { text: "Jue", value: "Jueves" },
  { text: "Vie", value: "Viernes" },
  { text: "Sáb", value: "Sábado" },
  { text: "Dom", value: "Domingo" },
];

export const fieldsFormCategories = [
  {
    name: "name",
    label: "Nombre",
    message: "Ingrese el nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "position",
    label: "Posición",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese la posición",
    component: <InputNumber min={0} />,
  },
];

export const fieldsFormNewVaccines = [
  {
    name: "vaccine",
    label: "Vacuna",
    message: "Ingrese el tipo de vacuna",
  },
  {
    name: "petType",
    label: "Tipo de mascota",
    message: "Ingrese el tipo de mascota",
    component: <Select options={[]} style={{ width: 130 }} />,
  },
  {
    name: "initialDate",
    label: "Fecha inicial",
    message: "Ingrese la fecha inicial",
    component: <DatePicker disabledDate={disabledDateBeforeToday} />,
  },
];

export const fieldsFormEditCategories = [
  {
    name: "name",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "position",
    label: "Posición",
    validateStatus: true,
    hasFeedback: true,
    component: <InputNumber min={0} />,
  },
  {
    name: "active",
    valuePropName: "checked",
    component: <Checkbox>Visible en APP</Checkbox>,
  },
];

export const fieldsFormLogin = [
  {
    name: "username",
    tooltip: {
      text: "example@example",
    },
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el usuario por favor",
    component: (
      <Input
        placeholder="Usuario"
        prefix={<Icon name="UserOutlined" className="site-form-item-icon" />}
        suffix={<Icon name="EditOutlined" className="site-form-item-icon" />}
      />
    ),
  },
  {
    name: "password",
    tooltip: {
      text: "La contraseña debe tener una mayúscula, un número y un carácter especial (#?!@$%^&*-)",
      placement: "bottom",
    },
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese la contraseña por favor",
    component: (
      <Password
        placeholder="Contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
];

export const fieldsFormRecoveryPassword = [
  {
    name: "first-password",
    tooltip: {
      text: "La contraseña debe tener una mayúscula, un número y un carácter especial (#?!@$%^&*-)",
      placement: "top",
    },
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese la contraseña",
    component: (
      <Password
        placeholder="Contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
  {
    name: "password",
    validateStatus: true,
    hasFeedback: true,
    message: "Confirme la contraseña",
    component: (
      <Password
        placeholder="Confirme contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
];

export const fieldsFormNewProduct = [
  {
    name: "name",
    label: "Nombre",
    message: "Ingrese el nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "code",
    label: "Código",
    message: "Ingrese el código del producto",
    component: <Input placeholder="Código" />,
  },
  {
    name: "description",
    tooltip: {
      text: "Descripción del producto, este campo no es obligatorio",
    },
    component: <Input.TextArea rows={3} placeholder="Descripción" />,
  },
  {
    name: "price",
    label: "Precio",
    message: "Ingrese el precio",
    validateStatus: true,
    hasFeedback: true,
    component: <InputNumber min={0} />,
  },
  {
    name: "priceDetail",
    message: "Ingrese el detalle del precio",
    component: <Input placeholder="Detalle del precio" />,
  },
  {
    name: "position",
    label: "Posición",
    message: "Ingrese el posición",
    validateStatus: true,
    hasFeedback: true,
    component: <InputNumber min={1} />,
  },
];

export const fieldsFormEditProduct = [
  {
    name: "fullName",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "code",
    label: "Código",
    component: <Input placeholder="Código" />,
  },
  {
    name: "description",
    component: <Input.TextArea rows={3} placeholder="Descripción" />,
  },
  {
    name: "price",
    label: "Precio",
    validateStatus: true,
    hasFeedback: true,
    component: <InputNumber min={0} />,
  },
  {
    name: "position",
    label: "Posición",
    validateStatus: true,
    hasFeedback: true,
    component: <InputNumber min={1} />,
  },
  {
    name: "priceDetail",
    component: <Input placeholder="Detalle del precio" />,
  },
  {
    name: "keyWords",
    tooltip: {
      text: "Las palabras se deben separar por una coma: ejemplo1, ejemplo2",
      placement: "left",
    },
    label: "Palabras Clave",
    component: <Input placeholder="Palabras Clave" />,
  },
  {
    component: (
      <Row>
        <Form.Item name="hidden-true" valuePropName="checked">
          <Checkbox>Oculto</Checkbox>
        </Form.Item>
        <Form.Item name="hidden-false" valuePropName="checked">
          <Checkbox>Visible</Checkbox>
        </Form.Item>
      </Row>
    ),
  },
];

export const fieldsFormCollaborator = [
  {
    name: "fullName",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "role",
    label: "Rol",
    component: <Input placeholder="Rol" />,
  },
];

export const fieldsFormNewCollaborator = [
  {
    name: "username",
    tooltip: {
      text: "example@example",
    },
    label: "Email",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el Email",
    component: <Input placeholder="Email" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el teléfono",
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "fullName",
    label: "Nombre",
    message: "Ingrese el Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "role",
    label: "Rol",
    message: "Ingrese el Rol",
  },
];

export const fieldsFormNewVet = [
  {
    name: "username",
    tooltip: {
      text: "example@example",
    },
    label: "Email",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el Email",
    component: <Input placeholder="Email" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el teléfono",
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "fullName",
    label: "Nombre",
    message: "Ingrese el Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "speciality",
    label: "Especialidad",
    message: "Ingrese la Especialidad",
  },
  {
    name: "faculty",
    label: "Facultad",
    message: "Ingrese la Facultad",
    component: <Input placeholder="Facultad" />,
  },
];

export const fieldsFormEditVet = [
  {
    name: "fullName",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "speciality",
    label: "Especialidad",
  },
  {
    name: "faculty",
    label: "Facultad",
    component: <Input placeholder="Facultad" />,
  },
];

export const fieldsFormHoraries = [
  {
    dinamic: true,
    name: "horaries",
    buttonLabel: "Añadir o Actualizar horario",
    fields: [
      {
        name: "clinic",
        label: "Clínica",
        message: "Ingrese la clinica",
        span: 24,
      },
      {
        name: "day",
        label: "Días",
        message: "Elija un día de la semana",
        span: 24,
        component: (
          <Select
            options={selectDays}
            style={{ width: "100%" }}
            mode="multiple"
            placeholder="Días de la semana"
          />
        ),
      },
      {
        name: "entryTime",
        label: "Entrada",
        message: "Ingrese la hora de entrada",
        span: 12,
        component: (
          <TimePicker
            format="h:mm A"
            use12Hours
            placeholder="Hora de entrada"
          />
        ),
      },
      {
        name: "departureTime",
        label: "Salida",
        message: "Ingrese la hora de salida",
        span: 12,
        component: (
          <TimePicker format="h:mm A" use12Hours placeholder="Hora de salida" />
        ),
      },
    ],
  },
];

export const fieldsFormConfigPassword = [
  {
    name: "currentPassword",
    label: "Contraseña actual",
    message: "Ingrese la contraseña actual",
    component: (
      <Password
        placeholder="Contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
  {
    name: "first-password",
    label: "Contraseña nueva",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese la contraseña nueva",
    component: (
      <Password
        placeholder="Contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
  {
    name: "password",
    label: "Confirme contraseña",
    validateStatus: true,
    hasFeedback: true,
    message: "Confirme la contraseña",
    component: (
      <Password
        placeholder="Contraseña"
        prefix={<Icon name="LockOutlined" className="site-form-item-icon" />}
      />
    ),
  },
];

export const fieldsFormConfigInfo = [
  {
    name: "email",
    tooltip: {
      text: "example@example",
    },
    label: "Email",
    validateStatus: true,
    hasFeedback: true,
    component: <Input placeholder="Email" />,
  },
  {
    name: "fullName",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
];

export const fieldsFormEditApointment = [
  {
    name: "date",
    label: "Fecha de la cita",
    message: "Seleccione una fecha para la cita",
  },
  {
    name: "hour",
    label: "Cupos disponibles",
    message: "Seleccione un cupo disponible",
  },
];

export const fieldsFormNewApointmentsUserExist = [
  {
    name: "user",
    label: "Usuario",
    message: "Seleccione un usuario",
  },
  {
    dinamic: true,
    name: "pets",
    buttonLabel: "Añadir mascota",
    fields: [
      {
        name: "petId",
        label: "Mascota",
        message: "Seleccione una mascota",
        span: 18
      },
      {
        name: "type",
        label: "Tipo de cita",
        message: "Seleccione un tipo de cita",
        span: 18
      },
    ],
  },
  {
    name: "vet",
    label: "Veterinario",
    message: "Seleccione un veterinario",
  },
  {
    name: "date",
    label: "Fecha de la cita",
    message: "Seleccione una fecha para la cita",
  },
  {
    name: "hour",
    label: "Cupos disponibles",
    message: "Seleccione un cupo disponible",
  },
];

export const fieldsFormNewApointmentsUserNoExist = [
  {
    name: "user",
    label: "Propietario",
    message: "Ingrese el nombre del propietario",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el teléfono",
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    dinamic: true,
    name: "pets",
    buttonLabel: "Añadir mascota",
    title: "Mascota",
    fields: [
      {
        name: "name",
        label: "Mascota",
        message: "ingrese el nombre de la mascota",
        component: <Input placeholder="Nombre" />,
      },
      {
        name: "species",
        label: "Especie",
        message: "ingrese la especie de la mascota",
        component: <Input placeholder="Especie" />,
      },
      {
        name: "breed",
        label: "Raza o tipo",
        message: "ingrese la raza o tipo la mascota",
        component: <Input placeholder="Raza o tipo" />,
      },
      {
        name: "gender",
        label: "Género",
        message: "ingrese el género d la mascota",
        component: (
          <Select
            options={[
              { label: "Macho", value: "male" },
              { label: "Hembra", value: "female" },
            ]}
          />
        ),
      },
      {
        name: "birthday",
        label: "Cumpleaños",
        message: "ingrese la fecha de nacimiento d la mascota",
        component: <DatePicker disabledDate={disabledDateAfterToday} />,
      },
      {
        name: "type",
        label: "Tipo",
        message: "Seleccione un tipo de cita",
      },
    ],
  },
  {
    name: "vet",
    label: "Veterinario",
    message: "Seleccione un veterinario",
  },
  {
    name: "date",
    label: "Fecha de la cita",
    message: "Seleccione una fecha para la cita",
  },
  {
    name: "hour",
    label: "Cupos disponibles",
    message: "Seleccione un cupo disponible",
  },
];

export const fieldsFormNewStore = [
  {
    name: "latitude",
    label: "Latitud",
    message: "Ingrese el latitud",
    validateStatus: true,
    hasFeedback: true,
    component: <Input disabled />,
  },
  {
    name: "longitude",
    label: "Longitud",
    message: "Ingrese el longitud",
    validateStatus: true,
    hasFeedback: true,
    component: <Input disabled />,
  },
  {
    name: "name",
    label: "Nombre",
    message: "Ingrese el nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    message: "Ingrese el teléfono",
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "address",
    message: "Ingrese la dirección",
    component: <Input.TextArea rows={3} placeholder="Dirección exacta" />,
  },
  {
    dinamic: true,
    name: "horaries",
    buttonLabel: "Añadir horario",
    fields: [
      {
        name: "day",
        label: "Días",
        message: "Ingrese los días",
        component: (
          <Select
            options={selectDays}
            style={{ width: '100%' }}
            mode="multiple"
          />
        ),
      },
      {
        name: "openingTime",
        label: "Apertura",
        message: "Ingrese hora de apertura",
        component: <TimePicker format="h:mm A" use12Hours />,
      },
      {
        name: "closeTime",
        label: "Cierre",
        message: "Ingrese hora de cierre",
        component: <TimePicker format="h:mm A" use12Hours />,
      },
    ],
  },
];

export const fieldsFormEditStore = [
  {
    name: "latitude",
    label: "Latitud",
    component: <Input disabled />,
  },
  {
    name: "longitude",
    label: "Longitud",
    component: <Input disabled />,
  },
  {
    name: "name",
    label: "Nombre",
    component: <Input placeholder="Nombre" />,
  },
  {
    name: "phone",
    label: "Teléfono",
    validateStatus: true,
    hasFeedback: true,
    component: <Input placeholder="Teléfono" maxLength={8} />,
  },
  {
    name: "address",
    component: <Input.TextArea rows={3} placeholder="Dirección exacta" />,
  },
  {
    dinamic: true,
    name: "horaries",
    buttonLabel: "Añadir horario",
    fields: [
      {
        name: "day",
        label: "Días",
        message: "Ingrese los días",
        component: (
          <Select
            options={selectDays}
            style={{ width: '100%' }}
            mode="multiple"
          />
        ),
      },
      {
        name: "openingTime",
        label: "Apertura",
        message: "Ingrese hora de apertura",
        component: <TimePicker format="h:mm A" use12Hours />,
      },
      {
        name: "closeTime",
        label: "Cierre",
        message: "Ingrese hora de cierre",
        component: <TimePicker format="h:mm A" use12Hours />,
      },
    ],
  },
];

export const fieldsFormNewTypeApointment = [
  {
    name: "type",
    label: "Tipo de cita",
    message: "Ingrese el tipo de cita",
    component: <Input placeholder="Tipo de cita" />,
  },
  {
    name: "description",
    message: "Ingrese una descripción del tipo de cita",
    component: <Input.TextArea rows={3} placeholder="Descripción" />,
  },
]

export const fieldsFormEditTypeApointment = [
  {
    name: "type",
    label: "Tipo de cita",
    component: <Input placeholder="Tipo de cita"  />,
  },
  {
    name: "description",
    component: <Input.TextArea rows={3} placeholder="Descripción" />,
  },
]
