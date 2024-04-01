import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setAuthUser, setUserToken} from '../../redux/reducers/userDetailsSlice';
import {clearUsers} from '../../redux/reducers/usersSlice';

const Settings = () => {
  const dispatch = useAppDispatch();
  const {userDetails} = useAppSelector(state => state.userDetails);

  const handleLogout = () => {
    AsyncStorage.removeItem('userData');
    dispatch(clearUsers());
    dispatch(setAuthUser(null));
    dispatch(setUserToken(null));
  };

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.avatar} source={{uri: userDetails?.avatar}} />
        <View style={styles.detailsContainer}>
          <Text>{`Id: ${userDetails?.id}`}</Text>
          <Text>{`Username: ${userDetails?.first_name} ${userDetails?.last_name}`}</Text>
        </View>
      </View>

      <Pressable
        style={({pressed}) => [styles.button, pressed && {opacity: 0.7}]}
        onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  detailsContainer: {
    marginLeft: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center',
    minWidth: 120,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
