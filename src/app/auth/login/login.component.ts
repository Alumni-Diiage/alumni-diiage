import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/services/alert.service';
import { AuthService } from 'src/app/shared/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: { emailAddress: string, password: string } = { emailAddress: '', password: '' };

  constructor(
    public authService: AuthService, 
    public alertService: AlertService,
    public router: Router
  ) { }

  ngOnInit() { }
  
  /**
   * Log in the user and redirects him if successful
   */
  loginEmailAndPassword() {
    this.authService.logInEmailAndPassword(this.loginForm.emailAddress, this.loginForm.password).then(user => {
      // Redirect to '/' once logged in
      this.router.navigate(['/']);
    })
    .catch((error: Error) => {
      if (error.name.includes('auth/invalid-email') || error.name.includes('auth/wrong-password')) {
        this.alertService.error('Identifiant incorrect');
      } else if (error.name.includes('auth/user-not-found')) {
        this.alertService.error(`Cette adresse mail n'est pas reconnue`);
      } else if (error.name.includes('email-not-verified')) {
        this.alertService.error(`Cette adresse mail n'est pas vérifié, merci de consulter vos mails pour l'activer.`);
      } else if (error.name.includes('auth/too-many-requests')) {
        this.alertService.error(`Trop de tentatives, merci d'attendre quelques minutes avant de réeessayer`);
      } else {
        this.alertService.error('Erreur de connexion');
      } 
    });
  }

}
