import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackPageComponent } from './stack-page.component';

describe('StackPageComponent', () => {
  let component: StackPageComponent;
  let fixture: ComponentFixture<StackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
