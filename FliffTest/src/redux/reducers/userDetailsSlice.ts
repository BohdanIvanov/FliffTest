import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserData} from '../actions';
import {UserInfo} from '../types';

interface UserDetailsState {
  userDetails: UserInfo | null;
  userToken: string | null;
}

const initialState: UserDetailsState = {
  userDetails: null,
  userToken: null,
};

const userDetailsSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.userDetails = action.payload;
    },
    setUserToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userDetails = action.payload;
    });
  },
});

export const {setAuthUser, setUserToken} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
