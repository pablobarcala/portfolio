import { Component } from '@angular/core';
import { Education } from '../../interfaces/Education';
import { EDUCATION } from '../../interfaces/mock-education';
import { EducationItemComponent } from '../education-item/education-item.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [EducationItemComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  educations: Education[] = EDUCATION
}
