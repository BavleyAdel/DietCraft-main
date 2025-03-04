export interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  refreshToken: string;
  //   userData: typeof UserInfoSchema;
}
