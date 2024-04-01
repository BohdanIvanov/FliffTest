import {createSlice} from '@reduxjs/toolkit';
import {fetchUsers} from '../actions';

interface UsersState {
  loading: boolean;
  error: boolean;
  usersList: any[];
}

const initialState: UsersState = {
  loading: false,
  error: false,
  usersList: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: state => {
      state.usersList = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.usersList = [...state.usersList, ...action.payload];
      state.loading = false;
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const {clearUsers} = usersSlice.actions;

export default usersSlice.reducer;
