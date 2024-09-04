import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Search from '../Components/Search';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fontFamily from '../Styles/fontFamily';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {speakerHandler} from '../features/speaker/speakerSlice';
import colors from '../Styles/colors';
const Sponsor = props => {
  const dispatch = useDispatch();
  const speakerData = useSelector(state => state.speakerState);
  // console.log('sponsor 2===', speakerData?.user?.response);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);

        // setData(parsedData);
        // {"user_id":parsedData.user_id,"event_id":parsedData.event_id,"type_id":1}
        dispatch(
          speakerHandler({
            user_id: parsedData.user_id,
            event_id: parsedData.event_id,
            type_id: 2,
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
    }, []),
  );
  useEffect(() => {
    getData('userSession');
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[styles.cardImgWrapper]}>
        <Image
          source={{uri: item?.image_name ? item?.image_name:''}}
          resizeMode="contain"
          style={styles.cardImg}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.1}}>
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
        <MainHeader
          text={'Sponsors'}
          onpressBtn={() => props.navigation.goBack()}
        />
      </View>
      <View style={{flex: 0.03}}></View>
      <View style={{flex: 0.1, marginTop: hp(0)}}>
        <Search />
      </View>
      <View
        style={{
          flex: 0.8,
          // backgroundColor: 'red',
          marginHorizontal: hp(2.5),
          marginTop: hp(0),
          // flexDirection:'row'
        }}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={speakerData?.user?.response?.events}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>
        {speakerData?.user?.response?.success === 0 && (
          <View
            style={{
              flex: 0.1,
              height: hp(15),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.grayDescColor,
                fontSize: hp(2),
                fontStyle: 'italic',
                fontFamily: fontFamily.robotoBold,
              }}>
              No Data Available.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Sponsor;

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
    // flex: hp(0.33),
    flexDirection: 'row',
    height: hp(12),
    width: hp(13),
    marginRight: hp(1),
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    height: '92%',
    width: '90%',
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
    fontSize: 18,
    color: '#1C2833',
  },
  cardDetails: {
    fontSize: hp(3),
    color: '#1C2833',
  },
});
