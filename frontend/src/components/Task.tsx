import { useState } from "react";
import MilestoneTaskInputNew from "./MilestoneTaskInputNew";

interface Props {
  children?: JSX.Element;
  task: any;
  updateTask: (e: any) => void;
}

export default function Task(props: Props){

  

    return (
      <>
        <div className="flex items-start">
          <button onClick={props.updateTask} className="hover:text-lightGreen" value={props.task.id}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-1"
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
          <li className={"px-1" + (props.task.status ? " line-through" : "")}>
            <p className="py-0 my-0">{props.task.title}</p>
          </li>
        </div>
      </>
    );
  }