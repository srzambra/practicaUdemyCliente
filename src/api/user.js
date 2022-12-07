import { ENV } from "../utils";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(accessToken, data) {
    // recibe el token porque esta autenticado y recibe la data, la informacion
    try {
      console.log(data);
      const formData = new FormData(); //se hace asi porque vamos a enviar imagenes tb en insomnia ocupabamos
      // formData.append("firstname", data.firstname); // quiero que me crees la propiedad firstname y me la agregues esta es una forma pero hay que hacerlo por cada uno. asi que vamos a hacer por object
      Object.keys(data).forEach((key) => {
        // el object key me saca la key de cada
        formData.append(key, data[key]); // append es para agregar le paso la key (clave) y la datakey
      });

      if (data.fileAvatar) {
        // si data.fileAvatar existe entonces el usuario va a crear un avatar
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsers(accessToken, active = undefined) {
    // si el usuario no me dice si es activo o inactivo voy a devolver todos los usuarios
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // si el resultado es distinto 200 arroje el result. El resultado va a ser distinto

      return result;
    } catch (error) {
      throw error;
    }
  }
}
