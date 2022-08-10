import { Maybe } from "react-token-auth/lib/types";
import { Session } from "../auth/AuthProvider";
import { Milestone, Project, Task } from "./types";

type Methods = "POST" | "GET" | "UPDATE" | "DELETE" | "PUT";

export class Api {
  base: string;
  session: Maybe<Session>;

  constructor(url: string, sess: Maybe<Session>) {
    this.base = url;
    this.session = sess;
  }

  /*
   * newProjPayload takes in the raw for data and the project ID
   * and submits it to the API endpoint after packaging it in a
   * JSON structured format with milestones and nested tasks.
   */
  async newProjPayload(rawFormData: Object, projectId: Number) {
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
  ): Promise<T> {
    const response = await fetch(`${this.base}${url}`, {
      method: method,
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `Bearer ${this.session?.access_token}`,
        ...headers,
      }),
    });
    return response.json();
  }

  async getProjectById(id: number | string): Promise<Project> {
    const data = await this.doFetch<Project>("GET", `/projects/${id}`);
    return data;
  }
}
