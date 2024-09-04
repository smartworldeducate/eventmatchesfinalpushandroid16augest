import React, {useCallback, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import {speakerHandler} from '../features/speaker/speakerSlice'
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import MainHeader from '../Components/Headers/MainHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const Exibitor = props => {
  const dispatch = useDispatch();
  const speakerData=useSelector((state)=>state.speakerState);
  // console.log("speakerDa==",speakerData?.user?.response);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);

        // setData(parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        dispatch(speakerHandler({"user_id":parsedData.event_user_id,"event_id":parsedData.event_id,"type_id":3}));
        console.log('here is feedback screen data', parsedData);
        return parsedData;
      } 
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  useFocusEffect(
    useCallback(() => {
      getData('userSession');
      // dispatch(resetState());
    }, [])
  )
  useEffect(() => {
    getData('userSession');
  }, []);
  
  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.card]} key={index}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ExibitoeDetail',{item})}
        style={styles.cardImgWrapper}>
        <Image
          source={{uri:item?.image_name}}
          resizeMode="contain"
          style={styles.cardImg}
        />
      </TouchableOpacity>
      <View
        style={[styles.cardInfo, {backgroundColor:'#F9E79F'}]}>
        <Text style={styles.cardTitle}>{item?.speaker_name}</Text>
        <View style={{marginTop: hp(4), flexDirection: 'row'}}>
          {/* <ExibitorBtn /> */}
          <View style={{flex: 0.5}}></View>
          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate('Sponsor')}
            style={{
              flex: 0.5,
              backgroundColor:'#F1C40F',
              borderRadius: hp(1),
              alignItems: 'center',
              width: hp(10),
              paddingVertical: hp(0.5),
              marginTop: hp(1),
              borderColor: '#5669FF',
              marginBottom: hp(1),
            }}>
            <View
              style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#fff',
                  fontSize:hp(0.9),
                  fontWeight: 'bold',
                  fontFamily:fontFamily.robotoBold
                }}>
                Sponsors
              </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
       <Modal
        visible={speakerData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal>
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Exhibitor'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.9, marginHorizontal: hp(2.5), marginTop: hp(3)}}>
      {speakerData?.user?.response?.success===0 && (
          <View style={{flex:0.1,height:hp(15),justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:colors.grayDescColor,fontSize:hp(2),fontStyle:'italic',fontFamily:fontFamily.robotoBold}}>No Data Available.</Text>
          </View>
        )} 
      <FlatList
          data={speakerData?.user?.response?.events}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Exibitor;

const styles = StyleSheet.create({
  cardsWrapper: {
    marginHorizontal: hp(2.5),
  },
  card: {
    height: hp(13),
    marginVertical: hp(1),
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImgWrapper: {
    backgroundColor: '#fff',
    flex: hp(0.12),
    height: hp(12),
    marginRight: hp(1),
    borderColor: '#cdcdcd',
    borderWidth: 0.5,
    borderRadius: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    height: '80%',
    width: '80%',
    alignSelf: 'center',

    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    borderColor: '#EBEEF2',
    borderWidth: 1,
    borderRadius: hp(1.5),
    flex: 2.5,
    padding: 10,
    height: hp(12),
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize:hp(1.8),
    color: colors.descBlack,
    fontFamily:fontFamily.robotoBold
  },
  cardDetails: {
    fontSize: hp(3),
    color: '#1C2833',
  },
});
