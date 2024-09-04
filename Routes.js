import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './SRC/Screens/Splash';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './SRC/Drawer/CustomDrawer';
import Icon from 'react-native-fontawesome-pro';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeScreen from './SRC/Screens/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NextScreen from './SRC/Screens/NextScreen';
import SigninScreen from './SRC/Screens/SigninScreen';
import SigninPassword from './SRC/Screens/SigninPassword';
import RegisterScreen from './SRC/Screens/RegisterScreen';
import AllEvents from './SRC/Screens/AllEvents';
import Exibitor from './SRC/Screens/Exibitor';
import PrevEvents from './SRC/Screens/PrevEvents';
import SessionProgramm from './SRC/Screens/SessionProgramm';
import Profile from './SRC/Screens/Profile';
import SpeakerList from './SRC/Screens/SpeakerList';
import Attendees from './SRC/Screens/Attendees';
import ExibitoeDetail from './SRC/Screens/ExibitoeDetail';
import Sponsor from './SRC/Screens/Sponsor';
import Scanner from './SRC/Screens/Scanner';
import MapScreen from './SRC/Screens/MapScreen';
import FeedBack from './SRC/Screens/FeedBack';
import { View } from 'react-native';
import Admins from './SRC/Screens/Admin';
import FutureEvents from './SRC/Screens/FutureEvent';
import Events from './SRC/Screens/Events';
import Qrcode from './SRC/Screens/Qrcode';
import colors from './SRC/Styles/colors';
import fontFamily from './SRC/Styles/fontFamily';
import Schedulemeeting from './SRC/Screens/Schedulemeeting';
import SpeakerProfile from './SRC/Screens/SpeakerProfile';
import Matchmaking from './SRC/Screens/MatchMaking';
import SearchMeeting from './SRC/Screens/SearchMeeting';
import Sechduleavailability from './SRC/Screens/SechduleAvailability';
import Confirmdecline from './SRC/Screens/Confirmdecline';
import Favroitmeeting from './SRC/Screens/Favroitmeeting';
import Shortlist from './SRC/Screens/Shortlist';
import Printbadge from './SRC/Screens/PrintBadge';
import Exibitornew from './SRC/Screens/Exibitornew';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {width: wp('100'), backgroundColor: '#E6E6E6'},
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeScreenDrawer" component={BottomTabApplication} />
      <Drawer.Screen name="SpeakerList" component={SpeakerList} />
      <Drawer.Screen name="Attendees" component={Attendees} />
    </Drawer.Navigator>
  );
}

// bottomvtab

const BottomTabApplication = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          elevation: 5,
          backgroundColor: '#fff',
          height: 55,
          marginBottom:hp(0),
          fontFamily:fontFamily .robotoLight,
          fontSize:hp(1.2)
        },
        tabStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          marginBottom: 1, // Adjust space between icon and label
        },
        labelStyle: {
          fontSize: hp(1.2), // Adjust label font size
          marginTop: 0,
          color:colors.grayDescColor // Optionally, adjust margin between icon and label
        },
        tabBarActiveTintColor: '#832D8E', 
        tabBarInactiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size,focused}) => (
            <Icon type='light' name="house" size={hp(3)} color={focused ? '#832D8E' : colors.grayDescColor} />
          ),
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: hp(1.8),
            fontWeight:'400',
            fontFamily:fontFamily.robotoLight
          },
        }}
      />
      <Tab.Screen
        name="Speaker"
        component={SpeakerList}
        options={{
          tabBarIcon: ({color, size,focused}) => (
            <Icon type='light' name="user-tie" size={hp(2.5)} color={focused ? '#832D8E' : colors.grayDescColor} />
          ),
          tabBarLabel: 'Speaker',
          tabBarLabelStyle: {
            fontSize: hp(1.8),
            fontWeight:'400',
            fontFamily:fontFamily.robotoLight
          },
        }}
        initialParams={{ apiIdentifier: 'mySessions' }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarIcon: ({color, size,focused}) => (
          <View style={[{
            marginBottom: hp(1),
            backgroundColor: '#832D8E',
            width: wp(16),
            height: hp(8),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: hp(50),
            // Shadow properties
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                },
                android: {
                    elevation: 5,
                },
            })
        }]}>
            <Icon type='light' name="qrcode" size={hp(4)} color={'#fff'} />
        </View>
          ),
          tabBarLabel: 'Scanner',
          tabBarLabelStyle: {
            fontSize: hp(1.8),
            color:'#fff',
            marginTop:hp(2.3),
           
          },
        }}
      />
       <Tab.Screen
        name="My Sessions"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size,focused}) => (
            <Icon type='light' name="clipboard-list-check" size={hp(2.5)} color={focused ? '#832D8E' : colors.grayDescColor} />
          ),
          tabBarLabel: 'My Sessions',
          tabBarLabelStyle: {
            fontSize: hp(1.8),
            fontWeight:'400',
            fontFamily:fontFamily.robotoLight
          },
        }}
        initialParams={{ apiIdentifier: 'mySessions' }}
      />
        <Tab.Screen
        name="Feedback"
        component={FeedBack}
        options={{
          tabBarIcon: ({color, size,focused}) => (
            <Icon type='light' name="message-smile" size={hp(2.5)} color={focused ? '#832D8E' : colors.grayDescColor}/>
          ),
          tabBarLabel: 'Feedback',
          tabBarLabelStyle: {
            fontSize: hp(1.8),
            fontWeight:'400',
            fontFamily:fontFamily.robotoLight
          },
        }}
      />
    </Tab.Navigator>
  );
};


const Routes = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Splash'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="SigninPassword" component={SigninPassword} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HomeScreen" component={DrawerStack} />
        <Stack.Screen name="Exibitor" component={Exibitor} />
        <Stack.Screen name="PrevEvents" component={PrevEvents} />
        <Stack.Screen name="Session" component={SessionProgramm} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ExibitoeDetail" component={ExibitoeDetail} />
        <Stack.Screen name="Sponsor" component={Sponsor} />
        <Stack.Screen name="AllEvents" component={AllEvents} />
        <Stack.Screen name="FeedBack" component={FeedBack} />
        <Stack.Screen name="Admins" component={Admins} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="FutureEvents" component={FutureEvents} />
        <Stack.Screen name="Events" component={Events} />
        <Stack.Screen name="Qrcode" component={Qrcode} />
        <Stack.Screen name="Schedulemeeting" component={Schedulemeeting} />
        <Stack.Screen name="SpeakerProfile" component={SpeakerProfile} />
        <Stack.Screen name="Matchmaking" component={Matchmaking} />
        <Stack.Screen name="SearchMeeting" component={SearchMeeting} />
        <Stack.Screen name="Sechduleavailability" component={Sechduleavailability} />
        <Stack.Screen name="Confirmdecline" component={Confirmdecline} />
        <Stack.Screen name="Favroitmeeting" component={Favroitmeeting} />
        <Stack.Screen name="Shortlist" component={Shortlist} />
        <Stack.Screen name="Printbadge" component={Printbadge} />
        {/* <Stack.Screen name="Testpdf" component={Testpdf} /> */}
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
