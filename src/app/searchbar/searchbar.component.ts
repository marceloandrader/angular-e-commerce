import {Component, HostListener, OnInit} from '@angular/core';
import {StateService} from "@uirouter/angular/lib";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-searchbar',
  template: `    
    <div class="searchbar input-group">
      <input type="text" name="text" class="form-control" placeholder="Search for anything..." [formControl]="searchForm.controls['text']">
      <span class="input-group-btn">
        <button class="btn btn-primary" type="button" (click)="handleClickSearch()">Search</button>
      </span>
    </div>
  `,
  styles: [
    '.searchbar { margin-bottom: 1rem; }'
  ]
})
export class SearchbarComponent implements OnInit {

  searchForm: FormGroup;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.charCode === 13 && this.searchForm.valid) {
      this.search(this.searchForm.controls['text'].value);
    }
  }

  constructor(private state: StateService, fb: FormBuilder) {
    this.searchForm = fb.group({
      'text': [null, Validators.compose([Validators.minLength(3)])]
    });
  }

  ngOnInit() {
  }

  handleClickSearch() {
    if (this.searchForm.valid) {
      this.search(this.searchForm.controls['text'].value);
    }
  }

  search (query) {
    this.state.go('search', {query, category:null});
  }
}
