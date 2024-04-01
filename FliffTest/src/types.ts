import {ScreenNames} from './constants';

export interface RootStackParamList {
  [key: string | ScreenNames]: any;
}

export type ParamList = {
  [ScreenNames.Login]: undefined;
  [ScreenNames.Home]: undefined;
  [ScreenNames.Settings]: undefined;
  [ScreenNames.UserDetails]: {
    details: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    };
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
