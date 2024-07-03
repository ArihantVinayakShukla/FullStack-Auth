import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";

const Profile = () => {
  const { user } = useRecoilValue(userStateSelector);
  const currentUser = user?.user;

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-5">
        <img
          src={currentUser.picture}
          alt="_profilePic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
        />
        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <button className="text-red-700 cursor-pointer">Delete account</button>
        <button className="text-red-700 cursor-pointer">Sign out</button>
      </div>
    </div>
  );
};

export default Profile;
