import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
const CustomHeader = ({ navigation, title }) => {
  return (

      <SafeAreaView style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon name="arrow-back-ios" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.rightContainer} /> 
      </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginVertical: 20,

  },
  backButton: {
    color: 'orange',
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
    flex: 1,
    marginLeft: 12,
  },
  rightContainer: {
    width: 50, // Adjust this to match the width of the back button, if necessary
  },
});

export default CustomHeader;
