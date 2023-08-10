export class Alert {
  type: AlertType;
  message: string;
  autofade: boolean = true;

  constructor(init?: Partial<Alert>) {
    this.type = AlertType.Info,
    this.message = '';
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Info,
  Warning,
  Error
}