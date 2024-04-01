/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import store, {useAppSelector} from './src/redux/store';
import {ScreenNames} from './src/constants';
import UserDetails from './src/Screens/UserDetails';
import Settings from './src/Screens/Settings';
import useAuth from './src/hooks/useAuth';
import SplashScreen from './src/Screens/Splash';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarIcon: () => null,
      })}>
      <Tab.Screen name={ScreenNames.Home} component={Home} />
      <Tab.Screen name={ScreenNames.Settings} component={Settings} />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const {isLoading} = useAuth();
  const {userDetails} = useAppSelector(state => state.userDetails);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        {!userDetails ? (
          <Stack.Screen
            options={{headerShown: false}}
            name={ScreenNames.Login}
            component={Login}
          />
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name={ScreenNames.TabNav}
              component={TabNavigator}
            />
            <Stack.Screen
              name={ScreenNames.UserDetails}
              component={UserDetails}
              options={{
                headerBackTitle: 'Back',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
