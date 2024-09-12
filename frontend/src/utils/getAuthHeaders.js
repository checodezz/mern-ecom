// utils/apiHelper.js

// Helper to get the token and configure headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, please login again.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};
