import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  show: boolean = false
  idioma: string = ""

  constructor(
    private snackbar: MatSnackBar,
    private idiomaService: IdiomaService
  ) {
    idiomaService.getIdioma().subscribe((resp) => {
      this.idioma = resp
    })
  }

  showTitle() {
    this.show = true
  }

  hideTitle() {
    this.show = false
  }

  copyMail() {
    const mail: string = "pablo.d.barcala@gmail.com"
    navigator.clipboard.writeText(mail)
    this.snackbar.open("Copiado", "Cerrar", {
      duration: 2000
    })
  }
}
