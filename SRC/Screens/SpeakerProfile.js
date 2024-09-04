import {
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Linking,
    Modal,
    ActivityIndicator,
    ToastAndroid,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import MainHeader from '../Components/Headers/MainHeader';
  import Icon from 'react-native-fontawesome-pro';
  import {speakerDetailHandler} from '../features/myspeaker/speakerDetailSlice'
  import { registerActivityHandler } from '../features/registeractivity/registerActivitySlice';
  import RenderHtml from 'react-native-render-html';

  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import EStyleSheet from 'react-native-extended-stylesheet';
  import colors from '../Styles/colors';
  import fontFamily from '../Styles/fontFamily';
  import { useDispatch, useSelector } from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  const SpeakerProfile = props => {
    const dispatch = useDispatch();
    const speakerDetailData=useSelector((state)=>state.myDetailState);
  
    // console.log("speakerDetaidetail==",speakerDetailData?.user?.response?.events[0]);
    const {item,event_id} = props.route.params;
    // console.log("item==",item);
    const [abstract, setAbstract] = useState(true);
    const [speaker, setSpeaker] = useState(false);
    const [resurces, setResurces] = useState(false);
    const [activeTab, setActiveTab] = useState("Default");
    const [tabData, setTabData] = useState([]);
    const [adminData, setAdminData] = useState(null);
  
    // console.log("activeTab===",activeTab);
  
  
    async function getSessionData(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          // console.log('Data retrieved successfully:', value);
          const parsedData = JSON.parse(value);
          setAdminData(parsedData);
          dispatch(speakerDetailHandler({"event_id":parsedData?.event_id,"speaker_id":item?.speaker_id}));
        } 
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    }
  
    useEffect(() => {
      getSessionData('userSession');
    }, []);
  
    // const getTabData = (tabName) => {
    //   // Fetch data from your detail object based on the tabName
    //   return speakerDetailData?.user?.response?.detail?.[tabName];
    // }
    // const handleTabClick = (tabName) => {
    //   console.log("activeTab===",tabName);
    //   setActiveTab(tabName);
    //   // Fetch data for the selected tab
    //   const newData = getTabData(tabName); // Implement this function to fetch data based on tabName
    //   setTabData(newData);
    // }

    const openUrlHandler=(item)=>{
      if(item !==''){
        Linking.openURL(item);
      }else{
        ToastAndroid.showWithGravity(
         "No Url found",
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
      
    }
  
    const tagsStyles = {
      body: {
        whiteSpace: 'normal',
        color: '#aaa',
      },
      div: {color: 'blue', fontSize:hp(1.8)},
      p: {
        paddingTop:0,
        color:"#394452",
        fontWeight:'400',
        fontSize: hp(1.7),
        lineHeight: hp(2.56),
        fontFamily: fontFamily.robotoMedium,
        textAlign:'left'
      }, 
      span: {color: 'green'}, 
    };
 
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={'default'}
          translucent
          backgroundColor="transparent"
        />
         <Modal
          visible={speakerDetailData?.isLoading}
          transparent={true}
          animationType="fade"
        >
          <View style={{flex:1,justifyContent: 'center', alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{width:wp(25),height:hp(12.5),backgroundColor: 'white',borderRadius:hp(1),justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#cdcdcd" />
          </View>
          </View>
        </Modal>
        <View style={{flex: 0.15}}>
          <MainHeader
            text={'Profile'}
            onpressBtn={() => props.navigation.goBack()}
          />
        </View>
        <View style={{flex:0.08}}></View>
        <View style={{flex: 0.31}}>
          <View
            style={{
              flex: 0.66,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor:'green'
            }}>
            <View style={{flex: 0.3}}></View>
            {/* <View style={{height:hp(3),width:wp(6),backgroundColor:colors.lightBlue,zIndex:1,position:'absolute',left:hp(29.5),top:hp(11),borderRadius:hp(50),justifyContent:'center',alignItems:'center'}}>
                <Icon type='solid' name='pen' size={hp(1.6)} color='white' />
            </View> */}
            <View style={{flex: 0.31,borderRadius:hp(50),borderColor:'#cdcdcd',borderWidth:1}}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: hp(0),
                  borderRadius: hp(50),
                }}
                source={{uri:item?.image_name}}
                resizeMode="contain"
              />
            </View>
  
            <View style={{flex: 0.3}}></View>
          </View>
          <View
            style={{
              flex: 0.33,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: hp(0.5),
              // backgroundColor:'green'
              
            }}>
            <Text
              style={{
                color: colors.descBlack,
                fontSize: hp(2.6),
                fontWeight: 'bold',
                fontFamily: fontFamily.robotoBold,
              }}>
              {item&& item?.speaker_name || item?.first_name}
            </Text>
            <Text
              style={{
                color: colors.grayDescColor,
                fontSize: hp(2),
                fontWeight: '400',
                fontFamily: fontFamily.robotoMedium,
              }}>
              {item && item?.designation || item?.last_name}
            </Text>
          </View>
        </View>
        
        <View
          style={{
            flex:0.7,
            marginHorizontal: hp(2.5),
            justifyContent: 'center',
            marginVertical: hp(0),
            flexDirection: 'row',
            // alignItems: 'center',
            // backgroundColor:'green'
          }}>
            <ScrollView>
            <RenderHtml
                  contentWidth={400}
                  source={{
                    html: item && item
                      ? '<p>' + item?.speaker_detail + '</p>'
                      : '',
                  }}
                  stylesheet={{color: 'blue'}}
                  tagsStyles={tagsStyles}
                />
                </ScrollView>
        </View>
  
     
      </View>
    );
  };
  
  export default SpeakerProfile;
  
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
    tagsStyles: {
      color: '#292D32',
    },
  });
  

 