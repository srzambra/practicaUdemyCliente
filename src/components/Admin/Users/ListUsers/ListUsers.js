import { User } from "../../../../api";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { UserItem } from "../UserItem";

const userController = new User();

export function ListUsers(props) {
  const { usersActive } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  console.log(users);

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          usersActive
        );
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [usersActive]); // para decirle que se tiene que ejecutar cada vez que useActive cambie usamos el useEfect

  if (!users) return <Loader active inline="centered" />;
  if (size(users) === 0) return "No hay ningun usuario";

  return map(users, (user) => <UserItem key={user._id} user={user} />);
}
