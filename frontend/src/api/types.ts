export interface Task {
  id?: number;
  title: string;
  milestone_id?: number;
  date_created?: string;
}

export interface Milestone {
  title: string;
  date_created?: string;
  id: number;
  project_id: number | string;
  tasks?: Task[];
}

export interface Project {
  id?: number | string;
  title?: string;
  milestones?: Milestone[];
}

export interface AllProjects {
  username: string;
  projects: Project[];
}
