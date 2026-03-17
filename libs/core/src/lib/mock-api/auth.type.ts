import { EUserType, IGridConfig } from "@lib-common";

export interface ILoginRequest {
  email: string;
  password: string;
  remember?: boolean
  appID?: string;
  deviceID?: string;
}

export interface ISendCodeRequest {
  email: string;
  password: string;
}


export interface ILoginWOtpRequest extends ILoginRequest {
  otp: string,
}

export class Auth {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;

  setAuth(auth: Auth) {
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}

export class User extends Auth {
  userID: number;
  userName: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
  currencyISO: string;
  email: string;
  image: string;
  phone: string;
  userTypeID: EUserType;
  occupation: string;
  companyName: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  website: string;
  language: string;
  job: string;
  timeZone: string;
  communication: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  // email settings
  emailSettings?: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };
    updatesFromSenkronthemes: {
      newsAboutSenkronthemesProductsAndFeatureUpdates: boolean;
      tipsOnGettingMoreOutOfSenkron: boolean;
      thingsYouMissedSindeYouLastLoggedIntoSenkron: boolean;
      newsAboutSenkronOnPartnerProductsAndOtherServices: boolean;
      tipsOnSenkronBusinessProducts: boolean;
    };
  };

  setUser(_user: unknown) {
    const user = _user as User;
    this.userID = user.userID;
    this.userName = user.userName || '';
    this.password = user.password || '';
    this.fullName = user.fullName || '';
    this.email = user.email || '';
    this.image = user.image || './assets/avatars/blank.png';
    this.userTypeID = user.userTypeID;
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.socialNetworks = user.socialNetworks;

    this.ikPersonalID = user.ikPersonalID;
    this.pdPersonalID = user.pdPersonalID;
    this.projectID = user.projectID;
    this.instituteID = user.instituteID;
    this.mobileDeviceTypeID = user.mobileDeviceTypeID;
    this.mobileDeviceToken = user.mobileDeviceToken;
    this.identityNo = user.identityNo;
    this.pdksid = user.pdksid;
    this.departman = user.departman;
    this.mesaiStartType = user.mesaiStartType;
    this.checkOtp = user.checkOtp;
    this.forceToChangePass = user.forceToChangePass;
    this.allowAnonymousRequests = user.allowAnonymousRequests;
    this.mesaiIslemleriSaatleriGizle = user.mesaiIslemleriSaatleriGizle;

    this.kullaniciGridSettings = user.kullaniciGridSettings;
  }

  ikPersonalID: number;
  pdPersonalID: number;
  projectID: number;
  instituteID: number;
  mobileDeviceTypeID: number;
  mobileDeviceToken: string;
  identityNo: string;
  pdksid: number;
  departman: string;
  mesaiStartType: number;
  checkOtp: boolean;
  forceToChangePass: boolean;
  allowAnonymousRequests: boolean;
  mesaiIslemleriSaatleriGizle: boolean;

  kullaniciGridSettings: IGridConfig[];
}

export class SocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export class AddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}
