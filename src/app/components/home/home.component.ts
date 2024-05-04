import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { StackComponent } from '../stack/stack.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent, ContactComponent, StackComponent, ProjectsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
