import { Component, Input } from '@angular/core';
import { Stack } from '../../interfaces/Stack';
import { STACK } from '../../interfaces/mock-stack';

@Component({
  selector: 'app-stack-item',
  standalone: true,
  imports: [],
  templateUrl: './stack-item.component.html',
  styleUrl: './stack-item.component.css'
})
export class StackItemComponent {
  @Input() stack: Stack = STACK[0]
}
