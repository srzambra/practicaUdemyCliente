import "./Userform.scss";
import "./UserForm.form";
import { useAuth } from "../../../../hooks";
import { image } from "../../../../assets";
import React, { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone"; // es un hook que tiene esta libreria para imagenenes
import { initialValues, validationSchema } from "./UserForm.form";
import { User } from "../../../../api";

const userController = new User();

export function UserForm(props) {
  const { close, onReload, user } = props; // va a recibir estos 3, onReload va a recargar la lista de ususarios cuando se cree uno nuevo, el user son los datos de usuario que queremos modificar
  const { accessToken } = useAuth();
  const formik = useFormik({
    // aca realiza las validaciones
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await userController.createUser(accessToken, formValue);
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    // esta es la funcion que se va a ejectutar cuando nosotros le enviemos la imagen
    // esta es la funcion para subir imagenes
    const file = acceptedFiles[0]; // aca es para subir el elemento recibe un elemento
    formik.setFieldValue("avatar", URL.createObjectURL(file)); // este es para mostrar la aplicacion
    formik.setFieldValue("fileAvatar", file); // este es para enviar al servidor
  });

  const { getRootProps, getInputProps } = useDropzone({
    // el primero es la propiedades del div que le vamos a asisgnar y el otro son las propiedades del inputs
    // este es para subir el avatar
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      // si existe hacemosnun retur del nuevo avatar caso contrario un no avatar
      return formik.values.avatar;
    }
    return image.noAvatar; // este es el avatar por default
  };

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size="small" src={getAvatar()} />
      </div>

      <Form.Group widths="equal">
        <Form.Input
          name="firstname"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          name="lastname"
          placeholder="Apellidos"
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          placeholder="Correo Electronico"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Dropdown
          placeholder="Selecciona un rol"
          options={roleOptions}
          selection
          onChange={(_, data) => formik.setFieldValue("role", data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        />
      </Form.Group>
      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {user ? "Actualizar usuario" : "crear usuario"}
      </Form.Button>
    </Form>
  );
}

const roleOptions = [
  {
    key: "user",
    text: "Usuario",
    value: "user",
  },
  {
    key: "admin",
    text: "Administrador",
    value: "admin",
  },
];
