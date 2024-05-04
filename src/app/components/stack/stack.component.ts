import { Component } from '@angular/core';
import { Stack } from '../../interfaces/Stack';
import { STACK } from '../../interfaces/mock-stack';
import { StackItemComponent } from '../stack-item/stack-item.component';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [StackItemComponent],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.css'
})
export class StackComponent {
  stacks: Stack[] = STACK
}
