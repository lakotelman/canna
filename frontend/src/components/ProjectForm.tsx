import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function NewProjectForm() {
  const navigate = useNavigate();
  const [logged, session] = useAuth();
  const [projectTitle, setProjectTitle] = useState("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let opts = {
      title: projectTitle,
    };
    const response = await fetch("https://canna-server.herokuapp.com/api/addproject", {
      method: "post",
      body: JSON.stringify(opts),
      headers: new Headers({
        Authorization: `Bearer ${session?.access_token}`,
      }),
    });
    const data = await response.json();
    navigate(`/projects/${data}/edit`);
  };
  const getProjectTitle = (e: any) => {
    setProjectTitle(e.target.value);
  };

  return (
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="projectTitle"
          >
            Project Title
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-lightPink"
            id="projectTitle"
            type="text"
            value={projectTitle}
            onChange={getProjectTitle}
          />
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            onClick={handleSubmit}
            className="shadow bg-lightOrange hover:bg-lightPink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-full"
            type="submit"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
