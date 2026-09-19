import { setError, setLoading, setUser } from "../state/auth.slice.js";
import { register ,login} from "../service/api.service.js";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  async function handleRegister({ email, phoneno, password, fullname, isSeller = false }) {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await register({ email, phoneno, password, fullname, isSeller });
      dispatch(setUser(data?.user || data));
      dispatch(setLoading(false));
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Registration failed. Please try again.";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return { success: false, error: errorMessage };
    }
  }
  async function handleLogin({ email, password }) {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const data = await login({ email, password });
      dispatch(setUser(data?.user || data));
      dispatch(setLoading(false));
      return { success: true, data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Login failed. Please check your credentials.";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      return { success: false, error: errorMessage };
    }
  }

  return { handleRegister, handleLogin, user, loading, error };
};
