import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { NewCardComponent } from '../new-card/new-card.component';
@Component({
  selector: 'app-btn-create',
  standalone: true,
  imports: [NewCardComponent],
  templateUrl: './btn-create.component.html',
  styleUrl: './btn-create.component.css'
})
export class BtnCreateComponent {
  @Input() state!: string;
  @Output() cardAdded = new EventEmitter<any>(); // Emite el evento cuando se crea una tarjeta

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCardComponent, {
      width: '450px',
      height: '250px',
      data: { state: this.state }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardAdded.emit(result); // Emite el evento con la nueva tarjeta
      }
    });
  }
}
