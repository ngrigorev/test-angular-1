import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { debounceTime } from 'rxjs';

import { IClientSimple } from 'src/app/models';
import { APIService } from 'src/app/services';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.sass']
})
export class SearchModalComponent implements OnInit {
  filteredInput = new FormControl();
  client: IClientSimple;
  filteredClients: IClientSimple[] = [];

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.getClients('')
      .subscribe(data => {
        this.filteredClients = data.data!;
      })

    this.filteredInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.api.getClients(value)
          .subscribe(data => {
            this.filteredClients = data.data!;
          })
      })
  }

  display(value: IClientSimple): string {
    return value?.fio || '';
  }

  select(option: MatOption) {
    this.client = option.value as IClientSimple;
  }

  clear() {
    this.filteredInput.setValue('');
  }
}
