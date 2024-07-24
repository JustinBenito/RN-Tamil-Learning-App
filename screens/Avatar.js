import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';

import axios from 'axios';
import { Audio } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFonts } from 'expo-font';
import * as Font from "expo-font";

// Define the viseme images
const visemeMap = {
  0: require('../assets/visemes/viseme_id_0.png'),
  1: require('../assets/visemes/viseme_id_1.png'),
  2: require('../assets/visemes/viseme_id_2.png'),
  3: require('../assets/visemes/viseme_id_3.png'),
  4: require('../assets/visemes/viseme_id_4.png'),
  5: require('../assets/visemes/viseme_id_5.png'),
  6: require('../assets/visemes/viseme_id_6.png'),
  7: require('../assets/visemes/viseme_id_7.png'),
  8: require('../assets/visemes/viseme_id_8.png'),
  9: require('../assets/visemes/viseme_id_9.png'),
  10: require('../assets/visemes/viseme_id_10.png'),
  11: require('../assets/visemes/viseme_id_11.png'),
  12: require('../assets/visemes/viseme_id_12.png'),
  13: require('../assets/visemes/viseme_id_13.png'),
  14: require('../assets/visemes/viseme_id_14.png'),
  15: require('../assets/visemes/viseme_id_15.png'),
  16: require('../assets/visemes/viseme_id_16.png'),
  17: require('../assets/visemes/viseme_id_17.png'),
  18: require('../assets/visemes/viseme_id_18.png'),
  19: require('../assets/visemes/viseme_id_19.png'),
  20: require('../assets/visemes/viseme_id_20.png'),
  21: require('../assets/visemes/viseme_id_21.png'),
};

const sentences = [
  // 'அப்பா',
  'அம்மா',
  // 'பாப்பா',
  // 'பால்',
  // 'வீடு',
  // 'புத்தகம்',
  // 'குழந்தை',
  // 'பூ',
];

const SpeechAvatar = () => {
  // Always call hooks in the same order
  const [loaded, error] = useFonts({
    'Tamil': require('../assets/fonts/Tamil.ttf'),
    'SunTommy y Tamil Normal': require('../assets/fonts/SunTommy-y-Tamil-Normal.ttf'),
  });

  const hi = async () =>
    await Font.loadAsync({
      'Tamils': require('../assets/fonts/SunTommy-y-Tamil-Normal.ttf'),
    });

    hi()  

  if(!loaded) {
    console.log('Fonts not loaded', error);
  }

  const [asrText, setAsrText] = useState('');
  const [imageIndex, setImageIndex] = useState(0);
  const [visemeArr, setVisemeMap] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('ta-IN-PallaviNeural');
  const [sentence, setSentence] = useState('');
  const [audioUri, setAudioUri] = useState(null);
  const [recording, setRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [uri, setUri] = useState(null);
  const recordingRef = useRef(null);
  const [token, setToken] = useState("3d9e7a1f078fb84ff6468ec229c9060759915696f7963108eb124ccc34273d4e");

  useEffect(() => {
    const setRandomSentence = () => {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      setSentence(sentences[randomIndex]);
    };
    setRandomSentence();
  }, []);


// function to get token, used for later

  //   const fetchData = async () => {

//     const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");


//   const raw = JSON.stringify({
//   "email": "justinbenito2213005@ssn.edu.in",
// "password":"Justin@2005"
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };


// fetch("http://viseme-server.vercel.app/login", requestOptions)
//   .then(async (response) => await response.json())
//   .then((result) => setToken(result.token))
//   .catch((error) => console.error(error));

//   }

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchData();

//     // Set up an interval to fetch data every 24 hours (86400000 milliseconds)
//     const intervalId = setInterval(fetchData, 86400000);

//     // Clean up the interval on component unmount
//     return () => clearInterval(intervalId);
// }, []); 

  const synthesizeSpeech = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ "text": sentence });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://viseme-server.vercel.app/viseme", requestOptions);
      const result = await response.json();
      setVisemeMap(result)
      

      const audioResponse = await axios.post('http://viseme-server.vercel.app/tts');
      const base64String = audioResponse.data.toString('base64');
      console.log(base64String);
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync({ uri: base64String });
        await soundObject.playAsync();
        visemeArr.forEach(e => {
          var duration = (e.privAudioOffset) / 10000;
          setTimeout(() => {
            console.log(e.privVisemeId);
            setImageIndex(e.privVisemeId);
          }, duration);
        });
      } catch (error) {
        console.log('Error playing sound:', error);
      }
    } catch (error) {
      console.error('Error fetching or playing audio:', error);
    }
  };

  const startRecording = async () => {
    try {
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
          setAsrText(response.data.status === 'success' && response.data.transcript ? response.data.transcript : 'Error transcribing audio :(');
          console.log('over');
        } catch (error) {
          console.error('Error uploading audio:', error);
        }
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const renderAsrText = () => {
    return (
      <Text style={styles.asrText}>
        {asrText.split('').map((char, index) => (
          <Text key={index} style={{ color: char !== sentence.charAt(index) ? 'red' : 'black' }}>
            {char}
          </Text>
        ))}
      </Text>
    );
  };

  if (!loaded) {
    return null;
  }




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/1.png')}
          style={styles.backgroundImage}
        />
        <Image
          source={visemeMap[imageIndex]}
          style={styles.visemeImage}
        />
      </View>

      <Text style={styles.sentence}>{sentence}</Text>
      {asrText ? renderAsrText() : null}

      <TouchableOpacity style={styles.button} onPress={synthesizeSpeech}>
        <Icon name="volume-up" size={24} color="white" />
        <Text style={styles.buttonText}>Speak</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startRecording} disabled={recording}>
          <Icon name="mic" size={24} color="white" />
          <Text style={styles.buttonText}>Start Recording</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={stopRecording} disabled={!recording}>
          <Icon name="stop" size={24} color="white" />
          <Text style={styles.buttonText}>Stop Recording</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    top: -50,
    zIndex: -1,
  },
  visemeImage: {
    width: 100,
    height: 75,
    resizeMode: 'contain',
    position: 'relative',
    top: -255,
    zIndex: 1,
  },
  sentence: {
    top: -100,
    fontSize: 32,
    color: 'black',
    marginVertical: 10,
    fontFamily: 'Tamils',
  },
  asrText: {
    top: -100,
    fontSize: 32,
    fontFamily: 'Tamils',
    color: 'green',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'orange',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD8B1',
    paddingHorizontal: 10,
    paddingVertical: 5,
    top: -70,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default SpeechAvatar;
