import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Splash({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/Splashscreen.png')} style={styles.image} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Learn Tamil language for free!</Text>
        <Text style={styles.subtitle}>Learn how to pronounce words with ease!</Text>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Speech')}>
          <Text style={styles.loginText}>Lessgoo</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity> */}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f36f21',
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    width: "100%",
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  image: {
    width: width * 0.5,
    height: height * 0.25,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#f36f21',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 20,
    width: "100%",
  },
  signUpText: {
    color: '#fff',
    fontSize: 18,
  },
  loginButton: {
    borderColor: '#f36f21',
    borderWidth: 1,
    paddingVertical: 1,
    paddingHorizontal: 55,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: "100%",
  },
  loginText: {
    color: '#f36f21',
    fontSize: 18,
  },
});
