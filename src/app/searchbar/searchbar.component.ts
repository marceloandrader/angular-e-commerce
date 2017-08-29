import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  template: `    
    <div class="searchbar input-group">
      <input type="text" class="form-control" placeholder="Search for anything...">
      <span class="input-group-btn">
        <button class="btn btn-primary" type="button">Search</button>
      </span>
    </div>
  `,
  styles: [
    '.searchbar { margin-bottom: 1rem; }'
  ]
})
export class SearchbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
