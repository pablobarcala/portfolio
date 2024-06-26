import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { StackComponent } from '../stack/stack.component';
import { ProjectsComponent } from '../projects/projects.component';
import { EducationComponent } from '../education/education.component';
import { NavComponent } from '../nav/nav.component';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent, 
    ContactComponent, 
    StackComponent, 
    ProjectsComponent, 
    EducationComponent, 
    NavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  idioma: string = ""

  constructor(
    private idiomaService: IdiomaService
  ) {
    idiomaService.getIdioma().subscribe((resp) => {
      this.idioma = resp
    })
  } 
}
