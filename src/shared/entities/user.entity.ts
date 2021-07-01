export class UserEntity {
  id: string;
  username: string;
  email: string;
  photoUrl: string;

  constructor(id: string, username: string, email: string, photoUrl: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.photoUrl = photoUrl;
  }
}
