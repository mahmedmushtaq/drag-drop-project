
import {Component} from "./Component";

import { Validatable, validate } from '../utils/validation';
import { AutoBind } from '../decorators/decorators';
import { projectState } from '../state/ProjectState';


// Project Input
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElemenent: HTMLInputElement;
  
    constructor() {
      super('project-input', 'app', true, 'user-input');
  
      this.titleInputElement = <HTMLInputElement>(
        this.element.querySelector('#title')
      );
      this.descriptionInputElement = <HTMLInputElement>(
        this.element.querySelector('#description')!
      );
      this.peopleInputElemenent = <HTMLInputElement>(
        this.element.querySelector('#people')!
      );
  
      this.configure();
    }
  
    private gatherUserInput(): [string, string, number] | void {
      const title = this.titleInputElement.value;
      const description = this.descriptionInputElement.value;
      const people = this.peopleInputElemenent.value;
  
      const titleValidatable: Validatable = {
        value: title,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: description,
        required: true,
        minLength: 5,
      };
  
      const peopleValidatable: Validatable = {
        value: +people,
        required: true,
        min: 1,
        max: 5,
      };
  
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert('Invalid input please try again');
        return;
      } else {
        return [title, description, +people];
      }
    }
  
    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }
  
    renderContent() {}
  
    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProjects(title, desc, people);
        this.clearInput();
      }
    }
  
    private clearInput() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElemenent.value = '';
    }
  }

  