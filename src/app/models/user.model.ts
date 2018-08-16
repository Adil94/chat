export class User {
    uid?:string;
    email?:string;
    username?:string;
    password?:string;
    status?:string;
}

export interface userDetails {
    displayName: string;
    email: string;
    status: string;
  }