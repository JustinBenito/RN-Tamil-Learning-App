import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const wordsStartData = require('./wordsStart.json');
const wordsMiddleData = require('./wordsMid.json');
const wordsEndData = require('./wordsEnd.json');
const wordsData = require('./words.json');

function WordsScreen({ data }) {
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate('Speech', item);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Text style={styles.cardText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
}

export default function Words() {
  const [selectedTab, setSelectedTab] = useState('start');
  const animation = useRef(new Animated.Value(0)).current;

  const animateTabChange = (toValue) => {
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const tabIndicatorTranslateX = animation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [0, Dimensions.get('window').width / 4, (Dimensions.get('window').width / 4) * 1.7, (Dimensions.get('window').width / 4) * 2.61],
  });

  const handleTabChange = (tab) => {
    if (selectedTab !== tab) {
      let tabIndex;
      if (tab === 'start') tabIndex = 0;
      else if (tab === 'middle') tabIndex = 1;
      else if (tab === 'end') tabIndex = 2;
      else if (tab === 'dental') tabIndex = 3;

      setSelectedTab(tab);
      animateTabChange(tabIndex);
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.tabContainer}>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'start' && styles.activeTab]}
          onPress={() => handleTabChange('start')}
        >
          <Text style={styles.tabText}>Bilabial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'middle' && styles.activeTab]}
          onPress={() => handleTabChange('middle')}
        >
          <Text style={styles.tabText}>Palatal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'end' && styles.activeTab]}
          onPress={() => handleTabChange('end')}
        >
          <Text style={styles.tabText}>Velar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'dental' && styles.activeTab]}
          onPress={() => handleTabChange('dental')}
        >
          <Text style={styles.tabText}>Dental</Text>
        </TouchableOpacity>
        
        <Animated.View
          style={[
            styles.tabIndicator,
            { transform: [{ translateX: tabIndicatorTranslateX }] },
          ]}
        />
      </View>
      <View style={styles.tabContent}>
        {selectedTab === 'start' && <WordsScreen data={wordsStartData} />}
        {selectedTab === 'middle' && <WordsScreen data={wordsMiddleData} />}
        {selectedTab === 'end' && <WordsScreen data={wordsEndData} />}
        {selectedTab === 'dental' && <WordsScreen data={wordsData} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    marginVertical: -30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    marginBottom: 20,
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: 'orange',
  },
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: 'orange',
    width: Dimensions.get('window').width / 4,
  },
  tabContent: {
    flex: 1,
  },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f36f21',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
  
  },
  cardText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});
