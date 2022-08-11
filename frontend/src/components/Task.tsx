import { useState } from "react";

interface Props {
  children?: JSX.Element;
  task: any;
}

export default function Task(props: Props) {
  const [done, setDone] = useState(false);

  function handleClick(e: any) {
    e.preventDefault();
    if (!done) {
      setDone(true);
    }
    if (done) {
      setDone(false);
    }
  }

  return (
    <>
      <div className="flex">
        <button onClick={handleClick} className="hover:text-lightGreen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <li className={"px-1" + (done ? " line-through" : "")}>
          {props.task.title}
        </li>
      </div>
    </>
  );
}
