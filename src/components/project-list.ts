import { DragTarget } from "../models/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { projectState } from "../state/project-state";
import { Component } from "./base";
import { ProjectItem } from "./project-item";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProject: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProject = [];

    this.configure();
    this.renderContent();
  }

  dragOverHandler = (event: DragEvent) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault();
      const listEl = this.$el.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  };
  dropHandler = (event: DragEvent) => {
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      prjId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  };
  dragLeaveHandler = (_event: DragEvent) => {
    const listEl = this.$el.querySelector("ul")!;
    listEl.classList.remove("droppable");
  };

  configure() {
    this.$el.addEventListener("dragover", this.dragOverHandler);
    this.$el.addEventListener("dragleave", this.dragLeaveHandler);
    this.$el.addEventListener("drop", this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProject = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.$el.querySelector("ul")!.id = listId;
    this.$el.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProject) {
      new ProjectItem(this.$el.querySelector("ul")!.id, prjItem);
    }
  }
}
