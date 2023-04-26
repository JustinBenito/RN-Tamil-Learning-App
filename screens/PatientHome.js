import * as React from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FrameComponent from "../components/FrameComponent";
import Articles from "../components/Articles";
import { Color, Padding, FontFamily, FontSize, Border } from "../GlobalStyles";

const PatientHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.patientHome, styles.headerBg]}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentScrollViewContent}
      >
        <View style={[styles.header, styles.headerFlexBox]}>
          <Image
            style={[styles.buttonIcon, styles.profileLayout]}
            resizeMode="cover"
            source={require("../assets/button.png")}
          />
          <Text style={[styles.locohealth, styles.resheduleFlexBox]}>
            LocoHealth
          </Text>
          <TouchableOpacity
            style={[styles.profile, styles.profileLayout]}
            activeOpacity={0.2}
            onPress={() =>
              navigation.navigate("BottomTabsRoot", {
                screen: "PatientProfile",
              })
            }
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/profile.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.helloJustineWrapper, styles.contentInnerSpaceBlock]}
        >
          <Text style={[styles.helloJustine, styles.locohealthTypo]}>
            Hello! Justine
          </Text>
        </View>
        <View style={styles.symptomContainerParent}>
          <View style={styles.symptomContainer}>
            <Text style={[styles.yourSymptoms, styles.healthTips1Typo]}>
              Your symptoms
            </Text>
          </View>
          <View style={styles.symptoms}>
            <View style={styles.image4SpaceBlock}>
              <ImageBackground
                style={styles.image4Icon}
                resizeMode="cover"
                source={require("../assets/image4.png")}
              />
              <View style={styles.headacheWrapper}>
                <Text style={styles.headache}>Headache</Text>
              </View>
            </View>
            <View style={[styles.image4Group, styles.image4SpaceBlock]}>
              <ImageBackground
                style={styles.image4Icon}
                resizeMode="cover"
                source={require("../assets/image41.png")}
              />
              <Image
                style={[styles.sick03InjuryIcon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../assets/10-sick03-injury.png")}
              />
              <View style={styles.headacheWrapper}>
                <Text style={styles.headache}>Fever</Text>
              </View>
            </View>
            <View style={[styles.image4Group, styles.image4SpaceBlock]}>
              <ImageBackground
                style={styles.image4Icon}
                resizeMode="cover"
                source={require("../assets/image42.png")}
              />
              <Image
                style={[styles.sick03InjuryIcon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../assets/10-sick03-injury1.png")}
              />
              <View style={styles.headacheWrapper}>
                <Text style={styles.headache}>Cold</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.frameParent}>
          <View style={styles.upcomingAppointmentsWrapper}>
            <Text style={[styles.yourSymptoms, styles.healthTips1Typo]}>
              Upcoming Appointments
            </Text>
          </View>
          <View style={[styles.appointment, styles.bottomTabsFlexBox]}>
            <View style={[styles.frameGroup, styles.headerFlexBox]}>
              <View>
                <View>
                  <Text style={[styles.title, styles.titleTypo]}>
                    Dr. Charollette Baker
                  </Text>
                  <Text style={[styles.title1, styles.title1Typo]}>
                    Pediatrician
                  </Text>
                </View>
                <View style={styles.fluentstar20FilledParent}>
                  <Image
                    style={[styles.fluentstar20FilledIcon, styles.iconLayout]}
                    resizeMode="cover"
                    source={require("../assets/fluentstar20filled.png")}
                  />
                  <View style={styles.ratingParent}>
                    <Text style={[styles.rating, styles.title1Typo]}>
                      Rating
                    </Text>
                    <Text style={[styles.title2, styles.titleLayout]}>
                      4.78 out of 5
                    </Text>
                  </View>
                </View>
              </View>
              <ImageBackground
                style={styles.icon1}
                resizeMode="cover"
                source={require("../assets/icon6.png")}
              />
            </View>
            <FrameComponent
              mondayApril09="Monday, Dec 23"
              vector={require("../assets/vector15.png")}
              prop="12:00-13:00"
              propMarginTop={16}
            />
            <View style={styles.frameView}>
              <Pressable
                style={[styles.resheduleWrapper, styles.wrapperFlexBox]}
              >
                <Text style={[styles.reshedule, styles.title1Typo]}>
                  Reshedule
                </Text>
              </Pressable>
              <Pressable style={[styles.cancelWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.cancel, styles.title1Typo]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.contentInner, styles.contentInnerSpaceBlock]}>
          <View style={styles.healthTipsParent}>
            <View style={styles.symptomContainer}>
              <Text style={styles.healthTips1Typo}>Health Tips</Text>
            </View>
            <Articles />
            <Articles rectangle4044={require("../assets/rectangle4044.png")} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentScrollViewContent: {
    flexDirection: "column",
  },
  headerBg: {
    overflow: "hidden",
    backgroundColor: Color.systemBackgroundsSBLPrimary,
  },
  headerFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  profileLayout: {
    width: 38,
    height: 38,
  },
  resheduleFlexBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentInnerSpaceBlock: {
    padding: Padding.p_3xs,
    marginTop: 15,
    alignSelf: "stretch",
  },
  locohealthTypo: {
    textAlign: "center",
    color: Color.gray_200,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  healthTips1Typo: {
    textAlign: "left",
    color: Color.gray3,
    fontFamily: FontFamily.h5,
    fontWeight: "600",
    fontSize: FontSize.h5_size,
  },
  image4SpaceBlock: {
    paddingBottom: Padding.p_10xs,
    paddingTop: Padding.p_10xs,
    paddingLeft: Padding.p_8xs,
    backgroundColor: Color.whitesmoke,
    borderRadius: Border.br_8xs,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  iconLayout: {
    maxWidth: "100%",
    overflow: "hidden",
  },
  bottomTabsFlexBox: {
    paddingVertical: Padding.p_mini,
    alignItems: "center",
    alignSelf: "stretch",
  },
  titleTypo: {
    fontFamily: FontFamily.h5,
    fontWeight: "600",
    color: Color.black,
    textAlign: "center",
  },
  title1Typo: {
    fontFamily: FontFamily.pxRegular,
    textAlign: "center",
  },
  titleLayout: {
    lineHeight: 12,
    fontSize: FontSize.pixells_size,
  },
  wrapperFlexBox: {
    borderRadius: Border.br_xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  homeTypo: {
    marginTop: 7,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.pixells_size,
    textAlign: "left",
  },
  buttonIcon: {
    borderRadius: Border.br_7xs,
    height: 38,
  },
  locohealth: {
    fontSize: FontSize.size_lg,
    width: 97,
    justifyContent: "center",
    textAlign: "center",
    color: Color.gray_200,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  profile: {
    height: 38,
  },
  header: {
    shadowColor: "rgba(0, 0, 0, 0.04)",
    shadowRadius: 0,
    elevation: 0,
    paddingHorizontal: Padding.p_sm,
    paddingVertical: Padding.p_3xs,
    alignItems: "center",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    alignSelf: "stretch",
    overflow: "hidden",
    backgroundColor: Color.systemBackgroundsSBLPrimary,
  },
  helloJustine: {
    fontSize: FontSize.size_13xl,
  },
  helloJustineWrapper: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  yourSymptoms: {
    flex: 1,
  },
  symptomContainer: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  image4Icon: {
    width: 23,
    height: 23,
  },
  headache: {
    color: Color.black,
    lineHeight: 18,
    fontSize: FontSize.pixells_size,
    textAlign: "left",
    fontFamily: FontFamily.h5,
    fontWeight: "600",
  },
  headacheWrapper: {
    paddingHorizontal: Padding.p_11xs,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
  },
  sick03InjuryIcon: {
    height: 32,
    display: "none",
  },
  image4Group: {
    marginLeft: 20,
  },
  symptoms: {
    marginTop: 17,
    justifyContent: "center",
    height: 38,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  symptomContainerParent: {
    height: 86,
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: 0,
    marginTop: 15,
    alignSelf: "stretch",
  },
  upcomingAppointmentsWrapper: {
    paddingHorizontal: Padding.p_mini,
    paddingVertical: 0,
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  title: {
    color: Color.black,
    fontSize: FontSize.h5_size,
  },
  title1: {
    marginTop: 4,
    lineHeight: 12,
    fontSize: FontSize.pixells_size,
    color: Color.black,
  },
  fluentstar20FilledIcon: {
    borderRadius: Border.br_3xs,
    maxHeight: "100%",
  },
  rating: {
    color: Color.gray2,
    lineHeight: 12,
    fontSize: FontSize.pixells_size,
  },
  title2: {
    color: Color.black,
    fontFamily: FontFamily.h5,
    fontWeight: "600",
    textAlign: "center",
  },
  ratingParent: {
    marginLeft: 4,
  },
  fluentstar20FilledParent: {
    marginTop: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  icon1: {
    width: 80,
    height: 80,
    borderRadius: Border.br_base,
    justifyContent: "center",
    alignItems: "center",
  },
  frameGroup: {
    alignSelf: "stretch",
  },
  reshedule: {
    color: Color.orange,
    lineHeight: 18,
    fontSize: FontSize.h5_size,
  },
  resheduleWrapper: {
    borderStyle: "solid",
    borderColor: "#ff9134",
    borderWidth: 1,
    marginLeft: 16,
  },
  cancel: {
    color: Color.orange,
    lineHeight: 18,
    fontSize: FontSize.h5_size,
  },
  cancelWrapper: {
    borderStyle: "solid",
    borderColor: "#ff9134",
    borderWidth: 1,
    marginLeft: 16,
  },
  frameView: {
    marginTop: 16,
    flexDirection: "row",
    alignSelf: "stretch",
    flex: 1,
  },
  appointment: {
    backgroundColor: Color.gray_400,
    shadowColor: "rgba(24, 57, 107, 0.05)",
    shadowRadius: 20,
    elevation: 20,
    height: 242,
    paddingHorizontal: Padding.p_base,
    borderRadius: Border.br_base,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  frameParent: {
    height: 258,
    marginTop: 15,
    alignSelf: "stretch",
  },
  healthTipsParent: {
    alignSelf: "stretch",
  },
  contentInner: {
    marginTop: 15,
    justifyContent: "center",
  },
  content: {
    alignSelf: "stretch",
    flex: 1,
  },
  patientHome: {
    width: "100%",
    flex: 1,
  },
});

export default PatientHome;
