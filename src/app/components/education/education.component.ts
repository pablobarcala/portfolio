import { Component, Input } from '@angular/core';
import { Education } from '../../interfaces/Education';
import { EDUCATIONes } from '../../interfaces/mock-education-es';
import { EducationItemComponent } from '../education-item/education-item.component';
import { EDUCATIONen } from '../../interfaces/mock-education-en';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [EducationItemComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  @Input() idioma: string = ""
  educationsES: Education[] = EDUCATIONes
  educationsEN: Education[] = EDUCATIONen
}
