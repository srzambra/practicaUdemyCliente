import * as Yup from "yup"; // sirve para la validacion

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    // objeto de validacion de Yup
    email: Yup.string()
      .email("El email no es valido")
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo es obligatorio"),
    repeatPassword: Yup.string()
      .required("Campo es obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales "),
    conditionsAccepted: Yup.bool().isTrue(true),
  });
}
