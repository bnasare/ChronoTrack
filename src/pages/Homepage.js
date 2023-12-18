import React from "react";
import { Link } from "react-router-dom";
import task from "../images/task.png";
import work from "../images/work.png";
const Homepage = () => {
  return (
    <div>
      <section className="pb-12">
        <div className="container relative px-4 mx-auto">
          <div className="flex flex-wrap items-center mb-16 -mx-4">
            <div className="w-full px-4 mb-24 lg:w-1/2 lg:mb-0">
              <div className="max-w-md mx-auto md:max-w-lg xl:mx-0">
                <div className="mt-5 mb-2 text-sm font-semibold uppercase">
                  <span>Task Tracking</span>
                  <span className="text-green-500"> Application</span>
                </div>
                <h1 className="mb-6 text-4xl font-heading md:text-5xl">
                  Keep Track of Time, Increase Productivity
                </h1>
                <p className="mb-10 text-lg leading-8">
                  To increase productivity and accomplish your objectives, manage and monitor your tasks with ease. Using our task and time tracking tool, you can stay organized, set sensible priorities, and make the most of your time.
                </p>
                <div className="items-center sm:flex">
                  <Link
                    to={"/login"}
                    className="inline-block w-full px-6 py-4 mb-4 text-base font-medium text-center text-white transition duration-200 bg-blue-500 border border-green-500 rounded-sm sm:w-auto sm:mb-0 sm:mr-4 font-heading hover:bg-green-600 hover:border-green-600"
                  >
                    Start managing your time!
                  </Link>
                  <Link
                    to={"/register"}
                    className="inline-block w-full px-6 py-4 mb-4 text-base font-medium text-center text-white transition duration-200 bg-red-500 border border-green-500 rounded-sm sm:w-auto sm:mb-0 sm:mr-4 font-heading hover:bg-green-600 hover:border-green-600"
                    href="#"
                  >
                    Register now
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <img className="block mx-auto xl:mx-0" src={task} alt="task" />
            </div>
          </div>
          <a className="inline-block text-gray-900" href="#feature">
            <svg
              width={26}
              height={30}
              viewBox="0 0 26 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1V29M13 29L25 17M13 29L1 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
        <div className="fixed top-0 bottom-0 left-0 z-50 hidden w-5/6 max-w-sm navbar-menu">
          <div className="fixed inset-0 bg-gray-900 navbar-backdrop backdrop-blur-xl backdrop-filter bg-opacity-80" />
        </div>
      </section>
      {/* How it works */}
      <section className="relative pt-16 overflow-hidden lg:pb-16 bg-gray-50">
        <img
          className="absolute top-0 right-0 hidden object-cover w-1/2 h-full lg:block"
          src={work}
          alt="work"
        />
        <div className="container px-4 mx-auto">
          <div className="w-full lg:w-1/2">
            <div className="max-w-md xl:max-w-lg">
              <h2 className="mb-6 text-3xl font-heading sm:text-4xl">
                Features of Time Tracking Application
              </h2>
              <p className="max-w-md mb-12 text-lg leading-8">
                Track and manage work with diligence according to various time periods, including weeks, months, and the whole amount of time. Users can examine and examine their task data in accordance with predetermined time intervals using this program. Calculating and tracking the overall amount of time spent on activities for each period is simple for users.
              </p>
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 p-3 mr-6 bg-white rounded">
                  <svg
                    width={20}
                    height={24}
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.468 1.47802C19.342 1.15003 18.858 1.07803 18.636 1.314C17.631 2.199 16.342 2.685 15.001 2.685C13.153 2.685 11.439 1.76498 10.418 0.224016C10.3251 0.084 10.1691 0 10.0011 0C9.83404 0 9.67705 0.084 9.58504 0.222984C8.56105 1.764 6.84702 2.68397 4.99902 2.68397C3.64302 2.68397 2.34102 2.18695 1.33302 1.28395C1.18602 1.15195 0.976024 1.11994 0.795039 1.19995C0.615039 1.27997 0.499023 1.45894 0.499023 1.65595V12.4989C0.499023 18.7429 9.37902 23.7279 9.75702 23.937C9.83202 23.979 9.91602 24 9.99904 24C10.0821 24 10.1661 23.979 10.2411 23.939C10.6191 23.73 19.4991 18.744 19.4991 12.501V1.70095C19.5051 1.626 19.495 1.55002 19.468 1.47802Z"
                      fill="#00CBA6"
                    />
                    <path
                      d="M6.25 11.4167L8.75 13.9167L13.75 8.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium font-heading">Authentication</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 p-3 mr-6 bg-white rounded">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.3345 0.75H5.66549C2.64449 0.75 0.750488 2.889 0.750488 5.916V14.084C0.750488 17.111 2.63549 19.25 5.66549 19.25H14.3335C17.3645 19.25 19.2505 17.111 19.2505 14.084V5.916C19.2505 2.889 17.3645 0.75 14.3345 0.75Z"
                      fill="#00CBA6"
                      stroke="#00CBA6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.6925 9.99995C8.6925 11.0219 7.8635 11.8519 6.8405 11.8519C5.8185 11.8519 4.9895 11.0219 4.9895 9.99995C4.9895 8.97795 5.8185 8.14795 6.8405 8.14795C7.8635 8.14795 8.6925 8.97795 8.6925 9.99995Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.69238 10H15.0104V11.852"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.1816 11.8515V9.99951"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-medium font-heading">
                  Protected Routes
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 p-3 mr-6 bg-white rounded">
                  <svg
                    width={20}
                    height={19}
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.8572 17.417C17.7322 17.417 19.2502 15.898 19.2502 14.024V11.324C18.0102 11.324 17.0102 10.324 17.0102 9.085C17.0102 7.845 18.0102 6.846 19.2502 6.846L19.2482 4.143C19.2482 2.269 17.7302 0.75 15.8562 0.75H4.14424C2.27024 0.75 0.751244 2.269 0.751244 4.143L0.750244 6.933C1.98924 6.933 2.98924 7.845 2.98924 9.085C2.98924 10.324 1.98924 11.324 0.750244 11.324V14.024C0.750244 15.898 2.26824 17.417 4.14224 17.417H15.8572Z"
                      fill="#00CBA6"
                      stroke="#00CBA6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.99981 10.8545L11.7398 11.7695C11.9028 11.8545 12.0938 11.7165 12.0628 11.5355L11.7298 9.59653L13.1388 8.22553C13.2708 8.09653 13.1978 7.87353 13.0158 7.84653L11.0698 7.56353L10.1988 5.79953C10.1178 5.63453 9.88281 5.63453 9.80081 5.79953L8.92981 7.56353L6.98481 7.84653C6.80281 7.87353 6.72981 8.09653 6.86181 8.22553L8.26981 9.59653L7.93681 11.5355C7.90581 11.7165 8.09681 11.8545 8.25981 11.7695L9.99981 10.8545Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span id="feature" className="font-medium font-heading">
                  Track Tasks by Weeks, Months, and Total
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* <img
          className="block object-cover w-full mt-16 lg:hidden"
          src="https://shuffle.dev/acros-assets/images/features/woman-man-smilling.jpg"
          alt
        /> */}
      </section>
    </div>
  );
};

export default Homepage;
