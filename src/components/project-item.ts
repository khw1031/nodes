import { Draggable } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { Component } from "./base.js";

// ProjectItem Class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler = (event: DragEvent) => {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  };

  dragEndHandler = (_event: DragEvent) => {
    console.log("DragEnd");
  };

  configure() {
    this.$el.addEventListener("dragstart", this.dragStartHandler);
    this.$el.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    this.$el.querySelector("h2")!.textContent = this.project.title;
    this.$el.querySelector("h3")!.textContent = this.persons + " assigned";
    this.$el.querySelector("p")!.textContent = this.project.description;
  }
}
