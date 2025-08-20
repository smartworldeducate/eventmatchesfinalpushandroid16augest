import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
} from 'react-native';
import {
  useLinkProps,
  useNavigation,
  CommonActions,
} from '@react-navigation/native';
import {color} from '@rneui/base';
import { getAppVersionHandler } from '../features/getappversion/getAppVersionSlice';
import { useDispatch } from 'react-redux';
// import LoaderKit from 'react-native-loader-kit';

const Splash = props => {
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setData(parsedData);

        // console.log('here is splash screen data', parsedData);
        if (parsedData) {
          props.navigation.dispatch(StackActions.replace('AllEvents'))
        }
        return parsedData;
      } else {
        props.navigation.dispatch(StackActions.replace('NextScreen'));
        // console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  useEffect(() => {
    dispatch(getAppVersionHandler());
      getData('loginData');
      // props.navigation.dispatch(StackActions.replace('NextScreen'));
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Platform.OS === 'android' ? 'white' : 'white',
      }}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
      <View style={{flex: 0.3}}></View>
      <View style={{flex: 0.4}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: 'splashchange'}}
            style={{width: '70%', height: '70%'}}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
        {/* <LoaderKit
          style={{width: 50, height: 50}}
          name={'BallSpinFadeLoader'}
          size={60}
          color={'#832D8E'}
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Splash;

