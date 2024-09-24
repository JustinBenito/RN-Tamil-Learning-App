import * as React from "react";
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUpCard from "../components/SignUpCard";
import SignUpBottomContainer from "../components/SignUpBottomContainer";
import { Border, Color, Padding } from "../GlobalStyles";
import{createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from 'firebase/auth'
import {   FontFamily, FontSize } from "../GlobalStyles";
import { auth } from "../firebase";

const SignUpIcon = () => {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const onHandleSignin1 = () => {
    console.log("here I am signing in")
    if(email!=='' && password!==''){
createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
  console.log('Signin done');
  navigation.navigate("Home")
    })
    .catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  // ..
    });

    }
  }

  return (
    <ImageBackground
      style={styles.signUpIcon}
      resizeMode="cover"
      source={require("../assets/login.png")}
    >
      <View style={styles.login}>
        <SignUpCard email={email} password={password} setEmail={setEmail} setPassword={setPassword}/>
      
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.button, styles.buttonFlexBox]}
            activeOpacity={0.2}
            onPress={() =>
              onHandleSignin1()
              
            }
          >
            <Text style={[styles.login1, styles.textTypo]}>Signup</Text>
          </TouchableOpacity>
          <View style={[styles.prompt, styles.buttonFlexBox]}>
            <Text style={styles.areYouATypo}>Have an account?</Text>
            <Pressable
              style={styles.signUpHereContainer}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={[styles.text, styles.textTypo]}>
                {``}
                <Text style={styles.signUpHere}>Login here</Text>
              </Text>
            </Pressable>
          </View>
        </View>

      </View>

      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bottomSection: {
    marginTop: 30,
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonFlexBox: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  login1: {
    fontSize: FontSize.size_lg,
    color: Color.gray50,
  },
  login: {
    alignSelf: "stretch",
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: Color.systemBackgroundsSBLPrimary,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 12,
    elevation: 12,
    shadowOpacity: 1,
    height: 552,
    paddingHorizontal: Padding.p_10xl,
    paddingVertical: Padding.p_36xl,
    alignItems: "center",
  },
  signUpHere: {
    color: Color.orange,
  },
  text: {
    fontSize: FontSize.pixells_size,
    fontWeight: "500",
  },
  signUpHereContainer: {
    marginLeft: 5,
  },
  button: {

    backgroundColor: Color.orange,
    width: 317,
    paddingHorizontal: Padding.p_11xl,
    paddingVertical: Padding.p_lg,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
  },
  signUpIcon: {
    flex: 1,
    width: "100%",
    height: 812,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  
});

export default SignUpIcon;
