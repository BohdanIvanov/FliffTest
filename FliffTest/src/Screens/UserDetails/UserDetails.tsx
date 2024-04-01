import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ParamList} from '../../types';
import {ScreenNames} from '../../constants';
import {useRoute, RouteProp} from '@react-navigation/native';

const UserDetails = () => {
  const {params} = useRoute<RouteProp<ParamList, ScreenNames.UserDetails>>();

  const details = params.details;

  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{uri: details?.avatar}} />
      <View style={styles.detailsInfo}>
        <Text style={styles.text}>{`Id: ${details.id}`}</Text>
        <Text style={styles.text}>{`Email: ${details.email} `}</Text>
        <Text>{`Username: ${details.first_name} ${details.last_name}`}</Text>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsInfo: {
    marginLeft: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginBottom: 4,
  },
});
