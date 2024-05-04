import { Component } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../interfaces/Project';
import { PROJECTS } from '../../interfaces/mock-projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects: Project[] = PROJECTS
}
