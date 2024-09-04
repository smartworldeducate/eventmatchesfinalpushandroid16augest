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
  ToastAndroid
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../Components/Headers/MainHeader';
import Icon from 'react-native-fontawesome-pro';
import {speakerDetailHandler} from '../features/speakerDetail/speakerDetailSlice';
import { registerActivityHandler } from '../features/registeractivity/registerActivitySlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../Styles/colors';
import fontFamily from '../Styles/fontFamily';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
const Profile = props => {
  const dispatch = useDispatch();
  const speakerDetailData=useSelector((state)=>state.speakerDetailState);
  const registerActivityData=useSelector((state)=>state.registerActivityState);
  // console.log("speakerDetaidetail==",speakerDetailData?.user?.response);

  // console.log("speakerDetaidetail==",speakerDetailData?.user?.response?.detail);
  const {item,event_id} = props.route.params;
  // console.log("item==",item);
  const [abstract, setAbstract] = useState(true);
  const [speaker, setSpeaker] = useState(false);
  const [resurces, setResurces] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [tabData, setTabData] = useState('');
  const [adminData, setAdminData] = useState(null);
// console.log("tabData===",tabData);
  const firstName = item?.first_name || '';
  const lastName = item?.last_name || '';
  
  // Get the first letter of each name
  const firstInitial = firstName?.charAt(0)?.toUpperCase();
  const lastInitial = lastName?.charAt(0)?.toUpperCase();
  
  // Combine the initials
  const avatarInitial = `${firstInitial}${lastInitial}`;

  async function getSessionData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setAdminData(parsedData);
        // dispatch(speakerDetailHandler({"user_id":parsedData?.login_id}));
          dispatch(speakerDetailHandler({"user_id":parsedData?.login_id}));
        
      } 
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useEffect(() => {
    getSessionData('userSession');
  }, []);

  const getTabData = (tabName) => {
    // Fetch data from your detail object based on the tabName
    return speakerDetailData?.user?.response?.detail?.[tabName];
  }
  const handleTabClick = (tabName) => {
    console.log("activeTab===",tabName);
    setActiveTab(tabName);
    // Fetch data for the selected tab
    const newData = getTabData(tabName); // Implement this function to fetch data based on tabName
    setTabData(newData);
  }

  const registerActivityFunction=(item)=>{
    const requestData = {
      "activity_id": item?.activity_id,
      "admin_id": adminData?.user_id,
      "user_id": adminData?.login_id,
      "event_id": adminData?.event_id,
    };
    if (item?.is_registered === 'Y') {
      requestData.status = 'N';
    }
      dispatch(registerActivityHandler(requestData));
   }

   const data = [
    { id: 1, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/371_1.jpg' },
    { id: 2, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/369_1.jpg' },
    { id: 3, image: 'https:\/\/app.eventmatches.com\/admin\/uploads\/speakers\/370_1.jpg' },

  ];

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

  const renderItemthree = ({item, index}) => {
    return (
      <TouchableOpacity onPress={()=>props.navigation.navigate('Session',{item})} style={{ flex: 0.19, borderRadius: hp(3), borderWidth:0.5, borderColor: '#cdcdcd', flexDirection: 'row',marginTop:hp(1.5) }}>
        <View style={{ flex: 0.45, height: hp[(5)] }}>
          {/* banertwo */}
          <Image
            style={{ width: '100%', height: '100%', paddingTop: hp(2), borderBottomLeftRadius: hp(2), borderTopLeftRadius: hp(2) }}
            source={{ uri:'banertwo'}}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 0.55 }}>
          <View style={{ marginHorizontal: hp(1.5), marginVertical: hp(1.5) }}>
            <Text style={{ color:colors.lightBlack, fontWeight: '500', fontSize: hp(2),fontFamily:fontFamily.robotoMedium }} ellipsizeMode={'tail'} numberOfLines={1}>{item?.activity_name}</Text>
            <Text style={{ color: 'gray', fontWeight: '300',fontFamily:fontFamily.robotoLight,fontSize: hp(2) }}>{item?.start_time} - {item?.end_time}</Text>
            <View style={{ marginTop: hp(0.7) }}>{}
              <Text style={{ color: colors.lightBlue, fontWeight: '500',fontFamily:fontFamily.robotoMedium,fontSize: hp(2) }}>{item?.activity_type}</Text>
            </View>
            <View style={styles.headerImageSection}>
              {data.slice(0, 7).map((item, i) => {

                return (
                  <TouchableOpacity

                    style={styles.imageList}
                    key={i}>
                    <Image
                      style={styles.imgStyle}
                      source={{ uri: item.image }}
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
                  <Text style={{ color: colors.lightBlack,fontFamily:fontFamily.robotoLight}}></Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.1 }}></View>
              <TouchableOpacity onPress={()=>registerActivityFunction(item)} style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4, borderRadius: hp(0.9), height: hp(5), marginTop: hp(-1.4), marginLeft: hp(-1), backgroundColor:item?.is_registered =='Y' ? '#555555':'#832D8E',height:hp(4),paddingHorizontal:hp(1) }}>
                <Text style={{ color: '#fff', fontWeight: '500',fontFamily:fontFamily.robotoLight,fontSize:hp(1.5)}}>{item?.is_registered == 'Y' ? 'Un-Register':'Register'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemProfile=({ item })=>{
  return(
    <View style={{marginBottom: hp(1.9)}}>
              <Text
                style={{
                  color: colors.blackColor,
                  fontSize: hp(1.9),
                  fontWeight: '400',
                  fontFamily: fontFamily.robotoBold,
                  paddingBottom:hp(0.5)
                }}>
               {item?.field_title}
              </Text>
              <Text
                style={{
                  color: colors.blackColor,
                  fontSize: hp(2),
                  fontWeight: 'bold',
                  fontFamily: fontFamily.robotoBold,
                }}>
                 {item?.field_value}
              </Text>
            </View>
            
  )}

  const renderItemSession=({ item })=>{
    // console.log("session profile--",item);
    return(
      <TouchableOpacity activeOpacity={8} onPress={()=>props.navigation.navigate('Session',{item})} style={{ flex: 0.19, borderRadius: hp(3), borderWidth:0.5, borderColor: '#cdcdcd', flexDirection: 'row',marginTop:hp(1.5) }}>
        <View style={{ flex: 0.45, height: hp[(5)] }}>
          {/* banertwo */}
          <Image
            style={{ width: '100%', height: '100%', paddingTop: hp(2), borderBottomLeftRadius: hp(2), borderTopLeftRadius: hp(2) }}
            source={{ uri:'banertwo'}}
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

                    style={styles.imageList}
                    key={i}>
                    <Image
                      style={styles.imgStyle}
                      source={{ uri: item.image }}
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
                  <Text style={{ color: colors.lightBlack,fontFamily:fontFamily.robotoMedium}}></Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.1 }}></View>
              <TouchableOpacity onPress={()=>registerActivityFunction(item)} style={{ justifyContent: 'center', alignItems: 'center', flex: 0.4, borderRadius: hp(0.9), height: hp(5), marginTop: hp(-1.4), marginLeft: hp(-1), backgroundColor:item?.is_registered =='Y' ? '#555555':'#832D8E',height:hp(4),paddingHorizontal:hp(1) }}>
                <Text style={{ color: '#fff', fontWeight: '500',fontFamily:fontFamily.robotoMedium,fontSize:hp(1.5)}}>{item?.is_registered == 'Y' ? 'Un-Register':'Register'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
              
    )
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
          onPress={()=>handleTabClick(item)}
          style={{
           
            paddingHorizontal:wp(4.5),
            borderRadius: hp(5),
            borderWidth: 1.5,
            borderColor: '#832D8E',
            height: hp(5),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft:hp(1.2),
            backgroundColor: activeTab === item  ? '#832D8E' : '#EBEEF2',
          }}>
          <Text
            style={{
              color: activeTab === item ? '#fff' : '#832D8E',
              fontSize: hp(1.8),
              fontWeight: 'bold',
              fontFamily: fontFamily.robotoBold,
            }}>
            {item}
          </Text>
        </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'default'}
        translucent
        backgroundColor="transparent"
      />
       <Modal
        visible={speakerDetailData?.isLoading || registerActivityData?.isLoading}
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
          text={'Attendees Details'}
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
          <View style={{flex: 0.31,height:hp(15),borderRadius:hp(50),backgroundColor:colors.lightBlue,justifyContent:'center',alignItems:'center'}}>
          <Avatar
                  size="large"
                  rounded
                  title={avatarInitial}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  titleStyle={{ color: '#fff',fontSize: hp(5.5)  }}
                />
            {/* <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: hp(0),
                borderRadius: hp(50),
              }}
              source={{uri:item?.image_name}}
              resizeMode="contain"
            /> */}
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
            {item?.first_name} {item?.last_name}
          </Text>
          <Text
            style={{
              color: colors.grayDescColor,
              fontSize: hp(2),
              fontWeight: '400',
              fontFamily: fontFamily.robotoMedium,
            }}>
            {item?.organization_name}
          </Text>
        </View>
      </View>
      
      <View
        style={{
          flex:0.12,
          marginHorizontal: hp(2.5),
          justifyContent: 'center',
          marginVertical: hp(0),
          flexDirection: 'row',
          alignItems: 'center',
          // backgroundColor:'green'
        }}>
           <FlatList
              data={speakerDetailData?.user?.response?.detail?.tabs}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
            />


        
      </View>

      
        <View style={{flex: 0.6, marginHorizontal: hp(3),marginTop:hp(0.8)}}>
        {tabData=='' && (
            <FlatList
              data={speakerDetailData?.user?.response?.detail?.Profile}
              renderItem={renderItemProfile}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}
        {activeTab !=="Sessions" && (
            <FlatList
              data={tabData && tabData}
              renderItem={renderItemProfile}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          )}

          {activeTab =="Sessions" && (
            <FlatList
              data={tabData && tabData}
              renderItem={renderItemSession}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        </View>
      

      {speaker && (
        <View style={{flex: 0.7, marginHorizontal: hp(3)}}>
          <View style={{justifyContent:'center',alignItems:'center',flex:0.1,height:hp(5)}}>
            <Text style={{color:colors.grayDescColor,fontSize:hp(2)}}>No Data Available.</Text>
          </View>
        
        </View>
      )}

      {resurces && (
        <View style={{flex: 0.7, marginHorizontal: hp(2.5)}}>
            <View style={{justifyContent:'center',alignItems:'center',flex:0.1,height:hp(5)}}>
            <Text style={{color:colors.grayDescColor,fontSize:hp(2)}}>No Data Available.</Text>
          </View>
          <FlatList
            data={speakerDetailData?.user?.response?.detail?.[2]?.[1]}
            renderItem={renderItemthree}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}

      <View style={{flex: 0.1, backgroundColor: '#fff'}}>
        {/* <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: hp(1),
          }}>
            
          <TouchableOpacity onPress={()=>{}} style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icon4'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        
          
          <TouchableOpacity onPress={()=>{}} style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icon3'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          
          <TouchableOpacity onPress={()=>{}} style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'iconone'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
          
            <TouchableOpacity onPress={()=>{}} style={{flex: 0.25}}>
            <Image
              style={{width: '100%', height: '100%', paddingTop: hp(2)}}
              source={{uri: 'icontwo'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          
        
        </View> */}
      </View>
    </View>
  );
};

export default Profile;

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
