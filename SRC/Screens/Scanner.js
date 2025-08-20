import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import { scanerPostHandler } from '../features/scanerpostdata/scanerPostSlice';
import fontFamily from '../Styles/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Scanner = props => {
  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [close, setClose] = useState(false);
  const scanPostData = useSelector(state => state.scanPostState);

  useFocusEffect(
    useCallback(() => {
      getData('userSession');
      requestCameraPermission();
    }, [])
  );

  async function requestCameraPermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs camera access to scan QR codes',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        const parsedData = JSON.parse(value);
        setData(parsedData);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  const closeAndNavigateHandler = () => {
    props.navigation.goBack();
    setClose(false);
  };

  // const handleMessage = event => {
  //   const qrValue = event.nativeEvent.data;
  //    console.log('📦 Scanned QR Code:', qrData);
  //   if (!qrValue) return;

  //   setClose(true);
  //   dispatch(
  //     scanerPostHandler({
  //       user_id: data?.event_user_id,
  //       event_id: data?.event_id,
  //       admin_id: data?.user_id,
  //       qr_code: qrValue,
  //     })
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <Modal visible={scanPostData?.isLoading} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: wp(25),
              height: hp(12.5),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#cdcdcd" />
          </View>
        </View>
      </Modal>

      <Modal visible={close} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              width: wp(60),
              height: hp(30),
              backgroundColor: 'white',
              borderRadius: hp(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: hp(2),
                fontFamily: fontFamily.robotoMedium,
                fontWeight: '400',
              }}>
              {scanPostData?.user?.response?.message}
            </Text>
            <TouchableOpacity
              onPress={closeAndNavigateHandler}
              style={{
                backgroundColor: '#832D8E',
                borderRadius: hp(50),
                width: hp(10),
                height: hp(4.5),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: hp(4),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: hp(2),
                  fontFamily: fontFamily.robotoMedium,
                  fontWeight: '400',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flex: 0.1 }}>
        <MainHeader
          text={'Scanner'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>

      <View style={{ flex: 0.9}}>
        <View style={{height:hp(6),backgroundColor:'#fff',position:'relative',zIndex:9,top:hp(85)}}></View>
        <WebView
          source={{ uri:"https://scanapp.org/" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="always"
          style={{ flex: 1 }}
           onMessage={event => {
          const qrValue = event.nativeEvent.data;
          dispatch(
            scanerPostHandler({
              user_id: data?.event_user_id,
              event_id: data?.event_id,
              admin_id: data?.user_id,
              qr_code: qrValue,
            })
          );
          console.log('📦 Scanned QR Code:', qrValue);
          }}
          injectedJavaScript={`
            (function() {
              const target = document.getElementById('scan-result-text');
              const observer = new MutationObserver(() => {
                if (target && target.innerText.trim()) {
                  window.ReactNativeWebView.postMessage(target.innerText.trim());
                }
              });
              if (target) {
                observer.observe(target, { childList: true, subtree: true });
              }
            })();
            true;
          `}
        />
      </View>
    </View>
  );
};

export default Scanner;
