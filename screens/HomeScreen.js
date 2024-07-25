import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Home({ navigation }) {

  const auth = getAuth();
  const user = auth.currentUser;

  const navigations = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{ flex: 1, gap: 3, }} >
        <Text style={styles.greeting}>Hi, {user.email.split('@')[0]}</Text>
        <Text style={styles.question}>What would you like to learn?</Text>
        </View>
        <Image source={require('../assets/Splashscreen.png')} style={styles.image} />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.sectionTitle}>What do you prefer ?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.learnButton} onPress={()=>{navigations.navigate("Words")}}>
            <Text style={styles.buttonText}>Words</Text>
            <Icon name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.learnButton} onPress={()=>{navigations.navigate("Speech")}}>
            <Text style={styles.buttonText}>Syllables</Text>
            <Icon name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f36f21',
  },
  topContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 1,
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  question: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
  },
  learnButton: {
    flexDirection: 'row',
    backgroundColor: '#f36f21',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
