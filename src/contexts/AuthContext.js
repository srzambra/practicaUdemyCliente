import { useState, useEffect, createContext } from "react";
import { User, Auth } from "../api";
import { hasExpiredToken } from "../utils";

const userController = new User();
const authController = new Auth();

// el authcontext lo vamos a usar par mover un estado en forma global a  la aplicacion
export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null); // si es nulo significa que el usuario no esta logeado pero si tiene valor significa que esta logeado
  const [token, setToken] = useState(null); // se guarda el token para ocuparlo en peticiones http
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // COMPROBAR SI EL USUARIO ESTA LOGEADO O NO
    // esta que esta abajo es una funcion anonima autoejecutable ya que usa async
    // y el tiene que poner await login (esperar que cargue login) para ejecutar setloading false
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();

      if (!accessToken || !refreshToken) {
        // si access token y refress es falso para la secion
        logout();
        setLoading(false); // con setloadin se para la ejecucion del proceso
        return;
      }

      if (hasExpiredToken(accessToken)) {
        // Ha caducado
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        // en caso de que no haya caducado hacemos un await
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshAccessToken(
        refreshToken
      ); // esto porque quiero acceder al acessToken
      authController.setAccessToken(accessToken);
      await login(accessToken); // LE DAMOS EL NUEVO ACCESSTOKEN
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      delete response.password;
      console.log(response);
      setUser(response);
      setToken(accessToken);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };
  const data = {
    // en data se exporta todo
    accessToken: token,
    user,
    login,
    logout,
  };
  // mientras loading sea true yo no voy a darte ninguna informacion
  if (loading) return null;

  //el provider tiene una propiedad que es value, que son los datos que queremos exportar
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
