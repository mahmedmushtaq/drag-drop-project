import {State} from "./state";
import {Project} from "../models/Project";
import {ProjectStatus} from "../enums/enums";

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;
  
    private constructor() {
      super();
    }
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addProjects(title: string, description: string, people: number) {
      this.projects.push(
        new Project(
          Math.random().toString(),
          title,
          description,
          people,
          ProjectStatus.ACTIVE
        )
      );
  
      this.updateListener();
    }
  
    moveItem(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((project) => project.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListener();
      }
    }
  
    private updateListener() {
      for (const listener of this.listeners) {
        listener(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();
