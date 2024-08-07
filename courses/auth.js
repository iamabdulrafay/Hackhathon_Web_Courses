// auth.js
export const isAuthenticated = () => {
    // Implement your logic to check if the user is authenticated
    // This could be checking a token in localStorage, a context, or a Redux store
    return !!localStorage.getItem("access_token"); // Example using localStorage
  };
  