import { useEffectOnce, useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { alertError } from "../../lib/alert";
import { userLogout } from "../../lib/api/Users";

const UserLogout = () => {
  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  async function handleLogout() {
    const response = await userLogout(token);
    const responseBody = await response.json();
    if (response.status === 200) {
      setToken("");
      await navigate({
        pathname: "/auth/login",
      });
    } else {
      alertError(responseBody.errors);
    }
  }
  useEffectOnce(() => {
    handleLogout();
  });
  return <></>;
};

export default UserLogout;
