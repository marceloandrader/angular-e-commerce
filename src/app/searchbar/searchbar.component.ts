import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  template: `    
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search for anything...">
      <span class="input-group-btn">
        <button class="btn btn-secondary" type="button">Search</button>
      </span>
    </div>
  `,
  styles: []
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
