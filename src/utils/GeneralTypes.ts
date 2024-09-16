// #region Auth

export type UserData = {
  email: string;
  password: string;
  businessName: string;
  cacNumber: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  businessType: string;
  country: string;
};

export type Errors = {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  phoneNumber?: string;
  email?: string;
  password?: string;
  cacNumber?: string;
  businessType?: string;
  country?: string;
};

export interface Option {
  key: string;
  value: string;
}
