import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice";
import { cancelCourseBundle } from "../../Redux/razorpaySlice";

const Profile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state?.auth?.data);

  // function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
        if(window.confirm("Are you sure to delete the subscription ?")){
          await dispatch(cancelCourseBundle());
          await dispatch(getUserData());
        }
  };

  useEffect(() => {
    // getting user details
    dispatch(getUserData());
  }, []);
  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-16 flex flex-col gap-4 rounded-lg p-4 text-white min-w-[300px] shadow-[0_0_10px_black] mx-2">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url}
            alt="user profile "
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.fullName}
          </h3>

          <div className=" w-full sm:grid grid-cols-2">
            <p className="w-full sm:font-normal font-bold mb-1">Email :</p>
            <p className="w-full mb-3 text-center">{userData?.email}</p>
            <p className="w-full sm:font-normal font-bold mb-1">Role :</p>
            <p className="w-full mb-3 text-center">{userData?.role}</p>
            <p className="w-full sm:font-normal font-bold mb-1">Subscription :</p>
            <p className="w-full mb-3 text-center">
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          {/* button to change the password */}
          <div className="flex items-center justify-between gap-2 sm:flex-row flex-col ">
            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/changepassword"
              }
              className="w-full sm:w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Change Password</button>
            </Link>

            <Link
              to={
                userData?.email === "test@gmail.com"
                  ? "/denied"
                  : "/user/editprofile"
              }
              className="w-full sm:w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              <button>Edit Profile</button>
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
