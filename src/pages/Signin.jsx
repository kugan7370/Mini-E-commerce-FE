import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchUser, checkUser } from "../features/UserSlicer";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      dispatch(checkUser());
    }
  }, [userData, dispatch]);

  useEffect(() => {
    if (userData && token) {
      navigate("/");
      toast.success("Successfully logged in!");
    }
  }, [userData, token, navigate]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(fetchUser(user));
  };

  return (
    <div className="login mt-32">
      <div className="m-auto w-1/4 shadow-xl p-10">
        <form onSubmit={onSubmit}>
          <p className="mb-4 font-Satoshi-Medium">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-[1px] mb-2 w-full p-2"
            type="text"
          />

          <p className="mb-4 font-Satoshi-Medium">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border-[1px] mb-2 w-full p-2"
            type="password"
          />

          <button
            type="submit"
            className="p-3 rounded-sm text-center bg-lama mt-5 w-full"
            disabled={loading}
          >
            <p className="font-Satoshi-Medium text-white">Sign In</p>
          </button>

          <div className="mt-2 text-center">
            <small className="font-Satoshi">
              Don't you have an account?{" "}
              <Link to="/signup">
                <span className="font-Satoshi-Bold">Sign up</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
