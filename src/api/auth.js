import { ENV } from "../utils";

// ESTAS SON LAS PETICIONES

export class Auth {
  baseApi = ENV.BASE_API;

  async register(data) {
    // va a recibir data que son los datos del formulario
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;

      const params = {
        // estos son los parameros igual a como lo teniamos en los simuladores
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }; // aca abajo se ejecutar la

      const response = await fetch(url, params);
      const result = await response.json();
      console.log(response.status);

      if (response.status !== 200) throw result; // si da distinto a 200 no se ha creaado por lo que arroja el resultado

      return result; // en caso contrario si se ha creado y arroja el result
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // si la respuesta es distinta a 200 entonces arroja un result

      return result; // de lo contrario
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REFRESH_ACCESS_TOKEN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: refreshToken,
        }),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result; // si es distinto a 200 dio un error
      // de lo contrario hacemos un return del result que seria el token
      return result;
    } catch (error) {
      throw error;
    }
  }

  setAccessToken(token) {
    // es para guardar el token. En ENV.JWT.ACCESS guardamos el token
    localStorage.setItem(ENV.JWT.ACCESS, token); //ENV.JWT.ACCESS ESTAMOS GUARDANDO DATOS EN EL LOCALSTORE y guardamos el token que llega
  }

  getAccessToken() {
    // es para obtener el token
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshToken(token) {
    // le pasamos el token lo guardamos en ENV.JWT.REFRECH y le pasamos el token
    localStorage.setItem(ENV.JWT.REFRESH, token);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }
  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
