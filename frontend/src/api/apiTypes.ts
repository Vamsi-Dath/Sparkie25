export interface SigninData {
  clientId: string;
  credential: string;
}

export interface SessionData {
  isSignedIn: boolean;
  email: string;
  name: string;
  picture: string;
}

export interface OfferData {
  room_name: string;
}
