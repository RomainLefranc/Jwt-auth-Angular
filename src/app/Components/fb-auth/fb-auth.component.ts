import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-fb-auth',
  templateUrl: './fb-auth.component.html',
  styleUrls: ['./fb-auth.component.css'],
})
export class FbAuthComponent implements OnInit {
  access_token!: string;
  orderby!: string;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.access_token = params['access_token'];
      console.log(this.access_token);
      this.authService.loginAccessToken(this.access_token);
    });
  }
}
