import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../models/alert';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private subject = new Subject<Alert>();

  public onAlert(): Observable<Alert> {
    return this.subject.asObservable();
  }

  /**
   * Send a success alert
   * @param message Message to send
   * @param options Options to customize the alert
   */ 
  success(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Success, message}));
  }

  /**
   * Send a warning alert
   * @param message Message to send
   * @param options Options to customize the alert
   */ 
  warning(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Warning, message}));
  }

  /**
   * Send a error alert
   * @param message Message to send
   * @param options Options to customize the alert
   */ 
  error(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Error, message}));
  }

  /**
   * Send a info alert
   * @param message Message to send
   * @param options Options to customize the alert
   */ 
  info(message: string, options?: any) {
    this.alert(new Alert({...options, type: AlertType.Info, message}));
  }

  private alert(alert: Alert) {
    this.subject.next(alert);
  }
}
