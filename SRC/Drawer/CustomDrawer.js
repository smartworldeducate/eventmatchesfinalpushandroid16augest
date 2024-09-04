import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-fontawesome-pro';
import { StackActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Image } from 'react-native';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';
import {getAppVersionHandler } from '../features/getappversion/getAppVersionSlice';
import { getPrintBadgeHandler } from '../features/printerbadge/printerBadgeSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../Styles/colors';
const CustomDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [awatar,setAwatar]=useState('');
  const appVersionData=useSelector((state)=>state.appVersionState);
  const getPrintBadgeData=useSelector((state)=>state.getPrintBadgeState);
  // console.log("getPrintBadgeData===",getPrintBadgeData?.user?.response)
  const navigatorHandler=(screen,id)=>{
    navigation.navigate(screen,{"id":id});
    navigation.closeDrawer();
  }

  async function getData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        // console.log("login data===",parsedData);
        setData(parsedData);
       
        const firstName = parsedData?.first_name || '';
        const lastName = parsedData?.last_name || '';
        
        // Get the first letter of each name
        const firstInitial = firstName.charAt(0).toUpperCase();
        const lastInitial = lastName.charAt(0).toUpperCase();
        
        // Combine the initials
        const avatarInitial = `${firstInitial}${lastInitial}`;
        setAwatar(avatarInitial);
        console.log('here is drawer screen data===', parsedData);
      } else {
        console.log('No data found for key:', key);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  async function getSessionData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log('Data retrieved successfully:', value);
        const parsedData = JSON.parse(value);
        setAdminData(parsedData);
        dispatch(getPrintBadgeHandler({
          user_id: parsedData?.event_user_id,
          event_id: parsedData?.event_id,
          admin_id: parsedData?.user_id,
        }));
      } 
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  useEffect(() => {
    dispatch(getAppVersionHandler());
    // dispatch(getPrintBadgeHandler());
    getData('loginData');
    getSessionData('userSession');
  }, []);
  
  async function saveData() {
  //  console.log("logout")
      await AsyncStorage.removeItem("loginData");
      await AsyncStorage.removeItem("userSession");
      navigation.dispatch(StackActions.replace('SigninScreen'))
  }
 
  return (
    <>
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={['#832D8E', '#832D8E']}
        style={{ flex: 1 }}>
        <View
          style={{
            width: wp(90),
            marginHorizontal: hp(2.5),
            height: hp(10),
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: hp(3),
          }}>
          <View style={{ width: wp(70), height: hp(10) }}></View>
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
            }}
            style={{ width: wp(20), height: hp(10) }}>
            <View
              style={{
                color: '#fff',
                paddingTop: hp(5),
                paddingLeft: hp(7),
                fontSize: hp(3),
              }}>
              <Icon type="light" name="xmark" size={hp(3.5)} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginHorizontal: hp(5) }}>
          <View
            style={{
              width: wp(50),
              height: hp(7.9),
              flexDirection: 'row',
              marginHorizontal: hp(3),
              marginTop: hp(1),
            }}>
            <TouchableOpacity
            onPress={()=>navigatorHandler('Speaker')}
              style={{
                width: wp(18),
                height: hp(9),
                backgroundColor: '#58D68D',
                borderRadius: hp(50),
                marginRight: hp(3),
                borderWidth:1,
                borderColor:'#fff',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#FFF',
              }}>
                <Avatar
                  size="small"
                  rounded
                  title={awatar}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                  titleStyle={{ color: colors.lightBlue,fontSize: hp(3)  }}
                />
             
            </TouchableOpacity>
            <View style={{ marginLeft: hp(-2),marginTop:hp(1) }}>
              <View>
                <Text style={styles.username}>{data?.first_name} {data?.last_name}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: hp(0.5) }}>
                <View style={{ marginRight: hp(1) }}>
                  <View style={{ flexDirection: 'row', marginTop: hp(0) }}>
                    <View style={{ marginRight: hp(1) }}>
                      <Text style={styles.viewProfile}>{data?.email}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          <View style={[styles.listnameStyle, { marginTop: hp(4) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('AllEvents')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="calendar-star" size={hp(2.5)} color={'#fff'} />   
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(2)}]}>Events</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('SpeakerList','Y')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="user-tie" size={hp(2.5)} color={'#fff'}/>  
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.5)}]}> Speakers</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Exibitor')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="person-chalkboard"  size={hp(3.5)} color={'#fff'}/>   
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.1)}]}>Exhibitors</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Sponsor')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="clipboard-list-check"  size={hp(2.5)} color={'#fff'}/>   
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(2)}]}>Sponsors</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Attendees')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="users"  size={hp(3)} color={'#fff'}/>   
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.5)}]}>Attendees</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Qrcode')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="qrcode"  size={hp(2.5)} color={'#fff'}/>
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.8)}]}>Qr Code</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {adminData?.is_macher == 'Y' && (<View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Schedulemeeting')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="screencast"  size={hp(2.5)} color={'#fff'}/>
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.8)}]}>Meeting Schedule</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>)}
          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Matchmaking')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="window-restore"  size={hp(2.5)} color={'#fff'}/>
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.8)}]}>Matchmaking</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[styles.listnameStyle, { marginTop: hp(1.5) }]}>
            <TouchableOpacity
              onPress={() => navigatorHandler('Printbadge')}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="print"  size={hp(2.5)} color={'#fff'}/>
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.8)}]}>{getPrintBadgeData?.user?.response?.is_allowed=='Y' ? 'Print Badge':''}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.listnameStyle, { marginTop: hp(1.5),zIndex:9}]}>
            <TouchableOpacity
              onPress={saveData}>
              <View style={{ flexDirection: 'row', marginLeft: hp(3) }}>
                <View style={{}}>
                <Icon type='light' name="right-from-bracket"  size={hp(2.5)} color={'#fff'}/>
                </View>
                <View>
                <Text style={[styles.textlistStyle,{paddingLeft:hp(1.8)}]}>Logout</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={[styles.listnameStyle, { marginTop: hp(1.5),zIndex:9}]}>
            <View>
              <View style={{ flexDirection: 'row'}}>
                <View style={{}}>
                {/* <Icon type='light' name="right-from-bracket"  size={hp(2.5)} color={'#fff'}/> */}
                </View>
                <View>
                <Text style={{marginLeft:hp(3),color:'#fff'}}>Version:{appVersionData?.user?.response?.version}</Text>
                </View>
              </View>
            </View>
          </View>
          
            <View style={{zIndex:7,marginTop:hp(-2)}}>
              <View style={{ flexDirection: 'row'}}>
                <View>
                <Text style={{marginLeft:hp(3),fontSize:hp(1.5),color:'#fff'}}>{appVersionData?.user?.response?.version >= '1.04' ? appVersionData?.user?.response?.message :'' }</Text>
                </View>
              </View>
            </View>
          </View>
        
        <View style={{flex:0.32,flexDirection:'row'}}>
          <View style={{flex:0.4}}></View>
          <View style={{flex:0.6}}>
          <Image
            style={{ width: '100%', height: '100%', paddingTop: hp(5) }}
            source={{ uri: 'drawerimg' }}
            resizeMode="contain"
          />
          </View>
       
        </View>
      </LinearGradient>
    </>
  );
};

export default CustomDrawer;

const styles = EStyleSheet.create({
  username: {
    fontSize: '0.75rem',
    color: '#fff',
    fontWeight: 'bold',
    marginTop: hp(1),
    fontFamily: fontFamily.robotoBold,
    fontStyle: 'normal',
  },
  viewProfile: {
    fontSize: '0.4rem',
    color: '#FFF',
    fontSize: hp(1.5),
    fontWeight: '400',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
  },
  textlistStyle: {
    fontSize: '0.8rem',
    color: '#fff',
    fontWeight: '500',
    fontFamily: fontFamily.robotoMedium,
    fontStyle: 'normal',
    
  },
  listnameStyle: { width: wp(50), height: hp(5), marginTop: hp(1) },
  homeleft: { marginLeft: hp(0.5),flexDirection:'row',backgroundColor:'red'},
});
