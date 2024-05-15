import { Component, Input } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../../interfaces/Project';
import { PROJECTSes } from '../../interfaces/mock-projects-es';
import { PROJECTSen } from '../../interfaces/mock-projects-en';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectItemComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @Input() idioma: string = ""
  projectsEs: Project[] = PROJECTSes
  projectsEn: Project[] = PROJECTSen
}
