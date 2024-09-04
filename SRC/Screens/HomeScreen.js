import React, { useEffect, useState, useRef, useCallback } from 'react';
import Ficon from 'react-native-fontawesome-pro';
import Menu from 'react-native-vector-icons/Entypo';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-fontawesome-pro';
import VersionCheck from 'react-native-version-check';

import {
  Image,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  ActivityIndicator,
  ActivityIndicatorBase,
  ToastAndroid,
  Alert,
  Linking
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import colors from '../Styles/colors';
import HeaderTop from '../Components/Headers/HeaderTop';
import BtnThree from '../Components/BtnThree';
import fontFamily from '../Styles/fontFamily';
import { useDispatch, useSelector } from 'react-redux';
import { registerActivityHandler } from '../features/registeractivity/registerActivitySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { activityHomeHandler } from '../features/eventactivityhome/hactivitySlice';
import { getAppVersionHandler } from '../features/getappversion/getAppVersionSlice';
const HomeScreen = (props) => {
  const { apiIdentifier } = props.route?.params || {};
  // console.log("apiIdentifier==",apiIdentifier);
  const dispatch = useDispatch();
const activityData=useSelector((state)=>state.acitivityState);
const registerActivityData=useSelector((state)=>state.registerActivityState);
const appVersionData=useSelector((state)=>state.appVersionState);

// console.log("activityData===",activityData?user);
  const activityDate=activityData?.user?.responseData?.response?.activities?.['1'];
  const activitytwo=activityData?.user?.responseData?.response?.activities?.['2'];
  const activitythree=activityData?.user?.responseData?.response?.activities?.['3'];
  const [adminData, setAdminData] = useState(null);
  const [dayone,setDayOne]=useState(true);
  const [loginData, setLoginData] = useState(null);
  const [daytwo,setDayTwo]=useState(false);
  const [daythree,setDayThree]=useState(false);
  const [isRegistered, setIsRegistered] = useState('');
  const navigation = useNavigation();
//   console.log("admin==",adminData?.user_id,adminData?.event_id)
// console.log("login user==",adminData?.login_id)

  async function getSessionData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        // console.log("parsedDataon home screen=====-=",parsedData);
        setAdminData(parsedData);
        if (apiIdentifier === 'mySessions') {
          dispatch(activityHomeHandler({event_id: parsedData?.event_id,user_id:parsedData?.event_user_id,user_sessions_only:'Y'}));
        }else{
          dispatch(activityHomeHandler({event_id: parsedData?.event_id,user_id:parsedData?.event_user_id}));
        }
      } 
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }


  useFocusEffect(
    useCallback(() => {
      getSessionData('userSession');
    }, [dispatch])
  )

  useEffect(() => {
    getSessionData('userSession');
  }, [dispatch]);

 const registerActivityFunction=(item)=>{
  const requestData = {
    "activity_id": item?.activity_id,
    "admin_id": adminData?.user_id,
    "user_id": adminData?.event_user_id,
    "event_id": adminData?.event_id,
  };
  if (item?.is_registered === 'Y') {
    requestData.status = 'N';
  }
    dispatch(registerActivityHandler(requestData));
    getSessionData('userSession');
  if(registerActivityData?.user?.success === 1){
    ToastAndroid.showWithGravity(
      registerActivityData?.user?.message,
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  }
 }


 useEffect(() => {
  const checkForUpdate = async () => {
    const apiVersion = appVersionData?.user?.response?.version;
    const appVersion = '1.04';

    if (apiVersion >= appVersion) {
      Alert.alert(
        'Update Required',
        'Please update the app to the latest version to continue.',
        [
          {
            text: 'Update Now',
            onPress: () => {
              VersionCheck.getStoreUrl({ appID: 'com.ccsclientwbec' }).then(url => {
                Linking.openURL(url);
              });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  checkForUpdate();
}, []);


  const dayOneHandler=()=>{
    setDayOne(true)
    setDayTwo(false)
    setDayThree(false)
  }

  const dayTwoHandler=()=>{
    setDayOne(false)
    setDayTwo(true)
    setDayThree(false)
  }

  const dayThreeHandler=()=>{
    setDayOne(false)
    setDayTwo(false)
    setDayThree(true)
  }

  const data = [
    { id: 1, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/371_1.jpg' },
    { id: 2, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/369_1.jpg' },
    { id: 3, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/370_1.jpg' },

  ];

  // const cardData=[
  //   { id: 1, image: 'banertwo',headingText:'A Beginner s Guide',timetext:'10:00 - 11:00',locatoin:'Manchester',btntext:'Register' },
  //   { id: 2, image: 'cardtwo',headingText:'Simple Tips for Success',timetext:'11:00 - 12:00',locatoin:'Glasgow',btntext:'Un-Register' },
  //   { id: 3, image: 'cardone',headingText:'Your Event Success For',timetext:'13:00 - 14:00',locatoin:'Bristol',btntext:'Register' },
  //   { id: 3, image: 'banertwo',headingText:'A Beginner s Guide',timetext:'10:00 - 11:00',locatoin:'Manchester',btntext:'Register' },
  // ]
  const renderItem = ({item, index}) => {
    // console.log("image data===",item?.activity_speakers?.image_name);
    return (
      <TouchableOpacity onPress={()=>props.navigation.navigate('Session',{item})} style={{ flex: 0.19, borderRadius: hp(3), borderWidth:0.5, borderColor: '#cdcdcd', flexDirection: 'row',marginTop:hp(1.5) }}>
        <View style={{ flex: 0.45, height: hp[(5)] }}>
          {/* banertwo */}
          <Image
            style={{ width: '100%', height: '100%', paddingTop: hp(2), borderBottomLeftRadius: hp(2), borderTopLeftRadius: hp(2) }}
            source={{ uri:item?.image_name}}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 0.55 }}>
          <View style={{ marginHorizontal: hp(1.5), marginVertical: hp(1.5) }}>
            <Text style={{ color:colors.blackColor, fontWeight: 'bold', fontSize: hp(1.8),fontFamily:fontFamily.robotoBold }} ellipsizeMode={'tail'} numberOfLines={1}>{item?.activity_name}</Text>
            <Text style={{ color: 'gray', fontWeight: 'normal',fontFamily:fontFamily.robotoMedium,fontSize: hp(2) }}>{item?.start_time} - {item?.end_time}</Text>
            <View style={{ marginTop: hp(0.7) }}>{}
              <Text style={{ color: colors.lightBlue, fontWeight: '500',fontFamily:fontFamily.robotoBold,fontSize: hp(2) }}>{item?.activity_type}</Text>
            </View>
            <View style={styles.headerImageSection}>
              {data.slice(0, 7).map((item, i) => {

                return (
                  <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Attendees')}
                    style={styles.imageList}
                    key={i}>
                    <Image
                      style={styles.imgStyle}
                      source={{ uri: item?.activity_speakers?.image_name }}
                      resizeMode="cover"
                    />
                    {/* <View style={{height:hp(3),width:wp(6),borderRadius:hp(50),borderColor:"#fff",borderWidth:1}}></View> */}
                  </TouchableOpacity>
                );

              })}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 0.6, flexDirection: 'row' }}>

                <TouchableOpacity onPress={()=>props.navigation.navigate("MapScreen")} style={{ flex: 0.3 }}>
                  <Icon type="light" name="location-dot" size={hp(2.5)} color="#832D8E" />
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 0.9 }}>
                  <Text style={{ color: colors.lightBlack,fontFamily:fontFamily.robotoMedium}}>{item?.state_name}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.1 }}></View>
              {item?.show_reg_button=='Y'&& ( <TouchableOpacity onPress={()=>registerActivityFunction(item)} style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4, borderRadius: hp(0.9), height: hp(5), marginTop: hp(-1.4), marginLeft: hp(-1), backgroundColor:item?.is_registered =='Y' ? '#555555':'#832D8E',height:hp(4),paddingHorizontal:hp(1) }}>
                <Text style={{ color: '#fff', fontWeight: '500',fontFamily:fontFamily.robotoMedium,fontSize:hp(1.5)}}>{item?.is_registered == 'Y' ? 'Un-Register':'Register'}</Text>
              </TouchableOpacity>)}
             
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginHorizontal: hp(2.5),
        backgroundColor:'#fffff'
      }}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
       <Modal
        visible={activityData?.isLoading || registerActivityData?.isLoading}
        transparent={true}
        animationType="fade"
      >
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#cdcdcd" />
        </View>
        </View>
      </Modal>
      <View style={{ flex: 0.25 }}>
        <HeaderTop
          onPressIcon={() => navigation.openDrawer()}
          onflterPress={()=>props.navigation.navigate("Admins")}
        />
      </View>

      <View style={{ flex: 0.3 }}>
        <Image
          style={{ width: '100%', height: '90%', borderRadius: hp(1.5) }}
          source={{ uri: 'groupfore' }}
          resizeMode="cover"
        />
      </View>

      <View style={{ flex: 0.11 }}>
       
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
  {activityDate && (
    <TouchableOpacity onPress={dayOneHandler} style={{ flex: 0.3, borderRadius: hp(5), height: hp(5.3), borderWidth:1, borderColor:dayone ? "#fff":"#832D8E", justifyContent: 'center', alignItems: 'center',backgroundColor:dayone ? "#832D8E":"#EBEEF2", }}>
      <Text style={{ color:dayone ? "#fff":"#832D8E",fontSize: hp(2), fontWeight: '400',fontFamily:fontFamily.robotoBold }}>DAY 1</Text>
      <Text style={{ color:dayone ? "#fff":"#832D8E", fontSize: hp(1.3), fontWeight: '300',fontFamily:fontFamily.robotoMedium  }}>{activityDate[0]?.activity_date}</Text>
    </TouchableOpacity>
  )}
  {activitytwo && (
    <TouchableOpacity onPress={dayTwoHandler} style={{ flex: 0.3, borderRadius: hp(5), height: hp(5.3), borderWidth: 1, borderColor: '#832D8E', justifyContent: 'center', alignItems: 'center', marginHorizontal: hp(1),backgroundColor:daytwo ? "#832D8E":"#EBEEF2", }}>
      <Text style={{ color:daytwo ? "#fff":"#832D8E", fontSize: hp(2), fontWeight: '400',fontFamily:fontFamily.robotoBold }}>DAY 2</Text>
      <Text style={{ color:daytwo ? "#fff":"#832D8E", fontSize: hp(1.3), fontWeight: '300',fontFamily:fontFamily.robotoMedium }}>{activitytwo[0]?.activity_date}</Text>
    </TouchableOpacity>
  )}
  {activitythree && (
    <TouchableOpacity onPress={dayThreeHandler} style={{ flex: 0.3, borderRadius: hp(5), height: hp(5.3), borderWidth: 1, borderColor: '#832D8E', justifyContent: 'center', alignItems: 'center',backgroundColor:daythree ? "#832D8E":"#EBEEF2", }}>
      <Text style={{ color:daythree ? "#fff":"#832D8E", fontSize: hp(2), fontWeight: '400',fontFamily:fontFamily.robotoBold }}>DAY 3</Text>
      <Text style={{ color:daythree ? "#fff":"#832D8E", fontSize: hp(1.3), fontWeight: '300',fontFamily:fontFamily.robotoMedium }}>{activitythree[0]?.activity_date}</Text>
    </TouchableOpacity>
  )}
</View>
      </View>

      <View style={{ flex: 1,marginBottom:hp(10.5)}}>
        {dayone && ( <FlatList
        data={activityDate}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />)}
        {daytwo && ( <FlatList
        data={activitytwo}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />)}
      {daythree && ( <FlatList
        data={activitythree}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />)}
    </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = EStyleSheet.create({
  headerImageSection: {
    flexDirection: 'row',
    marginLeft: hp(3),
    alignItems: 'center',
    marginVertical: hp(0.9),
  },
  imageList: {
    width: wp(10.7),
    marginLeft: hp(-3),
    // borderColor: '#fff',
    // borderWidth: 1,
    // borderRadius: hp(50),
  },


  imgStyle: { width: wp(7), height: hp(3.5), borderRadius: hp(50) },

  overlyImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
});
