import { Navigate } from "react-router-dom";
import { logout, useAuth } from "../auth/AuthProvider";

export default function UserHeader() {
  const [logged, session] = useAuth();

  return (
    <>
      <div className="font-nunito">
        <header className="flex items-center justify-center mx-auto container p-6 gap-10 ">
          <div className="">
            <img
              className="w-32"
              src="/cannalogo(1).webp"
              alt="logo of word 'canna'"
            />
            {logged ? (
              <button
                className=" bg-lightLavender p-2 rounded-full"
                onClick={logout}
              >
                Sign Out
              </button>
            ) : (
              <></>
            )}
          </div>
        </header>
        <hr />
      </div>
    </>
  );
}
