import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stack } from '../../interfaces/Stack';
import { STACK } from '../../interfaces/mock-stack';
import { StackItemComponent } from '../stack-item/stack-item.component';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-stack-page',
  standalone: true,
  imports: [RouterModule, StackItemComponent],
  templateUrl: './stack-page.component.html',
  styleUrl: './stack-page.component.css'
})
export class StackPageComponent {
  stack: Stack[] = STACK
  idioma: string = ""

  constructor(
    private idiomaService: IdiomaService
  ){
    idiomaService.getIdioma().subscribe((resp) => {
      this.idioma = resp
    })
  }
}
