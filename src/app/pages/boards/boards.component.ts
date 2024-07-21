import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { BtnCreateComponent } from "../btn-create/btn-create.component";
import Swal from 'sweetalert2'
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-boards',
  standalone: true,
  imports: [ CommonModule, CdkDropList, CdkDrag, BtnCreateComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})
export class BoardsComponent {

  pending: any[] = [];
  inprogress: any[] = [];
  completed: any[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.cardService.getCards().subscribe((cards: any[]) => {
      this.pending = cards.filter(card => card.state === 'Pending');
      this.inprogress = cards.filter(card => card.state === 'In Progress');
      this.completed = cards.filter(card => card.state === 'Completed');
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const movedCard = event.container.data[event.currentIndex];
      if (movedCard && movedCard.id) {
        movedCard.state = this.getStateFromDropList(event.container.id);

        this.cardService.updateCard(movedCard.id, movedCard).subscribe(
          () => {
            console.log('Card updated successfully');
          },
          error => {
            console.error('Error updating card:', error);
          }
        );
      } else {
        console.error('Card ID is missing');
      }
    }
  }

  private getStateFromDropList(dropListId: string): string {
    switch (dropListId) {
      case 'todoList': return 'Pending';
      case 'inprogresslist': return 'In Progress';
      case 'completedlist': return 'Completed';
      default: return 'Pending'; 
    }
  }

  onCardAdded(newCard: any) {
    if (newCard.state === 'Pending') {
      this.pending.push(newCard);
    } else if (newCard.state === 'In Progress') {
      this.inprogress.push(newCard);
    } else if (newCard.state === 'Completed') {
      this.completed.push(newCard);
    }
    this.loadCards(); 
  }
  
  deleteItem(item: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cardService.deleteCard(item.id).subscribe(data => {
          this.loadCards();
        }, error => {
          Swal.fire(
            'Error!',
            'There was an error deleting the card.',
            'error'
          );
        });
      }
    });
  }
}
