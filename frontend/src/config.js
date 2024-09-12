const API_DOMAIN = import.meta.env.VITE_APP_API_URL + "api";
// console.log(import.meta.env.VITE_APP_API_URL, API_DOMAIN);

// Define user roles (if needed for your logic)
export const ROLE = {
  ADMIN: "ADMIN",
  GENERALUSER: "GENERALUSER",
};

export default API_DOMAIN;
