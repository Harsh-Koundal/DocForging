import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_BASE_URL;

  // fetch current user
  const fetchUser = async () => {
    try {

      const res = await axios.get(`${backendURL}/api/user/me`, {
        withCredentials: true
      });

      setUser(res.data.user);

    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // logout
  const logout = async () => {
    try {

      await axios.post(
        `${backendURL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      setUser(null);

      toast.success("Logged out successfully");

    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};