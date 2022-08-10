import { Navigate, useNavigate } from "react-router-dom";
import { logout, useAuth } from "../auth/AuthProvider";

export default function UserHeader() {
  const [logged, session] = useAuth();
  const navigate = useNavigate();

  const logoutHandler = (e: any) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

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
              <>
                {" "}
                <button
                  className=" bg-lightLavender p-2 rounded-full"
                  onClick={logoutHandler}
                >
                  Sign Out
                </button>
              </>
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
