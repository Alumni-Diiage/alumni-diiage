import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/shared/alert/models/alert';
import { AlertService } from 'src/app/shared/alert/services/alert.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  // Subscription for the alert service.
  private alertSubscription?: Subscription;

  constructor(
    public snackbar: MatSnackBar,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {
    // Setup the subscription.
    this.alertSubscription = this.alertService.onAlert().subscribe(async alert => {
      this.displayAlert(alert);
    })
  }

  async displayAlert(alert: Alert) {
    let alertClass = 'snackbar-primary';
    // Set the color of the toast
    switch (alert.type) {
      case AlertType.Success:
        alertClass = 'snackbar-success';
        break;
      case AlertType.Warning:
        alertClass = 'snackbar-warning';
        break;
      case AlertType.Error:
        alertClass = 'snackbar-danger';
        break;
      default:
        break;
    }

    await this.snackbar
      .open(alert.message, undefined, {
        panelClass: [alertClass],
        verticalPosition: 'bottom',
        duration: 3000
      })
  }

}
