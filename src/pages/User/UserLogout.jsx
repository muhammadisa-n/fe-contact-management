import { useEffectOnce, useLocalStorage } from "react-use";
import { userLogout } from "../../lib/Api/Users";
import { useNavigate } from "react-router";
import { alertError } from "../../lib/alert";

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
    handleLogout().then(() => console.log("User Logged Out succesfully"));
  });
  return <></>;
};

export default UserLogout;
