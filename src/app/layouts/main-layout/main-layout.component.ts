import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/shared/alert/models/alert';
import { AlertService } from 'src/app/shared/alert/services/alert.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  // Responsive navbar
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @HostBinding('class') className = '';

  // Subscription for the alert service.
  private alertSubscription?: Subscription;

  public appPages = [
    { title: 'Accueil', url: '/home', icon: 'home' },
    { title: 'Evenements', url: '/events', icon: 'event' }
  ];

  constructor(
    public router: Router,
    // Mobile media query
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher,
    public snackbar: MatSnackBar,
    public alertService: AlertService,
    public route: ActivatedRoute,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => {
      changeDetectorRef.detectChanges()
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

      

  ngOnInit(): void {
    // Setup the subscription.
    this.alertSubscription = this.alertService.onAlert().subscribe(async alert => {
      this.displayAlert(alert);
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    this.alertSubscription?.unsubscribe();
  }

  logout() {
    // this.authService.logout().subscribe(() => {
    //   this.router.navigate(['auth']);
    // })
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
