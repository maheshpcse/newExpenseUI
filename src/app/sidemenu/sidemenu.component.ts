import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#msbo').on('click', () => {
      $('body').toggleClass('msb-x');
    });
  }

}
