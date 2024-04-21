import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/lectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  // to play the video accordingly
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // function to handle lecture delete
  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  // fetching the course lecture data
  useEffect(() => {
    (async () => {
      await dispatch(getCourseLecture(courseDetails._id));
    })();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-14 text-white mx-[5%] px-2">
        {/* displaying the course name */}

        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {courseDetails?.title}
        </h1>

        <div className="flex justify-center gap-10 w-full lg:flex-row flex-col items-center">
          {/* left section for playing the video and displaying course details to admin */}
          <div className="space-y-2 sm:space-y-5 w-full sm:w-[34rem] p-2 rounded-lg shadow-[0_0_10px_black] px-2">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h1 className="my-2">
                <span className="text-yellow-500">Title : </span>
                {lectures && lectures[currentVideoIndex]?.title}
              </h1>
              <p className="text-justify">
                {" "}
                <span className="text-yellow-500 line-clamp-4">
                  Description :{" "}
                </span>
                {lectures && lectures[currentVideoIndex]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying all the lectures of the course */}
          <ul className="space-y-1 sm:space-y-5 w-full sm:w-[34rem] p-2 rounded-lg shadow-[0_0_10px_black] px-2">
            <li className="font-semibold text-lg sm:text-xl text-yellow-500 flex items-center justify-between mb-2">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="btn-primary px-2 py-1 rounded-md font-semibold text-sm"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((element, index) => {
                return (
                  <li className="space-y-2" key={element._id}>
                    <p
                      className="cursor-pointer mt-3"
                      onClick={() => setCurrentVideoIndex(index)}
                    >
                      <span className="text-yellow-500 font-semibold">
                        {" "}
                        Lecture {index + 1} :{" "}
                      </span>
                      {element?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(courseDetails?._id, element?._id)
                        }
                        className="btn-primary px-2 py-1 rounded-md font-semibold text-sm "
                      >
                        Delete Lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default DisplayLectures;
