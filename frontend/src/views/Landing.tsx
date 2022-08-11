import { useEffect } from "react";
import { LandingLayout } from "../layouts/Landing";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <div className="mt-12">
        <h1 className="text-3xl">Sometimes we all need a little structure.</h1>
        <p>This project management tool can help.</p>
      </div>
      <div className="mt-24">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-lightPink">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Break the big ideas down.
                </h2>
                <p className="mt-4 text-lg">
                  Using project Milestones and tasks, divide your project into
                  more manageable pieces to help you stay motivated and
                  inspired.
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/projectView.png"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
          <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-1">
            <div>
              <div>
                <span className="h-12 w-12 rounded-md flex items-center justify-center bg-standardGreen">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  text-pink-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Stay focused with clear organization.
                </h2>
                <p className="mt-4 text-lg">
                  Plans aren't always permenant. Adjust the order and details of
                  your tasks and milestones as needed.
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-2">
            <div className="pr-4 -ml-48 sm:pr-6 md:-ml-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/editing_example.png"
                alt="Customer profile user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return LandingLayout({ children: Landing() });
}
