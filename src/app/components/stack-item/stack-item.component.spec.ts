import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackItemComponent } from './stack-item.component';

describe('StackItemComponent', () => {
  let component: StackItemComponent;
  let fixture: ComponentFixture<StackItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StackItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
