import { useContext } from "react";
import { AuthContext } from "../contexts";

export const useAuth = () => useContext(AuthContext); // esta funcion ejecuta el usecontext del authcontext
