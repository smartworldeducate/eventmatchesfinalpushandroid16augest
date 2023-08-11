import React, {useEffect, useState} from 'react';
// import Left from 'react-native-vector-icons/AntDesign';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import Clinder from 'react-native-vector-icons/AntDesign';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';

import colors from '../Styles/colors';
import HeaderTop from '../Components/Headers/HeaderTop';
// import HeaderSecond from '../Components/Headers/HeaderSecond';
// import HomeList from '../Components/HomeList/HomeList';
// import HomeList2 from '../Components/HomeList/HomeList2';
// import MainHeader from '../Components/Headers/MainHeader';
// import TextInputCustom from '../Components/TextInput/TextInput';
// import Button from '../Components/Button/Button';
import Card from '../Components/Card';
import Calinder from '../Components/Calinder';
import fontSize from '../Styles/fontSize';
import fontFamily from '../Styles/fontFamily';

const HomeScreen = props => {
  const navigation = useNavigation();
  const handleNavigate = (routeName, clearStack, params) => {
    navigation.navigate(routeName, params);
    if (clearStack) {
      console.log('Clear');
    }
  };
  const [employeeId, setEmployeeId] = useState();
  const [employeePassword, setEmployeePassword] = useState();

  // const [refreshing, setRefreshing] = useState(false);
  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setRefreshing(false);
  // };

  const onChangeEmpId = val => {
    setEmployeeId(val);
  };
  const onChangeEmpPassword = val => {
    setEmployeePassword(val);
  };

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onPressLogin = () => {
    handleNavigate('Login');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === 'android'
            ? colors.appBackGroundColor
            : colors.appBackGroundColor,
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#1C37A5', '#4D69DC']}
        style={{height: hp('5')}}>
        <StatusBar translucent backgroundColor="transparent" />
      </LinearGradient>
      <View>
        <HeaderTop
          onPressIcon={() => navigation.openDrawer()}
          iconName={'arrowleft'}
          // text={'Change Password'}
        />
      </View>
      <ScrollView>
        <View style={styles.botContainer}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ficon
              type="light"
              name="bars-progress"
              size={hp(3.5)}
              color="#4D69DC"
            />

            <Text style={[styles.serviceSection]}>3.7 Years</Text>

            <Text style={[styles.bootContText2]}>Service Length</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: hp(2),
            }}>
            <Ficon
              type="light"
              name="chart-area"
              size={hp(3.5)}
              color="#4D69DC"
            />

            <Text style={[styles.serviceSection]}>Regular</Text>
            <Text style={[styles.bootContText2]}>Status</Text>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ficon
              type="light"
              containerStyle={styles.iconStyle}
              name="calendar-days"
              size={hp(3.5)}
              color="#4D69DC"
            />
            {/* <Svg width="50" height="30" viewBox="0 0 50 50">
      <Path d="M10,10 L40,40" fill="none" stroke="black" />
    </Svg> */}

            <Text style={styles.serviceSection}>08:59:05</Text>
            <Text style={[styles.bootContText2]}>Attendance</Text>
          </View>
        </View>

        <Card />
        <View>
          <Calinder />
        </View>
      </ScrollView>

      <View
        style={{
          backgroundColor: '#fff',
          position: 'relative',
          bottom: hp(0),
        }}>
        <View
          style={{
            height: hp(7),
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {/* <View style={{flex:0.1}}></View> */}
          <TouchableOpacity
            onPress={() => {}}
            style={{flex: 0.2, alignItems: 'center'}}>
            <Menu name="home" size={hp(3)} color="#1C37A4" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 0.2, paddingTop: hp(0.5), alignItems: 'center'}}>
            <Ficon
              type="light"
              name="book-bookmark"
              size={hp(3)}
              color="#979797"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: hp('6'),
                alignItems: 'center',
                width: wp(12),
                borderWidth: hp(0.5),
                borderColor: 'gray',
                borderRadius: hp(50),
                backgroundColor: 'black',
                justifyContent: 'center',
              }}>
              <Ficon style={{}} name="qrcode" size={hp(4)} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 0.2, alignItems: 'center'}}>
            <Ficon
              type="light"
              name="calendar-days"
              size={hp(3)}
              color="#979797"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 0.2, alignItems: 'center', paddingTop: hp(0)}}>
            <Ficon type="light" name="user-tie" size={hp(3)} color="#979797" />
          </TouchableOpacity>
          {/* <View style={{flex:0.1}}></View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  textInputView: {
    justifyContent: 'center',
    backgroundColor: colors.whiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    height: hp('7'),
    borderRadius: wp('10'),
    borderColor: colors.grey,
    borderWidth: wp('0.1'),
    marginBottom: hp('2'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: wp('10'),
    shadowRadius: wp('10'),
    elevation: 10,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('7'),
    letterSpacing: -0.05,
    paddingLeft: wp('6'),
    color: colors.loginIconColor,
  },
  textView: {
    marginTop: hp(2),
  },

  textstyle: {
    color: '#fff',
    fontSize: hp(2),
    marginTop: hp(0.5),
  },
  headerRow: {
    justifyContent: 'space-between',
  },
  botContainer: {
    flex: 1,
    height: hp(7),
    marginTop: hp(3),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  zetext: {
    color: '#fff',
    fontSize: fontSize.small,
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },
  bootContText: {
    fontSize: '0.5rem',
    fontWeight: '900',
    fontFamily: fontFamily.ceraLight,
    paddingHorizontal: hp(3),
    color: '#979797',
  },
  bootContText2: {
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#979797',
    textTransform: 'uppercase',
    paddingTop: hp(0.2),
  },
  serviceSection: {
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    paddingHorizontal: hp(2),
    color: '#353535',
    paddingTop: hp(0.3),
  },

  zetext1: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '100',
    fontFamily: fontFamily.ceraLight,
  },

  ztitle: {
    color: '#fff',
    fontSize: hp(1.5),
    fontWeight: '600',
    marginTop: hp(1),
    fontFamily: fontFamily.ceraLight,
  },
  textInputCustomStyle: {
    fontSize: hp('1.65'),
    height: hp('6'),
    letterSpacing: -0.05,
    paddingLeft: wp('3'),
    color: colors.loginIconColor,
  },
  iconStyle: {
    fontSize: '1.5625rem',
    fontWeight: 300,
  },
});

export default HomeScreen;
