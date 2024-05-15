import { Component, Input } from '@angular/core';
import { Project } from '../../interfaces/Project';
import { PROJECTSes } from '../../interfaces/mock-projects-es';
import { StackItemComponent } from '../stack-item/stack-item.component';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [StackItemComponent],
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.css'
})
export class ProjectItemComponent {
  @Input() project: Project = PROJECTSes[0]
}
