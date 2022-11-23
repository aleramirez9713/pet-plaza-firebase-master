export { sideMenuOptions } from "./SideMenu";
export { privateRoutes } from "./Route";
export {
  formatterHNL,
  formatDate,
  formatterUSD,
  formatCurrency,
} from "./Formats";
export {
  fieldsFormCategories,
  fieldsFormCollaborator,
  fieldsFormNewCollaborator,
  fieldsFormLogin,
  fieldsFormEditCategories,
  fieldsFormNewProduct,
  fieldsFormEditProduct,
  fieldsFormRecoveryPassword,
  fieldsFormNewVet,
  fieldsFormHoraries,
  fieldsFormEditVet,
  fieldsFormConfigInfo,
  fieldsFormConfigPassword,
  fieldsFormNewApointmentsUserExist,
  fieldsFormNewApointmentsUserNoExist,
  fieldsFormEditApointment,
  fieldsFormNewVaccines,
  fieldsFormNewStore,
  fieldsFormEditStore,
  fieldsFormEditTypeApointment,
  fieldsFormNewTypeApointment
} from "./FieldsForm";
export {
  columnsTableProducts,
  columnsTableStore,
  columnsTableTypeApointment,
  columnsTableSpecial,
  columnsExel,
  columnsTableOrders,
  columnsTableProductsOfTheOrders,
  columnsTableCollaborators,
  columnsTableVets,
  columnsExelListVets,
  columnsTablePets,
  columnsExelListPets,
  columnsTableCategories,
  columnsTableSpecialities,
  columnsTableAppointmentsByDate,
  columnsTableAppointments,
  columnsTablePetsApointments,
  columnsExelApointments,
  columnsTableHistoryVaccines,
  columnsTableVaccines,
  columnsTableProductsView
} from "./ColumsTable";
export {
  filtersOfOrders,
  filtersOfProductsOnCategories,
  filtersOfVets,
} from "./Filters";
export {
  labelsByOrdersDescriptionsByColumns,
  labelsOfCardsTitles,
  labelsOfBuyerDescrption,
  labelsOfShippingDescrption,
  labelsOfBusinessDescrption,
  labelsOfProfileVets,
  labelsOfInfoApointment
} from "./LabelsByDescriptions";
export { COUNTRIES } from "./Countries";

export const localCalendar = {
  lang: {
    locale: "es_ES",
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    today: "Hoy",
    now: "Ahora",
    backToToday: "Ayer",
    ok: "Ok",
    clear: "Limpiar",
    timeSelect: "Seleccionar hora",
    dateSelect: "Seleccionar fecha",
    monthSelect: "Elegir mes",
    yearSelect: "Elegir Año",
    decadeSelect: "Elegir decada",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Previous month (PageUp)",
    nextMonth: "Next month (PageDown)",
    previousYear: "Last year (Control + left)",
    nextYear: "Next year (Control + right)",
    previousDecade: "Last decade",
    nextDecade: "Next decade",
    previousCentury: "Last century",
    nextCentury: "Next century",
  },
  timePickerLocale: {
    placeholder: "Select time",
  },
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
