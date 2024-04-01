import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RegisterPayload, RegisterResponse, UserInfo} from '../types';
import {sleep} from '../../utils';

export const fetchUsers = createAsyncThunk<UserInfo[], number>(
  'users/fetchUsers',
  async page => {
    await sleep(2000);
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}&per_page=6`,
    );
    const users = await response.json();

    return users.data;
  },
);

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const response = await fetch('https://reqres.in/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email.toLowerCase(),
      password: payload.password,
    }),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials. Please use only defined users.');
  }

  const data: RegisterResponse = await response.json();
  return data;
};

export const getUserData = createAsyncThunk<UserInfo, {id: number}>(
  'users/getUser',
  async ({id}) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const result = await response.json();
    await AsyncStorage.setItem('userData', JSON.stringify(result.data));

    return result.data;
  },
);
