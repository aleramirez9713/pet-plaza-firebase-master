import React from "react";
import {
  Categories,
  DetailsCategory,
  Collaborators,
  DetailsProducts,
  ProductsList,
  Orders,
  Vets,
  Config,
  Pets,
  Diary,
  Apointments,
  Stores,
  DetailsStore,
  TypeApointments
} from "../../components/page";

export const privateRoutes = [
  {
    location: "/orders",
    component: <Orders />,
    exact: true,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/:type/products",
    component: <ProductsList />,
    exact: true,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/:type/products/category/:category",
    component: <ProductsList />,
    exact: true,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/:type/products/:id",
    component: <DetailsProducts />,
    exact: false,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/:type/categories/:id",
    component: <DetailsCategory />,
    exact: false,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/:type/categories/",
    component: <Categories />,
    exact: false,
    limits: ["administrador", "ecargado_de_inventario"],
  },
  {
    location: "/personnel",
    component: <Collaborators />,
    exact: false,
    limits: ["administrador"],
  },
  {
    location: "/vets",
    component: <Vets />,
    exact: false,
    limits: ["administrador"],
  },
  {
    location: "/config",
    component: <Config/>,
    exact: false,
    limits: ["administrador", "médico", "ecargado_de_inventario", "secretaria"],
  },
  {
    location: "/pets",
    component: <Pets/>,
    exact: false,
    limits: ["administrador", "médico", "secretaria"],
  },
  {
    location: "/diary",
    component: <Diary/>,
    exact: false,
    limits: ["médico"],
  },
  {
    location: "/apointments",
    component: <Apointments/>,
    exact: false,
    limits: ["administrador", "secretaria"],
  },
  {
    location: "/store/:id",
    component: <DetailsStore/>,
    exact: false,
    limits: ["administrador", "secretaria"],
  },
  {
    location: "/store",
    component: <Stores/>,
    exact: false,
    limits: ["administrador", "secretaria"],
  },
  {
    location: "/typeApointments",
    component: <TypeApointments/>,
    exact: false,
    limits: ["administrador", "secretaria"],
  },
];
