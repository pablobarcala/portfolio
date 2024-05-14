import { Component, Input } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../interfaces/Project';
import { PROJECTS } from '../../interfaces/mock-projects';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @Input() idioma: string = ""
  projects: Project[] = PROJECTS
}
