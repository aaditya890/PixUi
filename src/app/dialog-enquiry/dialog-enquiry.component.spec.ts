import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnquiryComponent } from './dialog-enquiry.component';

describe('DialogEnquiryComponent', () => {
  let component: DialogEnquiryComponent;
  let fixture: ComponentFixture<DialogEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEnquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
