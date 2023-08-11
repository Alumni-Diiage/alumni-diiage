import { BaseMapper } from '../../base.mapper';
import { User } from '../models/user';

export class UserMapper implements BaseMapper<User> {

  fromFirestore(data: any): User {
    const result = new User();
    
    result.id = data.id;
    result.email = data.email;
    result.firstName = data.firstName;
    result.lastName = data.lastName;
    result.profilePicture = data.profilePicture;

    return result;
  }

  toFirestore(user: User): Object {
    return {
      email: user.email ?? '',
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      profilePicture: user.profilePicture ?? '',
    }
  }
}
