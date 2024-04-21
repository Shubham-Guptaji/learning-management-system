import React from "react";
import Layout from "../Layout/Layout";
import homePageMainImage from "../Assets/Images/homePageMainImage.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <Layout >
      <div className="pt-10 text-white flex lg:flex-row flex-col-reverse items-center justify-center gap-10 mx-4 sm:mx-16 min-h-[90vh]">
        {/* for platform details */}
        <div className="w-full lg:w-1/2 space-y-2 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl font-semibold sm:text-left text-center mb-3">
            Find out best{" "}
            <span className="text-yellow-500 font-bold">Online Courses</span>
          </h1>
          <p className="text-justify sm:text-left text-lg sm:text-xl text-gray-200 ">
            We have a large library of courses taught by highly skilled and
            qualified faculities at a very affordable cost.
          </p>

          {/* for buttons */}
          <div className="sm:space-x-6 flex justify-center items-center lg:justify-start sm:flex-row flex-col pb-7 gap-y-4 pt-8 sm:pt-0">
            <Link to={"/courses"}>
              <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
                Explore Courses
              </button>
            </Link>
            <Link to={"/contact"}>
              <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* right section for image */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <img src={homePageMainImage} alt="home page" />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
