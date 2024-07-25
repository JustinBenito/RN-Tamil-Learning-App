const Stack = createNativeStackNavigator();
import * as React from "react";
import {  StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SignUpIcon from "./screens/SignUpIcon";
import CustomHeader from './components/Header';
import SpeechAvatar from "./screens/Avatar";

import LoginIcon from "./screens/LoginIcon";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import DetailScreen from "./screens/DetailScreen";
import HomeScreen from "./screens/Tabs";
import Splash from "./screens/Splash";
import Home from "./screens/HomeScreen";
import Words from "./screens/Words";
import Syllables from "./screens/Syllables";
import Speech from "./screens/Speech";


const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  const [fontsLoaded, error] = useFonts({
    Roboto_regular: require("./assets/fonts/Roboto_regular.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto_medium.ttf"),
    Roboto_bold: require("./assets/fonts/Roboto_bold.ttf"),
    Montserrat_regular: require("./assets/fonts/Montserrat_regular.ttf"),
    Montserrat_medium: require("./assets/fonts/Montserrat_medium.ttf"),
    Montserrat_semibold: require("./assets/fonts/Montserrat_semibold.ttf"),
    Montserrat_bold_italic: require("./assets/fonts/Montserrat_bold_italic.ttf"),
    "Work Sans_regular": require("./assets/fonts/Work_Sans_regular.ttf"),
    "Tamil": require("./assets/fonts/SunTommy-y-Tamil-Normal.ttf"),
  });

  if (!fontsLoaded && !error) {
    console.log( "here too");
  }

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="SignUp"
              component={SignUpIcon}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            
            <Stack.Screen
              name="Login"
              component={LoginIcon}
              options={{ headerShown: false }}
            />
           
             <Stack.Screen name="HomeScreen" component={HomeScreen} />
             <Stack.Screen name="Speech" component={Speech} options={({ navigation }) => ({
                headerShown: true,
                header: () => <CustomHeader navigation={navigation} title="Training" />
              })}/>
             <Stack.Screen name="Words" component={Words} options={({ navigation }) => ({
                headerShown: true,
                header: () => <CustomHeader navigation={navigation} title="Words" />
              })}/>
             <Stack.Screen name="SpeechAvatar" component={SpeechAvatar} 
             options={({ navigation }) => ({
              headerShown: true,
              header: () => <CustomHeader navigation={navigation} title="Training" />
            })}/>

              <Stack.Screen name="Syllables" component={Syllables} options={({ navigation }) => ({
                headerShown: true,
                header: () => <CustomHeader navigation={navigation} title="Syllables" />
              })}/>
             

            <Stack.Screen
              name="Details"
              component={DetailScreen}
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>Back</Text>
                  </TouchableOpacity>
                ),
                headerTitle: '',
                headerStyle: { backgroundColor: 'white' },
                headerTintColor: 'orange',
              })}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    color: 'orange',
  },
  backButton: {
    marginLeft: 15,
    color: 'orange',
    fontSize: 18,
  },
});


export default App;

