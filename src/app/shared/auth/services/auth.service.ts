import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, reauthenticateWithCredential, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, user } from '@angular/fire/auth';
import { Firestore, doc, updateDoc, docData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { UserMapper } from '../models/user-mapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth: Auth = inject(Auth);
  user$ = user(this.firebaseAuth)
  private firestore = inject(Firestore);


  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;

  // Observable permettant d'informer le reste de l'application que le restaurant sélectionné a changé
  private activeRestaurantSource = new BehaviorSubject<string|null>(null);
  public selectedRestaurant = this.activeRestaurantSource.asObservable();

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  constructor(
    public mapper: UserMapper
  ) {
    this.userSubject = new BehaviorSubject<User|null>(null);
    this.user = this.userSubject.asObservable();
    this.user$.pipe(
      switchMap((user) => {
        return this.mapUser(user)
      }),
      tap((user) => {
        this.userSubject.next(user);
      })
    )
    .subscribe();
  }

  /**
   * Create an account with the provided email and password.
   * @param email Email to use
   * @param password Password to set
   */
  public signInEmailAndPassword(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password))
      .pipe(
        switchMap((result) => {
          sendEmailVerification(result?.user)
          return this.mapUser(result.user)
        }),
        tap((user) => {
          this.userSubject.next(user);
        })
      );
  }

  /**
   * Login with email and password.
   * The promise will reject if the email adress used for the account is not verified.
   */
  public logInEmailAndPassword(email: string, password: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      signInWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(async result => {
          if (!result?.user?.emailVerified) {
            sendEmailVerification(result?.user)
            const error = new Error("Cette adresse e-mail n'est pas vérifié");
            error.name = 'email-not-verified';
            reject(error)
          }
          this.mapUser(result.user).subscribe(sub => {
            this.userSubject.next(sub);
            resolve(sub);
          });
        })
        .catch(reason => {
          const error = new Error(reason.message);
          error.name = reason.code;
          reject(error)
        });
    })
  }

  /**
   * Update the user's email address
   * @param email New email
   * @returns {Promise<void>}
   */
  public async updateEmail(email: string): Promise<void> {
    if (this.firebaseAuth.currentUser) {
      return await updateEmail(this.firebaseAuth.currentUser, email)
    }
  }

  /**
   * Send a reset password email to the provided email.
   * @param email Email to send the mail to.
   * @returns {Promise}
   */
  public sendResetPasswordEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.firebaseAuth, email)
  }

  /**
   * Log the user out of the system.
   */
  public logout() {
    return signOut(this.firebaseAuth)
  }

  /**
   * Update the user's profile.
   * @param user user to update
   * @returns Promise.
   */
  public updateUser(user: User): Promise<void> {
    let userRef = doc(this.firestore, `users/${user.id}`)
    return updateDoc(userRef, this.mapper.toFirestore(user) as any)
  }

  /**
   * Update the user's password.
   * @param user user to update
   * @returns Observable.
   */
  public async updateCurrentUserPassword(password: string): Promise<void> {
    if (this.firebaseAuth.currentUser) {
      return await updatePassword(this.firebaseAuth.currentUser, password)
    }
  }

  /**
   * Re-authenticate the user.
   * @param credentials Credentials
   * @returns Observable.
   */
  public reauthenticate(credentials: any): Observable<User> {
    if (this.firebaseAuth.currentUser) {
      from(reauthenticateWithCredential(this.firebaseAuth.currentUser, credentials))
      .pipe(
        switchMap((userCredentials) => {
          return this.mapUser(userCredentials.user)
            .pipe(
              tap((user) => {
                this.userSubject.next(user);
              })
            )
        })
      )
    }
    return of()
  }

  /**
   * Enrich the user object with data stored in Firestore.
   * 
   * @param user User data from the auth object
   * @returns User object enriched with data from Firestore
   */
  private mapUser(user: any): Observable<User> {
    // We retrieve the user info in Firestore
    if (user) {
      let docRef = doc(this.firestore, `users/${user.uid}`)
      return docData(docRef, { idField: 'id' })
        .pipe(
          map((userDocData) => {
            if (userDocData !== undefined) {
              return this.mapper.fromFirestore(userDocData)
            } else {
              return new User({
                id: user.uid,
                email: user.email
              })
            }
          }),
          tap(user => this.userSubject.next(user))
        )
    } else {
      return new Observable<User>();
    }
  }
}
