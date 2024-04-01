import {useCallback, useEffect, useState} from 'react';
import {useAppDispatch} from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthUser} from '../redux/reducers/userDetailsSlice';
import {sleep} from '../utils';

function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const authUser = useCallback(async () => {
    await sleep(500);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      setIsLoading(false);
      return;
    }
    dispatch(setAuthUser(JSON.parse(userData)));
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    authUser();
  }, [authUser]);

  return {isLoading};
}

export default useAuth;
