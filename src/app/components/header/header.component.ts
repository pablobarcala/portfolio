import { Component } from '@angular/core';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  idioma: string = ""
  
  constructor(
    private idiomaService: IdiomaService
  ) {
    idiomaService.getIdioma().subscribe((res) => {
      this.idioma = res
    })
  }

  changeIdioma() {
    this.idiomaService.changeIdioma()
  }
}
