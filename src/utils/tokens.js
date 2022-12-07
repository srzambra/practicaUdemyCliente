import jwtDecode from "jwt-decode";

export const hasExpiredToken = (token) => {
  // me va a decir si el token expiro o no
  const { exp } = jwtDecode(token); // del token estoy destructurando la fecha de exp
  const currentData = new Date().getTime();

  if (exp <= currentData) {
    // si exp es menor igual current entonces el token a expirar el token a caducado
    return true;
  }
  return false; // si no no a caducado
};
