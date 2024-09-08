import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userRegister } from "../features/UserSlicer";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log(userData);
      navigate("/signin");
      toast.success("Successfully registered!");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const user = {
      email,
      password,
      confirmPassword,
      username,
    };
    dispatch(userRegister(user));
  };

  return (
    <div className="SignUp mt-32">
      <div className=" m-auto w-1/4 shadow-xl p-10">
        <form onSubmit={onSubmit}>
          <p className="mb-4 font-Satoshi-Medium">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border-[1px] mb-2 w-full p-2"
            type="text"
          />

          <p className="mb-4 font-Satoshi-Medium">Username</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

          <p className="mb-4 font-Satoshi-Medium">Confirm Password</p>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="outline-none border-[1px] mb-2 w-full p-2"
            type="password"
          />

          <button
            type="submit"
            className="p-3 rounded-sm text-center bg-Primary mt-5 w-full"
            disabled={loading}
          >
            <p className="font-Satoshi-Medium text-white">Sign Up</p>
          </button>

          <div className="mt-2 text-center">
            <small>
              Already have an account?
              <Link to="/signin">
                <span className="font-Satoshi-Bold"> Sign in</span>
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
