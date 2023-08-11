export class User {

  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  roles: string[] = []

  // Firebase auth
  user: any;
  
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}