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

export const addressCreate = async (
  token,
  { contactId, street, city, province, country, postal_code }
) => {
  return await fetch(
    `${import.meta.env.VITE_BASE_API_URL}/contacts/${contactId}/addresses`,
    buildOptions(token, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        street,
        city,
        province,
        country,
        postal_code,
      }),
    })
  );
};

export const addressList = async (token, contactId) => {
  const url = new URL(
    `${import.meta.env.VITE_BASE_API_URL}/contacts/${contactId}/addresses`
  );

  return await fetch(url, buildOptions(token, { method: "GET" }));
};

export const addressDelete = async (token, contactId, addressId) => {
  return await fetch(
    `${
      import.meta.env.VITE_BASE_API_URL
    }/contacts/${contactId}/addresses/${addressId}`,
    buildOptions(token, { method: "DELETE" })
  );
};

export const addressDetail = async (token, contactId, addressId) => {
  return await fetch(
    `${
      import.meta.env.VITE_BASE_API_URL
    }/contacts/${contactId}/addresses/${addressId}`,
    buildOptions(token, { method: "GET" })
  );
};

export const addressUpdate = async (
  token,
  { contactId, addressId, street, city, province, country, postal_code }
) => {
  return await fetch(
    `${
      import.meta.env.VITE_BASE_API_URL
    }/contacts/${contactId}/addresses/${addressId}`,
    buildOptions(token, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        street,
        city,
        province,
        country,
        postal_code,
      }),
    })
  );
};
