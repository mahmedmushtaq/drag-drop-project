export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    template: HTMLTemplateElement;
    hostElement: T;
    element: U;
  
    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      elementId?: string
    ) {
      this.template = <HTMLTemplateElement>document.getElementById(templateId);
      // get app
      this.hostElement = document.getElementById(hostElementId)! as T;
      // clone the template
      const importNode = document.importNode(this.template.content, true);
      // get first child
      this.element = <U>importNode.firstElementChild;
  
      if (elementId) {
        this.element.id = elementId;
      }
  
      this.attach(insertAtStart);
    }
  
    private attach(insertAtStart: boolean) {
      // insert copy of template in app-div
      this.hostElement.insertAdjacentElement(
        insertAtStart ? 'afterbegin' : 'beforeend',
        this.element
      );
    }
  
    abstract configure(): void;
    abstract renderContent(): void;
  }