import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  show: boolean = false

  showTitle() {
    this.show = true
  }

  hideTitle() {
    this.show = false
  }

  copyMail() {
    const mail: string = "pablo.d.barcala@gmail.com"
    navigator.clipboard.writeText(mail)
  }
}
