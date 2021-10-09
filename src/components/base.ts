// Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  $templateEl: HTMLTemplateElement;
  $hostEl: T;
  $el: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.$templateEl = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.$hostEl = document.getElementById(hostElementId) as T;

    const importedNode = document.importNode(this.$templateEl.content, true);
    this.$el = importedNode.firstElementChild as U;
    if (newElementId) {
      this.$el.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.$hostEl.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.$el
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
