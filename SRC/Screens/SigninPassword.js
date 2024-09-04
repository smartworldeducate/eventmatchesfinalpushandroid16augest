import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  ActivityIndicator,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import {verifyPasswordHandler} from '../features/login/passwordSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ficon from 'react-native-fontawesome-pro';
import React, {useEffect, useState} from 'react';
import ViewInput from '../Components/Headers/ViewInput';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
const SigninPassword = props => {
  const dispatch = useDispatch();
  const passwordData=useSelector((state)=>state.passwordState);
  const {email} = props.route.params;
  // console.log('param data', email);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [eyeType, setEyeType] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [deviceIdentifire, setDeviceIdentifire] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: '',
    deviceId: '',
    appToken: '',
    deviceOSVersion: '',
    appInstallVersion: ''
  });
  const onPressShowPassword = () => {
    // console.log("dasjkas",showPassword)
    setShowPassword(!showPassword);
    setEyeType(!eyeType);
  };
  const onPressHandler = (fieldName, fieldValue) => {
    setPassword(fieldValue);
  };
  async function saveData(value) {
    const jsonString = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("loginData", jsonString);
      // console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  const handleLogin = async () => {
    if (password) {
      const verifyUser = await dispatch(
        verifyPasswordHandler({user_email: email, user_password: password,device_token:deviceIdentifire,device_identifier:deviceInfo?.deviceId,auth_token:deviceInfo?.appToken,device_type:deviceInfo?.deviceType,device_name:deviceName,device_os:deviceInfo?.deviceOSVersion,app_installed_version:deviceInfo?.appInstallVersion}),
      );
      if (verifyUser?.payload?.response?.success === 1) {
        // console.log("user login screen ssave==",verifyUser?.payload?.response)
        saveData(verifyUser?.payload?.response);
        props.navigation.navigate('AllEvents');
      } else {
        ToastAndroid.showWithGravity(
          verifyUser?.payload?.response?.message,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Password is required',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };
      // console.log("appInstallVersion==",deviceInfo.appInstallVersion);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const deviceType = DeviceInfo.getDeviceType();
      const deviceId = DeviceInfo.getDeviceId();
      const appToken = '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25'; 
       DeviceInfo.getDeviceName().then((deviceName) => {
        setDeviceName(deviceName);

      });
      DeviceInfo.getFingerprint().then((fingerprint) => {
        setDeviceIdentifire(fingerprint);
      });
      const deviceOSVersion = DeviceInfo.getSystemVersion();
      const appInstallVersion = DeviceInfo.getVersion();
      setDeviceInfo({
        deviceType,
        deviceId,
        appToken,
        deviceOSVersion,
        appInstallVersion
      });
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
       <Modal
        visible={passwordData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal>
      <View style={{flex: 1}}>
        <View style={{height: hp(14), marginTop: hp(-3)}}>
          <Image
            source={{uri: 'vectortop'}}
            style={{width: '100%', height: '100%'}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{flex: 0.5, marginTop: hp(8)}}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(-6),
            }}>
            <Image
              source={{uri: 'splashchange'}}
              style={{width: wp(46), height: hp(23)}}
              resizeMode={'contain'}
            />
          </View>
          <View style={{marginHorizontal: hp(3.5), marginTop: hp(10)}}>
            <View>
              <Text
                style={{
                  color: '#cdcdcd',
                  fontWeight: '400',
                  fontSize: hp(2.5),
                  fontFamily: fontFamily.robotoBold,
                }}>
                Sign in as
              </Text>
            </View>
          </View>
          <View style={{marginHorizontal: hp(3.5), marginTop: hp(0.3)}}>
            <Text
              style={{
                color: colors.blackColor,
                fontWeight: 'bold',
                fontSize: hp(2.5),
                fontFamily: fontFamily.robotoMedium,
              }}>
              {email}
            </Text>
          </View>

          <View style={{flex: 0.5, marginTop: hp(8)}}>
            <ViewInput
              name={'Enter Password'}
              value={password}
              onPress={value => onPressHandler('Password', value)}
              iconRight={eyeType == true ? 'eye' : 'eye-slash'}
              maxLength={25}
              onPressShowPassword={onPressShowPassword}
              secureTextEntry={showPassword}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: hp(3.5),
            marginTop: hp(10),
          }}>
          <View></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{paddingRight: 10}}>
              <Text
                style={{
                  color: '#262626ed',
                  fontSize: hp(2.5),
                  fontWeight: '600',
                  fontFamily: fontFamily.robotoBold,
                }}>
                Continue
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                width: wp(13.5),
                height: hp(4.5),
                backgroundColor: '#832D8E',
                borderRadius: hp(1.5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ficon
                type="light"
                name="arrow-right"
                color="#FFFFFF"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.3, marginLeft: hp(-25.5), marginTop: hp(4)}}>
          <Image
            source={{uri: 'vectorbottom'}}
            style={{height: hp(32)}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </View>
  );
};

export default SigninPassword;
