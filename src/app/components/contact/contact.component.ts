import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Input() idioma: string = ""
  show: boolean = false

  constructor(
    private snackbar: MatSnackBar
  ) {}

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
