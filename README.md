# Getting Started

## Step 1: Start the Metro Server

To start Metro, run the following command from the _root_ of the React Native project:

```bash
# Using yarn
yarn start
```

## Step 2: Start the Application

Run the following commands in terminal

### For Android

```bash
# Using Yarn
yarn run android
```

### For iOS

```bash
# Using yarn, or directly in the Xcode
yarn run ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Note: Android only

Android might throw an error during start regarding some Java version. Please install JDK 17 and enter the following command, which should help to resolve this issue

```bash
export JAVA_HOME=`/usr/libexec/java_home -v 17.0.10`
```
