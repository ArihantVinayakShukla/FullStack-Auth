import { useRecoilValue } from "recoil";
import { userStateSelector } from "../store/selectors";
import { useSignInActions } from "../store/hooks";
import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useRecoilValue(userStateSelector);
  const {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
  } = useSignInActions();
  const currentUser = user?.user || user;

  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, picture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserStart();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/update/${currentUser._id}`,
        formData,
        { withCredentials: true }
      );
      const data = res.data;
      console.log(data);
      if (data.success === false) {
        updateUserFailure("Failed to update user");
      } else {
        updateUserSuccess(data);
        setUpdateSuccess(true);
      }
    } catch (error) {
      updateUserFailure("Failed to update user");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      deleteUserStart();
      const res = await axios.delete(`http://localhost:3000/api/user/delete/${currentUser._id}`, {withCredentials: true});
      const data = res.data;
      if(data.success === false) {
        deleteUserFailure("Failed to delete user");
        return;
      } else {
        deleteUserSuccess(data);
        navigate("/sign-in");
      }
    } catch (error) {
      deleteUserFailure("Failed to delete user");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.picture || currentUser.picture}
          alt="_profilePic"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className=" text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Failed to upload image.(File size must be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">Uploading... {imagePercent}%</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-500">Image uploaded successfully.</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteAccount}
          className="text-red-500 cursor-pointer"
        >
          Delete Account
        </span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      <p className="text-green-500 mt-5">
        {updateSuccess && "User is updated successfully"}
      </p>
    </div>
  );
};

export default Profile;
