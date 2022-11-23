export const sideMenuOptions = [
  {
    name: "Configuración",
    key: "config",
    icon: "SettingOutlined",
    subMenu: [],
    limits: ["administrador", "médico", "secretaria", "ecargado_de_inventario"],
    location: "/config",
  },
  {
    name: "Personal",
    key: "personnel",
    icon: "TeamOutlined",
    subMenu: [],
    limits: ["administrador"],
    location: "/personnel",
  },
  {
    name: "Veterinarios",
    key: "vets",
    icon: "stetoscopio",
    subMenu: [],
    limits: ["administrador"],
    location: "/vets",
  },
  {
    name: "Citas",
    key: "apointments",
    icon: "CalendarOutlined",
    subMenu: [],
    location: "/apointments",
    limits: ["administrador", "secretaria"],
  },
  {
    name: "Tipos de Citas",
    key: "typeApointments",
    icon: "CalendarOutlined",
    subMenu: [],
    location: "/typeApointments",
    limits: ["administrador"],
  },
  {
    name: "Órdenes",
    key: "orders",
    icon: "OrderedListOutlined",
    subMenu: [],
    location: "/orders",
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    name: "Locales",
    key: "stores",
    icon: "ShopOutlined",
    subMenu: [],
    location: "/store",
    limits: ["administrador", "secretaria"],
  },
  {
    name: "Medicamentos",
    key: "medicines",
    icon: "MedicineBoxOutlined",
    subMenu: [
      {
        name: "Categorías",
        key: "medicines_categories",
        icon: "AppstoreOutlined",
        subMenu: [],
        location: "/medicines/categories",
        limits: ["administrador", "ecargado_de_inventario"],
      },
      {
        name: "Productos",
        key: "medicines_products",
        icon: "BarcodeOutlined",
        subMenu: [],
        location: "/medicines/products",
        limits: ["administrador", "ecargado_de_inventario"],
      },
    ],
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    name: "Alimentos",
    key: "foods",
    icon: "pet",
    subMenu: [
      {
        name: "Categorías",
        key: "foods_categories",
        icon: "AppstoreOutlined",
        subMenu: [],
        location: "/foods/categories",
        limits: ["administrador", "ecargado_de_inventario"],
      },
      {
        name: "Productos",
        key: "foods_products",
        icon: "BarcodeOutlined",
        subMenu: [],
        location: "/foods/products",
        limits: ["administrador", "ecargado_de_inventario"],
      },
    ],
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    name: "Agenda",
    key: "diary",
    icon: "BookOutlined",
    subMenu: [],
    location: "/diary",
    limits: ["médico"],
  },
  {
    name: "Mascotas",
    key: "pets",
    icon: "smell",
    subMenu: [],
    location: "/pets",
    limits: ["administrador", "médico", "secretaria"],
  },
];