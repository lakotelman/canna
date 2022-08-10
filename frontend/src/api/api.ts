import { Maybe } from "react-token-auth/lib/types";
import { Session } from "../auth/AuthProvider";
import { AllProjects, Milestone, Project, Task } from "./types";

type Methods = "POST" | "GET" | "UPDATE" | "DELETE" | "PUT";

export function useApi(requests: typeof fetch): Api {
  return new Api("http://127.0.0.1:5000/api", requests);
}

export interface TResponse<T> {
  data: T;
  response: Response;
  status: number;
}

export class Api {
  base: string;
  requests: typeof fetch;

  constructor(url: string, requests: typeof fetch) {
    this.base = url;
    this.requests = requests;
  }

  /*
   * newProjPayload takes in the raw for data and the project ID
   * and submits it to the API endpoint after packaging it in a
   * JSON structured format with milestones and nested tasks.
   */
  async newProjPayload(rawFormData: Object, projectId: number | string) {
    const projectPayload: Milestone[] = [];

    let milestoneTasks: Record<string, Task[]> = {};
    for (const [key, value] of Object.entries(rawFormData)) {
      let milestoneIndex = key.replace(/\D/g, "");

      if (!milestoneTasks[milestoneIndex]) {
        milestoneTasks[milestoneIndex] = [];
      }

      if (key.includes("tasks") && key.includes(milestoneIndex)) {
        let stringTasks = value.split(/\r?\n/);
        for (let task of stringTasks) {
          let t1 = {
            title: task,
          };
          milestoneTasks[milestoneIndex].push(t1);
        }
      }
      if (key.includes("milestone")) {
        const milestone = value;
        let milestoneObj = {
          title: milestone,
          project_id: projectId,
          tasks: milestoneTasks[milestoneIndex],
        };
        projectPayload.push(milestoneObj);
      }
    }
    const data = await this.doFetch<Milestone[]>(
      "POST",
      "/newprojectdetails",
      projectPayload
    );

    console.log(data);
  }

  async doFetch<T>(
    method: Methods,
    url: string,
    body?: object,
    headers?: Record<string, string>
  ): Promise<TResponse<T>> {
    const response = await this.requests(`${this.base}${url}`, {
      method: method,
      body: JSON.stringify(body),
      headers: new Headers({
        ...headers,
      }),
    });

    const data = await response.json();

    return {
      data: data,
      response: response,
      status: response.status,
    };
  }

  async getProjectById(id: number | string): Promise<TResponse<Project>> {
    const data = await this.doFetch<Project>("GET", `/projects/${id}`);
    return data;
  }

  async getAllProjects(): Promise<TResponse<AllProjects>> {
    const data = await this.doFetch<AllProjects>("GET", `/projects`);
    return data;
  }
}
