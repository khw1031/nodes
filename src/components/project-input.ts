import { projectState } from "../state/project-state.js";
import { validate } from "../util/validation.js";
import { Component } from "./base.js";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  $titleInputEl: HTMLInputElement;
  $descriptionEl: HTMLTextAreaElement;
  $peopleEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.$titleInputEl = this.$el.querySelector("#title") as HTMLInputElement;
    this.$descriptionEl = this.$el.querySelector(
      "#description"
    ) as HTMLTextAreaElement;
    this.$peopleEl = this.$el.querySelector("#people") as HTMLInputElement;
    this.configure();
  }
  configure() {
    this.$el.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.$titleInputEl.value;
    const enteredDescription = this.$descriptionEl.value;
    const enteredPeople = this.$peopleEl.value;

    if (
      validate({ value: enteredTitle, required: true }) &&
      validate({ value: enteredDescription, required: true, minLength: 1 }) &&
      validate({ value: +enteredPeople, required: true, min: 1 })
    ) {
      return [enteredTitle, enteredDescription, +enteredPeople];
    } else {
      alert("Invalid input");
    }
  }

  private submitHandler = (event: Event) => {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
    }
    this.clearInputs();
  };

  private clearInputs() {
    this.$titleInputEl.value = "";
    this.$descriptionEl.value = "";
    this.$peopleEl.value = "";
  }
}
