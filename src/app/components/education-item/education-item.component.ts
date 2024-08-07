import { Component, Input } from '@angular/core';
import { Education } from '../../interfaces/Education';
import { EDUCATIONes } from '../../interfaces/mock-education-es';

@Component({
  selector: 'app-education-item',
  standalone: true,
  imports: [],
  templateUrl: './education-item.component.html',
  styleUrl: './education-item.component.css'
})
export class EducationItemComponent {
  @Input() education: Education = EDUCATIONes[0]
  @Input() idioma: String = ""
}
