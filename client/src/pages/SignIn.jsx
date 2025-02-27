import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";
import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";
import { useSignInActions } from "../store/hooks";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useRecoilValue(userStateSelector);
  console.log(loading, error);
  const { signInStart, signInSuccess, signInFailure } = useSignInActions();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signInStart();
      const res = await axios.post(
        "/api/auth/signin",
        formData,
        { withCredentials: true }
      );
      const data = res.data;
      if (data.success === false) {
        signInFailure("Sign in failed");
      } else {
        signInSuccess(data);
        navigate("/");
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      signInFailure(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          className="bg-slate-200 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75"
        >
          {loading ? "loading..." : "sign in"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-3 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt5">
        {error ? error.message || "Something went wrong" : ""}
      </p>
    </div>
  );
};

export default Signin;
