import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  template: `
    <div class="row pt-3" *ngFor="let order of orders">
      <div class="card" style="width:100%">
          <div class="card-block">
            <h4 class="card-title">Order Number {{order.id}} <span class="badge-success">{{order.status}}</span> </h4>
            <p class="card-text">Order date: {{order.date}}.</p>
            <a href="#" class="btn btn-outline-primary">View details</a>
          </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyOrdersComponent implements OnInit {

  private orders:Array<any> = [
    {id: 1, status: 'pending', date:'2017-08-29'},
    {id: 2, status: 'delivered', date:'2017-08-27'},
    {id: 3, status: 'rejected', date:'2017-08-28'},
  ]

  constructor() { }

  ngOnInit() {
  }

}
