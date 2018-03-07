import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user: {email: string, uid: string};

  @ViewChild("todoForm") form: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

    this.authService.getAuth().subscribe( auth => {
      if ( auth ) {
        // document.cookie.match(/user=(\+w);/);
        // this.user = {email: this.user.JSON.parse('email'), uid: auth.uid};
        console.log(auth.email);
        this.router.navigate(['/']);
      } else {
        this.authService.logout();
      }
    });

  }

  onSubmit() {
    this.authService.login(this.email, this.password)
      .then( res => {
        var date = new Date();
        if( this.form.value.login) {

          date.setDate(date.getDay() + 1);
          document.cookie = `user=${this.email}; expires=${date.toUTCString()}`;

        } else {

          date.setSeconds(date.getSeconds() + 10);
          document.cookie = `user=${this.email}; expires=${date.toUTCString()}`;

        }

        this.router.navigate(['/']);
      })
      .catch( err => {
        alert(err.message);
      });
  }
}
