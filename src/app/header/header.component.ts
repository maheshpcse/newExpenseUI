import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../api-services/auth-user.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public hrefUrl: any = null;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authUserService: AuthUserService
  ) { }

  ngOnInit() {
    $('#msbo').on('click', () => {
      $('body').toggleClass('msb-x');
    });
    console.log(this.router.url);
    this.hrefUrl = this.router.url;
  }

  OnNavigateUrl(url?: any) {
    console.log('Selected url isss', url);
    if (url === '/login') {
      this.authUserService.isLoggedOut();
      this.router.navigate([url]);
    } else {
      this.router.navigate([url]);
    }
  }

}
