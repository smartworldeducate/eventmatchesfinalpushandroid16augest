import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
  Linking
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderHtml from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheet } from '@rneui/themed';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MainHeader from '../Components/Headers/MainHeader';
import SessionParagraphText from '../Components/SessionParagraphText';
import {activityDetailHandler} from '../features/activitydetail/activityDetailSlice'
import Icon from 'react-native-fontawesome-pro';
import {color} from '@rneui/base';
import fontFamily from '../Styles/fontFamily';
import colors from '../Styles/colors';
import { useDispatch, useSelector } from 'react-redux';
const SessionProgramm = (props) => {
  const dispatch=useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isPoll, setIsPoll] = useState(false);
  const [data, setData] = useState('');
  const activityData=useSelector((state)=>state.acitivityState);
  const event_id=activityData?.user?.userData?.event_id;
  const {item} = props.route.params;
  const detailData=useSelector((state)=>state.activityDetailState);
    // console.log("detailData===",detailData?.user?.response?.success===1 ? 'salman':'umair');
    const urlData=detailData?.user?.response?.success===1 ? detailData?.user?.response?.detail[0] : '';
    // console.log("url===",urlData);
  const [abstract, setAbstract] = useState(true);
  const [speaker, setSpeaker] = useState(false);
  const [resurces, setResurces] = useState(false);
  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setData(parsedData);
        // console.log("session user==",parsedData)
        dispatch(activityDetailHandler({"event_id":parsedData?.event_id,"activity_id":item?.activity_id}));
        // console.log('user session data===', parsedData);
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }
  useEffect(() => {
    getData('userSession');
  }, []);

  const abstractHandler = () => {
    setAbstract(true);
    setSpeaker(false);
    setResurces(false);
  };
  const speakerHandler = () => {
    setAbstract(false);
    setSpeaker(true);
    setResurces(false);
  };
  const resucesHandler = () => {
    setAbstract(false);
    setSpeaker(false);
    setResurces(true);
  };

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
  const renderItem=({item,index})=>{
    // console.log("item resources==",item?.resources)
   if(abstract){
    return(
      <View>
         <RenderHtml
                  contentWidth={400}
                  source={{
                    html: item
                      ? '<p>' + item?.activity_desc + '</p>'
                      : '',
                  }}
                  stylesheet={{color: 'blue'}}
                  tagsStyles={tagsStyles}
                />
      </View>
    )
   }
   if(speaker){
    return (
      <View>
        {item.speakers.map((speaker, index) => (
          <View key={index}>
            <TouchableOpacity
            onPress={() => props.navigation.navigate("SpeakerProfile",{
              item: speaker
            })}
            style={{
            flex: 1,
            flexDirection: 'row',
            height: hp(8.5),
            borderRadius: hp(1),
            borderWidth: 0.5,
            borderColor: '#cdcdcd',
            marginVertical: hp(1.5),
          }}>
          <View
             style={{
               flex: 0.185,
               justifyContent: 'center',
               paddingLeft: hp(0.7),
               flexDirection:'row',
               justifyContent:'center',
               alignItems:'center'
             }}>
             <Image
               style={{ width: '90%', height: '90%', paddingTop: hp(0),borderRadius:hp(50) }}
               source={{ uri: speaker?.image_name }}
               resizeMode="contain"
             />
          </View>
          <View style={{justifyContent:'center',flex:0.64}}>
             <Text
               style={{
                 color: colors.blackColor,
                 paddingLeft: hp(1.5),
                 fontSize: hp(2),
                 fontWeight: '600',
                 fontFamily: fontFamily.robotoBold,
               }}>
               {speaker.speaker_name}
             </Text>
             <Text
               style={{
                 color: colors.grayDescColor,
                 fontSize: hp(2),
                 paddingLeft: hp(1.5),
                 fontWeight: '300',
                 fontFamily: fontFamily.robotoLight,
               }} numberOfLines={2} ellipsizeMode="tail">
               {speaker?.designation}
             </Text>
             </View>
             <View style={{flex:0.2,justifyContent: 'center',alignItems: 'center',}}>
               <View style={{backgroundColor:'#832D8E',paddingHorizontal:hp(1.5),paddingVertical:hp(0.5),borderRadius:hp(1)}}>
               <Icon
                  type="light"
                  name="arrow-right"
                  size={hp(3)}
                  color="#fff"
                />
               </View>
             </View>
           
         </TouchableOpacity>
          </View>
        ))}
      </View>
    );
    }
    if(resurces){
      return(<View style={{flex: 0.45, flexDirection: 'row',marginTop:hp(0),justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity
      onPress={()=>{}}
        style={{
          flex: 0.32,
          height:hp(13),
          // backgroundColor: '#2CC2E433',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: hp(0.5),
          // borderWidth:1,
          // borderColor:'#cdcdcd'
        }}>
          {/* <Image
               style={{ width: '90%', height: '90%', paddingTop: hp(0) }}
               source={{ uri: item?.resources?.image_name }}
               resizeMode="cover"
             /> */}
      </TouchableOpacity>
    </View>)
    }
  }
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
     
      <View style={{flex: 0.35}}>
        <ImageBackground
          source={{uri:item?.image_name_header}}
          style={{width: '100%', height: '100%'}} resizeMode='stretch'>
          <View style={{flex: 0.15, zIndex: 1}}></View>
          <View
            style={{flex: 0.2, marginHorizontal: hp(0), flexDirection: 'row',marginTop:hp(1)}}>
            <TouchableOpacity
            onPress={() => props.navigation.goBack()}
              style={{
                flex: 0.13,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop:hp(1.5)
              }}>
              <Icon type="light" name="arrow-left" size={hp(3)} color="#fff" />
            </TouchableOpacity>
            <View style={{flex: 0.7, justifyContent: 'center',marginTop:hp(1)}}>
              <Text
                style={{color: '#fff', fontSize: hp(2.5), fontWeight: '500',fontFamily:fontFamily.robotoBold}}>
                Session Details
              </Text>
            </View>
            <View style={{flex: 0.17, justifyContent: 'center',marginTop:hp(2)}}>
              <View
                style={{
                  width: hp(3.5),
                  height: hp(3.5),
                  backgroundColor: '#832D8E',
                  marginHorizontal: hp(1),
                  borderRadius: hp(1),
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}>
                <Icon type="light" name="bookmark" size={hp(2)} color="#fff" />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={{flex: 0.7, marginHorizontal: hp(2.5)}}>
        <ScrollView>
          {/* <SessionParagraphText/> */}

          <View style={{flex: 0.2, justifyContent: 'center',paddingTop:hp(1.5)}}>
            <Text
              style={{color:colors.grayDescColor, fontSize: hp(2.2), fontWeight: '400',fontFamily:fontFamily.robotoMedium}}
              numberOfLines={1}>
              Panel Discussion
            </Text>
            <Text
              style={{color:colors.descBlack, fontSize: hp(2.5), fontWeight: 'bold',fontFamily:fontFamily.robotoBold,paddingTop:hp(1),paddingBottom:hp(1.5)}}
              numberOfLines={2}>
              {item?.activity_name}
            </Text>
          </View>
          <View
            style={{flex: 0.25, marginTop: hp(1), justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', flex: 0.44}}>
              <View
                style={{
                  flex: 0.1,
                  backgroundColor:'#E5E7E9',
                  borderRadius: hp(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="regular"
                  name="calendar-check"
                  size={hp(2)}
                  color="#832D8E"
                />
              </View>
              <View style={{flex: 0.04}}></View>
              <View style={{flex: 0.75}}>
                <Text
                  style={{color:colors.descBlack, fontSize: hp(1.8), fontWeight: 'bold',fontFamily:fontFamily.robotoBold}}>
                  {item?.activity_date}
                </Text>
                <Text
                  style={{color:colors.descBlack, fontSize: hp(1.6), fontWeight: '400',fontFamily:fontFamily.robotoBold}}>
                  Tuesday, {item?.start_time} - {item?.end_time}
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', flex: 0.44, marginTop: hp(1.5)}}>
              <View
                style={{
                  flex: 0.1,
                  backgroundColor: '#E5E7E9',
                  borderRadius: hp(50),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  type="solid"
                  name="location-dot"
                  size={hp(2)}
                  color="#832D8E"
                />
              </View>
              <View style={{flex: 0.04}}></View>
              <View style={{flex: 0.75}}>
              <Text
                  style={{color:colors.descBlack, fontSize: hp(1.8), fontWeight: 'bold',fontFamily:fontFamily.robotoBold}}>
                  {/* Hall # 40 */}
                </Text>
                <Text
                  style={{color:colors.descBlack, fontSize: hp(1.6), fontWeight: '400',fontFamily:fontFamily.robotoBold}}>
                 {item?.state_name}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flex: 0.2,
              justifyContent: 'center',
              marginVertical: hp(2),
              flexDirection: 'row',
              alignItems: 'center',
              // backgroundColor:'red'
            }}>
            <TouchableOpacity
              onPress={abstractHandler}
              style={{
                flex: 0.33,
                borderRadius: hp(5),
                borderWidth: 1.5,
                borderColor: '#832D8E',
                height: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: abstract ? '#832D8E' : '#EBEEF2',
              }}>
              <Text
                style={{
                  color: abstract ? '#fff' : '#832D8E',
                  fontSize: hp(1.8),
                  fontWeight: 'bold',
                  fontFamily:fontFamily.robotoBold
                }}>
                Abstract
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={speakerHandler}
              style={{
                flex: 0.33,
                borderRadius: hp(5),
                borderWidth: 1.5,
                borderColor: '#832D8E',
                height: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: hp(1),
                backgroundColor: speaker ? '#832D8E' : '#EBEEF2',
              }}>
              <Text
                style={{
                  color: speaker ? '#fff' : '#832D8E',
                  fontSize: hp(1.8),
                  fontWeight: 'bold',
                  fontFamily:fontFamily.robotoBold
                }}>
                Speakers
              </Text>
              {/* <Text style={{color:'#832D8E',fontSize:hp(1.3),fontWeight:'300'}}>8th, Nov 2022</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resucesHandler}
              style={{
                flex: 0.33,
                borderRadius: hp(5),
                borderWidth: 1.5,
                borderColor: '#832D8E',
                height: hp(5),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: resurces ? '#832D8E' : '#EBEEF2',
              }}>
              <Text
                style={{
                  color: resurces ? '#fff' : '#832D8E',
                  fontSize: hp(1.8),
                  fontWeight: 'bold',
                  fontFamily:fontFamily.robotoBold
                }}>
                Resources
              </Text>
              {/* <Text style={{color:'#832D8E',fontSize:hp(1.3),fontWeight:'300'}}>8th, Nov 2022</Text> */}
            </TouchableOpacity>
          </View>
          {abstract && (
            <View style={{flex: 0.7}}>
              <View style={{flex:0.2,paddingBottom:hp(1)}}>
              <Text
              style={{
                color:colors.blackColor,
                fontSize: hp(2.5),
                fontWeight: '600',
                fontFamily:fontFamily.robotoBold
              }}>
                {detailData?.user?.response?.detail ? ' About Session': <Text
                  style={{
                    color:colors.grayDescColor,
                    fontSize: hp(2.5),
                    fontWeight: '600',
                    fontFamily:fontFamily.robotoBold,
                    fontStyle:'italic',
                    textAlign:'center'
                  }}>
                    No data available
                  
                </Text>}
             
            </Text>
            </View>
            <View style={{flex:0.8}}>
            <FlatList
              data={detailData?.user?.response?.detail}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
            </View>
          )}
          {speaker && (
            <View style={{flex: 0.7}}>
              <View style={{flex:0.2}}>
                <Text
                  style={{
                    color:colors.blackColor,
                    fontSize: hp(2.5),
                    fontWeight: '600',
                    fontFamily:fontFamily.robotoBold
                  }}>
                  {urlData?.speakers?.length > 0 ? 'Moderator:':<Text style={{color:colors.grayDescColor,fontSize:hp(2),textAlign:'center'}}>No data available</Text>}  
                  
                </Text>
              </View>
              <View style={{flex:0.8}}>
              <FlatList
              data={detailData?.user?.response?.detail}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
            </View>
          )}
          {resurces && (
            <View style={{flex: 0.7, height: hp(34)}}>
             
              {item?.presentation =='' && (
                <View style={{flex:0.2,justifyContent:'center',alignItems:'center'}}>
                <Text
                  style={{
                    color:colors.grayDescColor,
                    fontSize: hp(2),
                    fontWeight: '400',
                  }}>
                    No data available
                  
                </Text>
              </View>
              )}
               {item?.presentation !=='' && (
                
                <TouchableOpacity onPress={() => Linking.openURL(item?.presentation)} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Text style={{
                    fontSize: hp(2.5),
                    fontWeight: '600',
                    fontFamily: fontFamily.robotoBold,
                  }}>
                    <Text style={{ color: '#832D8E',fontWeight: '400', fontFamily: fontFamily.robotoMedium ,textDecorationLine: 'underline' }}>Click here</Text>
                    <Text style={{ color: 'black',fontWeight: '400', fontFamily: fontFamily.robotoMedium }}> to view the file</Text>
                  </Text>
                </TouchableOpacity>
              
              )}
             <FlatList
              data={detailData?.user?.response?.detail}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
            </View>
            
          )}
        </ScrollView>
      </View>
      
    </View>
  );

};

export default SessionProgramm;



const style=StyleSheet.create({
  tagsStyles: {
    color: '#292D32',
  },
})
