import { Component } from '@angular/core';
import { Stack } from '../../interfaces/Stack';
import { STACK } from '../../interfaces/mock-stack';
import { StackItemComponent } from '../stack-item/stack-item.component';
import { RouterModule } from '@angular/router';
import { IdiomaService } from '../../services/idioma.service';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [StackItemComponent, RouterModule],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent {
  stacks: Stack[] = STACK
  idioma: string = ""

  constructor(
    private idiomaService: IdiomaService
  ) {
    idiomaService.getIdioma().subscribe((resp) => {
      this.idioma = resp
    })
  }
}
