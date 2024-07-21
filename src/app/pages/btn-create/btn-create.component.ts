import { Component } from '@angular/core';
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
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewCardComponent, {
      width: '500px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
