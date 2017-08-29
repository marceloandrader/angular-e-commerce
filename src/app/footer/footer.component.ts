import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
      <ul class="list-inline">
        <li class="list-inline-item"><a uiSref="about">About</a></li>
        <li class="list-inline-item"><a uiSref="privacy">Privacy</a></li>
        <li class="list-inline-item"><a uiSref="help">Help & Contact</a></li>
      </ul>
  `,
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
