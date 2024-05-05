import { Component, Input } from '@angular/core';
import { Education } from '../../interfaces/Education';
import { EDUCATION } from '../../interfaces/mock-education';

@Component({
  selector: 'app-education-item',
  standalone: true,
  imports: [],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.css'
})
export class EducationItemComponent {
  @Input() education: Education = EDUCATION[0]
}
