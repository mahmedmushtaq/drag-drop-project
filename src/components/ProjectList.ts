import { Component } from './Component';
import { DragTarget } from '../models/drag-drop';
import { ProjectStatus } from '../enums/enums';
import { Project } from '../models/Project';
import { AutoBind } from '../decorators/decorators';
import { projectState } from '../state/ProjectState';
import { ProjectItem } from './ProjectItem';

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');

    projectState.moveItem(
      prjId,
      this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListeners((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active')
          return project.status === ProjectStatus.ACTIVE;

        return project.status === ProjectStatus.FINISHED;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    let listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = '';

    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
    }
  }
}
