export interface Task {
  title: String;
}

export interface Milestone {
  title: String;
  project_id: Number;
  tasks?: Task[];
}

export interface Project {
  id?: number;
  title?: string;
  milestones?: Milestone[];
}
