export class User {
  // @ts-ignore
  public id: number;
  // @ts-ignore
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  // @ts-ignore
  public lastLoginDateDisplay: Date;
  // @ts-ignore
  public joinDate: Date;
  // @ts-ignore
  public profileImageUrl: string;
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];


  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.active = false;
    this.notLocked = false;
    this.role = '';
    this.authorities = [];
  }
}
