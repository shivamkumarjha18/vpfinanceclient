import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loginUser } from "../../redux/feature/auth/authThunx"; // ek hi thunk banayega
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (user) {
      toast.success(`Welcome ${user.username} (${user.role}) 🎉`);

      if (user.role === "Telecaller") {
        navigate("/telecaller/dashboard");
      } else if (user.role === "Telemarketer") {
        navigate("/telemarketer/dashboard");
      } else if (user.role === "OE") {
        navigate("/oe/dashboard");
      }
    }
    if (error) {
      toast.error(error);
    }
  }, [user, error]);

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
