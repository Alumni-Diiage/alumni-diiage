import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {

  public email: string = '';

  constructor(
    public authService: AuthService, 
    public alertService: AlertService
  ) { }

  ngOnInit() {}

  sendPasswordResetMail() {
    this.authService.sendResetPasswordEmail(this.email).then(() => {
      this.alertService.info(`E-mail envoyé, merci de consulter votre boite de réception`);
    });
  }

}
