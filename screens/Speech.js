import React, { useState , useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

import axios from 'axios';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SpeechConfig } from 'microsoft-cognitiveservices-speech-sdk';


const { width, height } = Dimensions.get('window');

const Speech = ({route}) => {
  const [sentence, setSentence] = useState('');
  const [micPressed, setMicPressed] = useState(true);

  useEffect(() => {
    setSentence(route.params);
  }, [route.params]);

  const visemeMap = {
    0: require('../assets/visemesgray/viseme_id_0.jpg'),
    1: require('../assets/visemesgray/viseme_id_1.jpg'),
    2: require('../assets/visemesgray/viseme_id_2.jpg'),
    3: require('../assets/visemesgray/viseme_id_3.jpg'),
    4: require('../assets/visemesgray/viseme_id_4.jpg'),
    5: require('../assets/visemesgray/viseme_id_5.jpg'),
    6: require('../assets/visemesgray/viseme_id_6.jpg'),
    7: require('../assets/visemesgray/viseme_id_7.jpg'),
    8: require('../assets/visemesgray/viseme_id_8.jpg'),
    9: require('../assets/visemesgray/viseme_id_9.jpg'),
    10: require('../assets/visemesgray/viseme_id_10.jpg'),
    11: require('../assets/visemesgray/viseme_id_11.jpg'),
    12: require('../assets/visemesgray/viseme_id_12.jpg'),
    13: require('../assets/visemesgray/viseme_id_13.jpg'),
    14: require('../assets/visemesgray/viseme_id_14.jpg'),
    15: require('../assets/visemesgray/viseme_id_15.jpg'),
    16: require('../assets/visemesgray/viseme_id_16.jpg'),
    17: require('../assets/visemesgray/viseme_id_17.jpg'),
    18: require('../assets/visemesgray/viseme_id_18.jpg'),
    19: require('../assets/visemesgray/viseme_id_19.jpg'),
    20: require('../assets/visemesgray/viseme_id_20.jpg'),
    21: require('../assets/visemesgray/viseme_id_21.jpg'),
  };
  const [asrText, setAsrText] = useState('____');

  useEffect(() => {
    let sent='_'.repeat(route.params.length);
setAsrText(sent);
  }, [sentence]);
  
  const [imageIndex, setImageIndex] = useState(0);

  


  const [visemeArr, setVisemeMap] = useState([]);

  const [recording, setRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const recordingRef = useRef(null);
  const [token, setToken] = useState("0f1326a82149ae274f18c32d2cb2ccf0e27fe8ca2cd6ac31ca65958b70e80811");

  // useEffect(() => {
  //   const setRandomSentence = () => {
  //     const randomIndex = Math.floor(Math.random() * sentences.length);
  //     setSentence(sentences[randomIndex]);
  //   };
  //   setRandomSentence();
  // }, []);


  const synthesizeSpeech = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      const response = await fetch(`http://viseme-server.vercel.app/viseme?inputText=${sentence}`, requestOptions);
      const result = await response.json();
      setVisemeMap(result)
      

      const audioResponse = await axios.post(`http://viseme-server.vercel.app/tts?inputText=${sentence}`);
      const base64String = audioResponse.data.toString('base64');
      console.log(base64String);
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri: base64String });
        await soundObject.setRateAsync(0.5, true);
        visemeArr.forEach(e => {
          var duration = (e.privAudioOffset) / 3000;
          console.log(duration);
          setTimeout(() => {
            console.log(e.privVisemeId);
            setImageIndex(e.privVisemeId);
          }, duration/2);
        });
        await soundObject.playAsync();
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
    }
  };

  const startRecording = async () => {
    try {
        setMicPressed(!micPressed);
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access microphone was denied');
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;
      setRecording(true);
      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        setAudioUri(uri);
        setRecording(false);
        console.log('Recording stopped');
        console.log('Audio URI:', uri);

        const formData = new FormData();
        formData.append('file', {
          uri: uri,
          type: 'audio/x-m4a',
          name: 'recorded_audio.m4a',
        });
        formData.append('language', 'tamil');
        formData.append('vtt', 'true');

        try {
          const response = await axios.post('https://asr.iitm.ac.in/api/asr/', formData, {
            headers: {
              Authorization: `Token ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log('ASR response:', response.data);
          setAsrText(response.data.status === 'success' && response.data.transcript ? response.data.transcript : 'Speak!');
          console.log('over');
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };



  return (
    <View style={styles.container}>
      
      <View style={styles.profileSection}>

      <View style={styles.imageContainer}>
        <Image
          source={visemeMap[imageIndex]}
          style={styles.visemeImage}
        />
      </View>
        
        <TouchableOpacity style={styles.speechBubble} onPress={synthesizeSpeech}>
          <Icon name="volume-high" size={20} color="#FF6600" />
          <Text style={styles.speechText}>{sentence}</Text>
        </TouchableOpacity>

      </View>

      <ScrollView horizontal contentContainerStyle={styles.letterContainer}>
        {asrText.split('').map((letter, index) => (
          <View key={index} style={styles.letterBox}>
            <Text  style={{ color: letter !== sentence.charAt(index) ? 'red' : 'green', fontSize: 18, fontWeight: 'bold', }}>{letter}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.recordingBubble} onPress={synthesizeSpeech}>
    {micPressed ? <Icon name="record-circle" size={20} color="#FF6600" /> : <Icon name="record" size={20} color="#FF6600" />}
          <Text style={styles.speechText}>{micPressed ? "Not yet started" : "Started"}</Text>
        </TouchableOpacity>


{micPressed ?
      <TouchableOpacity
        style={styles.micButton}
        onPress={() => {startRecording();}}
      >
        <Icon
          name={"microphone-outline"}
          size={40}
          color="white"
        />
      </TouchableOpacity> : <TouchableOpacity
        style={styles.micButton}
        onPress={() => {setMicPressed(!micPressed); stopRecording();}}
      >
        <Icon
          name={ "microphone"}
          size={40}
          color="white"
        />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 100,
    backgroundColor: '#FFC0CB',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  speechBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
    marginRight: 40,
  },
  recordingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBE4CB',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  speechText: {
    marginLeft: 5,
  },
  letterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  letterBox: {
    width: width / 8,
    height: width / 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#A3A3A34D',
    justifyContent: 'center',
    alignItems: 'center',
  },

  micButton: {
    width: 150,
    height: 150,
    borderRadius: 40,
    marginTop: 150,
    top: -100,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    shadowColor: '#FF6600',
    shadowRadius: 10,
    elevation: 30,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    position: 'relative',
    top: 100,
    zIndex: -1,
  },
  visemeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    position: 'relative',
    
    zIndex: 1,
  },
});

export default Speech;