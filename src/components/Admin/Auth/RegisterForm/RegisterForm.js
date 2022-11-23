import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik"; // este es un hooks
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "../../../../api";
import "./RegisterForm.scss";

const authController = new Auth();

export function RegisterForm(props) {
  const { openLogin } = props;
  const [error, setError] = useState("");

  const formik = useFormik({
    // es un hook
    initialValues: initialValues(), // la funcion inicial y la funcion que se ejecutara al enviar el formulario
    validationSchema: validationSchema(),
    validateOnChange: false, // para que valide solo cuando enviamos el formulario
    onSubmit: async (formValue) => {
      // formValue son los datos de usuario que ha enviado
      try {
        setError("");
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="repeat password"
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Form.Checkbox
        name="conditionsAccepted"
        label="He leido las condiciones"
        onChange={(_, data) =>
          formik.setFieldValue("conditionsAccepted", data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>

      <p className="register-form__error">{error}</p>
    </Form>
  );
}
