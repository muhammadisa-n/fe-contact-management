import { useEffectOnce, useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { alertError } from "../../lib/alert";
import { userLogout } from "../../lib/api/Users";

const UserLogout = () => {
  const isDev = import.meta.env.VITE_NODE_ENV === "development";

  const [token, setToken] = useLocalStorage("token", "");
  const navigate = useNavigate();
  async function handleLogout() {
    const tokenToUse =
      import.meta.env.VITE_NODE_ENV === "production" ? null : token;
    const response = await userLogout(tokenToUse);
    const responseBody = await response.json();
    if (response.status === 200) {
      setToken("");
      if (isDev) {
        await navigate({
          pathname: "/auth/login",
        });
      } else {
        const redirectUrl = `${
          import.meta.env.VITE_PANEL_LOGIN
        }/login?redirect=${window.location.href}`;
        window.location.href = redirectUrl;
        return null;
      }
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
