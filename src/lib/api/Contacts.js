const isDev = import.meta.env.VITE_NODE_ENV === "development";

const buildHeaders = (token, extraHeaders = {}) => {
  const headers = {
    Accept: "application/json",
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

// CREATE CONTACT
export const contactCreate = async (
  token,
  { first_name, last_name, email, phone }
) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/contacts`,
    buildOptions(token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
      }),
    })
  );
};

// LIST CONTACTS
export const contactList = async (token, { name, phone, email, page }) => {
  const url = new URL(`${import.meta.env.VITE_BASE_API_URL}/contacts`);
  if (name) url.searchParams.append("name", name);
  if (phone) url.searchParams.append("phone", phone);
  if (email) url.searchParams.append("email", email);
  if (page) url.searchParams.append("page", page);

  return await fetch(url, buildOptions(token, { method: "GET" }));
};

// DELETE CONTACT
export const contactDelete = async (token, id) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/contacts/${id}`,
    buildOptions(token, { method: "DELETE" })
  );
};

// CONTACT DETAIL
export const contactDetail = async (token, id) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/contacts/${id}`,
    buildOptions(token, { method: "GET" })
  );
};

// UPDATE CONTACT
export const contactUpdate = async (
  token,
  { id, first_name, last_name, email, phone }
) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/contacts/${id}`,
    buildOptions(token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
      }),
    })
  );
};
