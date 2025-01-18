import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { WebService } from '../service/web.service';


@Component({
  selector: 'app-dialog-enquiry',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule, MatDialogModule, MatInputModule, CommonModule, MatChipsModule, FormsModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './dialog-enquiry.component.html',
  styleUrl: './dialog-enquiry.component.scss'
})
export class DialogEnquiryComponent {
  sendEnquiryForm: FormGroup;
  selectedChipInEnquiryForm: any;
  tmpindex: number = 0;
  availableCategories: string[] = ['Web Design', 'Graphic Design', 'Digital Marketing', 'Video Editing'];
  formSubmittedSuccessfully = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<DialogEnquiryComponent>,private webService:WebService) {
    this.sendEnquiryForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  sendEnquiry(clintData: any) {
    if (this.selectedChipInEnquiryForm === undefined) {
      this.selectedChipInEnquiryForm = "Web Design";
    }
    if (clintData) {
      const editClintData = {
        title:"Enquiry-GIT",
        name: clintData.fullName,
        phone: clintData.phoneNumber,
        category: this.selectedChipInEnquiryForm
      }
      this.webService.sendEnquiryDataToAdmin(editClintData);
      this.dialogRef.close()
      this.snackBar.open("✅ Enquiry Sent Success! Will Contact Shortly", '', {
        duration: 3000,
      });
    }

  }

  chipSelected(selectedChip: any) {
    this.selectedChipInEnquiryForm = selectedChip;
  }

  closeDialog() {
    this.dialogRef.close("");
  }

}
