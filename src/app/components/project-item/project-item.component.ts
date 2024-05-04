import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { PROJECTS } from '../../interfaces/mock-projects';
import { StackItemComponent } from '../stack-item/stack-item.component';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [StackItemComponent],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  @Input() project: Project = PROJECTS[0]
}
