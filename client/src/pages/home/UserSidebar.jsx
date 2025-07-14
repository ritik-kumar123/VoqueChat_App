import { useEffect, useState } from "react";
import { IoSearch, IoMenu } from "react-icons/io5";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  logoutUserThunk,
} from "../../store/slice/user/user.thunk";

const UserSidebar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();
  const { otherUsers, userProfile } = useSelector((state) => state.userReducer);

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
  };

  useEffect(() => {
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue, otherUsers]);

  useEffect(() => {
    dispatch(getOtherUsersThunk());
  }, []);

  return (
    <>
      {/* 🔥 Toggle Button (Hamburger) */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        {!showSidebar && (
          <button
            onClick={() => setShowSidebar(true)}
            className="btn btn-circle btn-sm bg-white text-black"
          >
            <IoMenu size={24} />
          </button>
        )}
      </div>

      {/* 🔥 Sidebar Slide Panel */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen bg-[#111] z-40
          w-full md:max-w-[20em] transition-transform duration-300 ease-in-out
          flex flex-col border-r border-white/10
          ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-1 text-[#7480FF] text-xl font-semibold">
          VoqueChat
        </h1>

        {/* Search Bar */}
        <div className="p-3">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <IoSearch />
          </label>
        </div>

        {/* User List */}
        <div className="h-full overflow-y-auto px-3 flex flex-col gap-2">
          {users?.map((userDetails) => (
            <User
              key={userDetails?._id}
              userDetails={userDetails}
              setShowSidebar={setShowSidebar} // Pass function to child
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img src={userProfile?.avatar} />
              </div>
            </div>
            <h2>{userProfile?.username}</h2>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-primary btn-sm px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
