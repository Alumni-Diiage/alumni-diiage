import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: { emailAddress: string, password: string, repeatPassword: string} = { emailAddress: '', password: '', repeatPassword: '' };
  @Output() accountCreated = new EventEmitter();

  constructor(
    public authService: AuthService, 
    public alertService: AlertService,
    public router: Router
  ) { }

  ngOnInit() {}

  /**
   * Register the user and redirects him if successful
   */
  register() {
    this.authService.signInEmailAndPassword(this.registerForm.emailAddress, this.registerForm.password).subscribe(
      (user: any) => {
        // Redirect to login
        this.alertService.success("E-mail de confirmation envoyé, merci de consulter votre boite de réception");
        this.accountCreated.emit();
      },
      (error: any) => {
        if (error.code.includes('auth/invalid-email') || error.code.includes('auth/wrong-password')) {
          this.alertService.error('Identifiant incorrect');
        } else if (error.code.includes('auth/user-not-found')) {
          this.alertService.error(`Cette adresse e-mail n'est pas reconnue`);
        } else {
          this.alertService.error('Erreur de connexion');
        } 
      }
    )
  }
}
