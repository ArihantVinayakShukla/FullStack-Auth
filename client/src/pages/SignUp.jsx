import {Link} from "react-router-dom";

const SignUp = () => {
  return (
    <div className="p-3 max-w-lg">
      <h1 className="text-3xl text-center font-semibold my-7" >Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="bg-slate-200 p-3 rounded-lg"/>
        <input type="email" placeholder="email" id="email" className="bg-slate-200 p-3 rounded-lg"/>
        <input type="password" placeholder="password" id="password" className="bg-slate-200 p-3 rounded-lg"/>
        <button className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">Submit</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
        <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp