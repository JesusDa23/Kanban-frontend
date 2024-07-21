import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardService } from '../../services/card.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.css'
})
export class NewCardComponent {
  cardForm: FormGroup;
  @Output() cardCreated = new EventEmitter<any>(); // Emite el evento cuando se crea una tarjeta

constructor(
  private fb: FormBuilder,
  private cardService: CardService,
  public dialogRef: MatDialogRef<NewCardComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {
  this.cardForm = this.fb.group({
    title: ['', Validators.required],
    state: [data.state, Validators.required] // Asignar el estado del dato
  });
}

onSubmit() {
  if (this.cardForm.valid) {
    const data = {
      name: this.cardForm.value.title,
      state: this.cardForm.value.state
    };

    this.cardService.createCard(data).subscribe(response => {
      console.log('Card created successfully:', response);
      this.dialogRef.close(data);
    }, error => {
      console.error('Error creating card:', error);
    });
  }
}
}
