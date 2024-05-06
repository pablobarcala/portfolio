import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  show: boolean = false
  item: number = 0

  showTitle(n: number) {
    this.show = true
    this.item = n
  }

  hideTitle() {
    this.show = false
  }

  moveTo(section: string) {
    const element = document.getElementById(section)

    if(element) {
      element.scrollIntoView({behavior: "smooth"})
    }
  }
}
