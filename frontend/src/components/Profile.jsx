import React from "react";
import { useRef, useState } from "react";
import { userAuthStore } from "../store/userAuthStore";
import { CameraIcon } from "lucide-react";
import API from "../api/axios";
import toast from "react-hot-toast";

const Profile = ({ setToggleProfile }) => {
  const { user, updateUser } = userAuthStore();
  const [loading, setLoading] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setToggleProfile(false);
  };

  const [username, setUserName] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
    setImage(file);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("userName", username);
      data.append("image", image);
      const res = await API.post(`/auth/updateProfile/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const newUser = res.data.updatedUser;
      updateUser(newUser);

      console.log(newUser);

      setToggleProfile(false);
      toast.success("Profile Updated!");
    } catch (error) {
      console.log(error);
      console.log("Server Error Response:", error.response?.data);
    }
  };

  return (
    <div
      id="form"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className=" bg-slate-900 border border-slate-900  p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h1 className="text-xl font-bold text-white mb-4 text-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-xl font-bold text-white text-center">
                Profile is getting updated{" "}
              </h1>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-rose-500"></div>
            </div>
          ) : (
            "Profile"
          )}
        </h1>
        <hr></hr>
        <form onSubmit={(e) => handleSubmit(e, user._id)}>
          <div className=" grid items-center gap-4 justify-center">
            <label className="text-xs text-slate-400 uppercase font-bold mt-4">
              Change Image
            </label>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                referrerPolicy="no-referrer"
                className=" w-20 h-20 border-2 rounded-full"
                alt="No image"
              />
            ) : (
              <img
                src={
                  user?.avatar ||
                  user?.profileImage ||
                  "https://i.pravatar.cc/150?u=bale"
                }
                referrerPolicy="no-referrer"
                className=" w-20 h-20 border-2 rounded-full"
                alt="No image"
              />
            )}

            <div className="p-4 relative -top-20">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={handleIconClick}
                className="p-2 bg-transparent rounded-full hover:bg-slate-200 transition-all"
              >
                <CameraIcon className="cursor-pointer w-7 h-7   text-slate-600" />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase font-bold">
              Change your Username:
            </label>
            <input
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              name="userName"
              placeholder={user?.userName || user?.name}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-white"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClick}
              className="cursor-pointer px-4 py-2 text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            {username == "" || image == "" ? (
              <button
                type="submit"
                className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                disabled
              >
                Save Changes
              </button>
            ) : (
              <button
                type="submit"
                className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
