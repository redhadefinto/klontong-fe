import React, { useEffect, useMemo, useState } from "react";
import "../../styles/auth.css";
import { useDispatch } from "react-redux";
import { authAction } from "../../redux/slices/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Auth() {
  const controller = React.useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const onChangeForm = (e) =>
    setForm((form) => {
      return {
        ...form,
        [e.target.name]: e.target.value,
      };
    });
  const loginHandler = (e) => {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      toast.error("Input Empty !");
      return;
    }
    setLoading(true);
    dispatch(
      authAction.getAuthThunk(
        { email: form.email, password: form.password },
        controller
      )
    )
      .then((result) => {
        if (result.payload.message === "Request failed with status code 401") {
          setLoading(false);
          toast.error("Email / Password is Invalid !");
          setForm({ ...form, password: "" });
          return;
        }
        // console.log(result);
        if (result.payload && result.payload.token) {
          setLoading(false);
          navigate("/");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    document.title = "Auth";
  }, []);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        <div className="login">
          <form className="form">
            <label htmlFor="chk" aria-hidden="true">
              Log in
            </label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
              value={form.email}
              onChange={onChangeForm}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              required=""
              value={form.password}
              onChange={onChangeForm}
            />
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <button onClick={loginHandler}>Log in</button>
            )}
          </form>
        </div>

        <div className="register">
          <form className="form">
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Username"
              required=""
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            <button>Register</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Auth;
