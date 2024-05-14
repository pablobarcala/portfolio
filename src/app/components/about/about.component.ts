import { Component } from '@angular/core';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  idioma: string = ""

  constructor(
    private idiomaService: IdiomaService
  ){
    idiomaService.getIdioma().subscribe((res) => {
      this.idioma = res
    })
  }
}
