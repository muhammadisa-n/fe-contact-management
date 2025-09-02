const isDev = import.meta.env.VITE_NODE_ENV === "development";

const buildHeaders = (token, extraHeaders = {}) => {
  const headers = {
    Accept: "application/json",
    "x-app-key": import.meta.env.VITE_SSO_APP_KEY,
    ...extraHeaders,
  };

  if (isDev && token) {
    headers.Authorization = token;
  }

  return headers;
};

const buildOptions = (token, options = {}) => {
  return {
    ...options,
    headers: buildHeaders(token, options.headers || {}),
    credentials: isDev ? "same-origin" : "include", // Dev tidak kirim cookie cross-domain
  };
};

export const userRegister = async ({ username, password, name }) => {
  return await fetch(`${import.meta.env.VITE_BASE_API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password, name }),
  });
};
export const userLogin = async ({ username, password }) => {
  return await fetch(`${import.meta.env.VITE_BASE_API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
};

export const userDetail = async (token) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/users/current`,
    buildOptions(token, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
  );
};
export const userUpdateProfile = async (token, { name }) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/users/current`,
    buildOptions(token, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name }),
    })
  );
};
export const userUpdatePassword = async (token, { password }) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/users/current`,
    buildOptions(token, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ password }),
    })
  );
};
export const userLogout = async (token) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/users/logout`,
    buildOptions(token, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
  );
};
