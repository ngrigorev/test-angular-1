import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.sass']
})
export class InfoModalComponent {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: string) {
    this.message = data;
  }
}
