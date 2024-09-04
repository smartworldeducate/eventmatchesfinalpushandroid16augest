import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Search from '../Components/Search';
import Icon from 'react-native-fontawesome-pro';
import {speakerHandler} from '../features/speaker/speakerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import {useDispatch, useSelector} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
const SpeakerList = props => {
  const dispatch = useDispatch();
  // const {id} = props.route.params;
  // console.log("param data===",props.route.params?.id);
  const speakerData = useSelector(state => state.speakerState);
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  // const urlData=speakerData?.user?.response?.events[0];
  // console.log("speakerd data===",speakerData?.user?.response?.events[0]?.speaker_detail);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        // console.log("parsedData=====-=",parsedData);

        setData(parsedData);
        // console.log('user id and event_id===', parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        dispatch(
          speakerHandler({
            user_id: parsedData.event_user_id,
            event_id: parsedData.event_id,
            type_id: 1,
          }),
        );
        // console.log('here is feedback screen data', parsedData);
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

  const filteredData = speakerData?.user?.response?.events?.filter(item =>
    item.speaker_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('SpeakerProfile', {
            item: item,
            event_id: data?.event_id,
          })
        }
        style={{
          flex: 0.4,
          flexDirection: 'row',
          // backgroundColor: 'green',
          height: hp(10.3),
          borderRadius: hp(1.6),
          borderWidth: 0.5,
          borderColor: '#cdcdcd',
          marginVertical: hp(1.3),
          marginHorizontal: hp(2.5),
        }}>
        <View
          style={{
            flex: 0.29,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: hp(-1),
            // backgroundColor:'red',
            paddingVertical: hp(1),
            // borderRadius:hp(50),
            // borderWidth:1,
            // borderColor:'#cdcdcd',
            // margin:hp(1)
          }}>
          <View
            style={{
              borderRadius: hp(50),
              borderWidth: 1,
              borderColor: '#cdcdcd',
              width: wp(15),
              height: hp(7.5),
            }}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                paddingTop: hp(0),
                borderRadius: hp(50),
              }}
              source={{uri: item?.image_name}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{flex: 0.7, justifyContent: 'center', paddingLeft: hp(0.5)}}>
          <Text
            style={{
              color: colors.descBlack,
              paddingLeft: hp(0),
              fontSize: hp(1.8),
              fontWeight: 'bold',
              fontFamily: fontFamily.robotoBold,
            }}>
            {item?.speaker_name}
          </Text>
          <Text
            style={{
              color: colors.grayDescColor,
              fontSize: hp(1.5),
              paddingLeft: hp(0),
              fontWeight: '400',
              fontFamily: fontFamily.robotoMedium,
              paddingTop:hp(1)
            }}>
            {item?.designation}
          </Text>
        </View>
        <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          paddingRight: hp(1),
          // backgroundColor:'green'
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#832D8E',
            paddingHorizontal: hp(1.2),
            paddingVertical: hp(0.5),
            borderRadius: hp(1),
            // backgroundColor:colors.lightBlue
          }}>
          <Icon type="light" name="arrow-down-right" size={hp(3)} color="#832D8E" />
        </View>
      </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Modal
        visible={speakerData?.isLoading}
        transparent={true}
        animationType="fade">
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
      <View style={{flex: 0.1}}>
        <MainHeader
          text={'Speaker List'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.03}}></View>
      <View style={{flex: 0.1, marginTop: hp(2)}}>
        <Search setSearchQuery={setSearchQuery} />
      </View>

      <View style={{flex: props?.route?.params?.id ? 0.8:0.68}}>
        {filteredData ?  <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />: <View style={{
          flex: 0.15,
          justifyContent:'center',
          alignItems:'center',
        }}>
          <Text style={{color:colors.grayDescColor,fontSize:hp(2),
          fontWeight:'400',
          fontFamily:fontFamily.robotoMedium,fontStyle: 'italic'}}>
            Speakers are currently unavailable.</Text>
            </View> }
       
      </View>
    </View>
  );
};

export default SpeakerList;
