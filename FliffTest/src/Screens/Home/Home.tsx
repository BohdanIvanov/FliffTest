import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchUsers} from '../../redux/actions';

const MAX_PAGES = 2;

interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const {usersList, loading} = useAppSelector(state => state.users);

  const fetchUsersList = useCallback(async () => {
    dispatch(fetchUsers(page));
  }, [page, dispatch]);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);

  const handleLoadMoreUsers = () => {
    if (page > MAX_PAGES) {
      return;
    }
    setPage(page + 1);
  };

  const keyExtractor = (item: UserInfo) => item.email;

  const navigateToUserDetails = (item: UserInfo) => {
    navigation.navigate(ScreenNames.UserDetails, {
      details: item,
    });
  };

  const renderItem = ({item}: {item: UserInfo}) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToUserDetails(item)}
        style={styles.item}>
        <Image source={{uri: item.avatar}} style={styles.image} />
        <Text
          style={
            styles.itemText
          }>{`${item.first_name} ${item.last_name}`}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Users:</Text>
      </View>
      {usersList.length === 0 ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyExtractor={keyExtractor}
          data={usersList}
          renderItem={renderItem}
          onEndReached={handleLoadMoreUsers}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loading ? (
              <View style={styles.bottomLoader}>
                <ActivityIndicator size="large" color="#ccc" />
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  list: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomLoader: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleContainer: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  listContent: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
});
