import { ENV } from "../utils";

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
}
