import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale, moderateScale } from '../../src/responsive';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// --- Color Palette (Matching Community.jsx) ---
const COLORS = {
    background: '#141326',
    cardBg: '#433DA3',
    primary: '#E3823C',
    accent: '#E33C3C',
    text: '#FFFFFF',
    textSecondary: '#D7C7EC',
    yellow: '#FFC107',
};

// --- Custom Component for Circular Progress ---
const CircleProgress = ({ percent, target, saved }) => {
  return (
    <View style={circleStyles.wrapper}>
      <View style={circleStyles.circlePlaceholder}>
        <View style={[circleStyles.progressArc, { transform: [{ rotateZ: `${(percent * 3.6) - 90}deg` }] }]} />
        <Text style={circleStyles.percentText}>{percent}%</Text>
      </View>
      <Text style={circleStyles.infoText}>Target: ₱{target.toLocaleString()}</Text>
      <Text style={circleStyles.infoText}>Saved: ₱{saved.toLocaleString()}</Text>
    </View>
  );
};

export default function Profile() {
  const targetAmount = 10000;
  const savedAmount = 6500;
  const progressPercent = Math.round((savedAmount / targetAmount) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar style="light" backgroundColor={COLORS.background} translucent={false} />
      
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/N2yyWBWpxG/oi83aoen_expires_30_days.png"}} 
              style={styles.avatarImage} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.name}>Juan Dela Cruz Jr.</Text>
          <Text style={styles.quote}>"Budgeting is the key to financial freedom"</Text>
        </View>

        {/* Personal Info Button */}
        <TouchableOpacity style={styles.buttonRow} activeOpacity={0.7}>
          <Text style={styles.buttonLabel}>Personal Info</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Goals + Emergency Fund Row */}
        <View style={styles.row}>
          <View style={[styles.card, styles.myGoalCard]}>
            <Text style={styles.cardTitle}>My Goal</Text>
            <Text style={styles.cardSubtitle}>"Dream Car"</Text>
          </View>

          <View style={[styles.card, styles.emergencyCard]}>
            <Text style={styles.cardTitleEmergency}>  Emergency {'\n'}        Fund</Text>
            <CircleProgress
              percent={progressPercent}
              target={targetAmount}
              saved={savedAmount}
            />
          </View>
        </View>

        {/* Settings Button */}
        <TouchableOpacity style={styles.buttonRow} activeOpacity={0.7}>
          <Text style={styles.buttonLabel}>Settings and Preferences</Text>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        {/* Log out Button */}
        <TouchableOpacity style={styles.logoutButtonWrapper} activeOpacity={0.7}>
          <LinearGradient
            colors={[COLORS.accent, COLORS.primary]}
            style={styles.logoutButton}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const circleStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    flex: 1, 
    justifyContent: 'center', 
  },
  circlePlaceholder: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: 'transparent',
    borderWidth: moderateScale(5),
    borderColor: 'rgba(255,255,255,0.15)', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    overflow: 'hidden',
  },
  progressArc: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(5),
    borderColor: 'transparent',
    borderTopColor: COLORS.yellow,
    borderRightColor: COLORS.yellow,
  },
  percentText: {
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
  },
  infoText: {
    fontSize: moderateScale(11),
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    textAlign: "center",
    lineHeight: moderateScale(16),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(50),
    maxWidth: 600, // Maximum width for larger screens
    width: '100%',
    alignSelf: 'center', // Center the content container
  },

  header: {
    alignItems: "center",
    marginBottom: verticalScale(32),
  },

  avatarWrapper: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(20),
    backgroundColor: COLORS.background,
    borderWidth: moderateScale(3),
    borderColor: COLORS.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '70%',
    height: '70%',
    tintColor: COLORS.yellow,
  },

  name: {
    fontSize: moderateScale(24),
    fontFamily: 'Poppins-Bold',
    color: COLORS.yellow,
    marginBottom: verticalScale(8),
  },

  quote: {
    fontSize: moderateScale(13),
    fontFamily: 'Poppins-Regular',
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  // --- Buttons (Personal Info, Settings) ---
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.yellow,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
  },

  buttonLabel: {
    color: COLORS.text,
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Medium',
  },

  arrow: {
    color: COLORS.text,
    fontSize: moderateScale(20),
    fontFamily: 'Poppins-Regular',
  },

  // --- Cards ---
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
    gap: scale(12),
  },

  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    padding: scale(16),
    borderRadius: moderateScale(16),
    minHeight: verticalScale(160),
  },
  
  myGoalCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  
  emergencyCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  cardTitle: {
    color: COLORS.yellow,
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: verticalScale(12),
  },
  
  cardTitleEmergency: {
    color: COLORS.yellow,
    fontSize: moderateScale(16),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: verticalScale(1),
  },

  cardSubtitle: {
    color: COLORS.text,
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },

  // --- Logout Button ---
  logoutButtonWrapper: {
    marginTop: verticalScale(4),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  
  logoutButton: {
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(12),
    alignItems: "center",
  },
  
  logoutText: {
    color: COLORS.text,
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-SemiBold',
  },
});