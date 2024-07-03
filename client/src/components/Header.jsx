import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";

const Header = () => {
  const { user } = useRecoilValue(userStateSelector);
  console.log(user);

  // Helper function to get the correct picture URL
  const getPictureUrl = (user) => {
    if (user && user.picture) {
      return user.picture;
    } else if (user && user.user && user.user.picture) {
      return user.user.picture;
    }
    return null; // or a default image URL
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">FullStack-Auth App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {user ? (
              <img 
                src={getPictureUrl(user)} 
                alt="_profilePic" 
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;