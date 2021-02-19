import React, { Fragment, useState, useEffect } from 'react'
import _ from 'lodash';
import {firebase,dbh} from "../../firebase";
import "firebase/firestore";




import {
  StyleSheet, Text, View, StatusBar, Dimensions,TouchableOpacity,
  FlatList,
  ScrollView, Image, Animated, SafeAreaView, Modal, Pressable, ActivityIndicator
} from 'react-native'
//import { colors } from 'theme'
import { LineChart} from "react-native-chart-kit";
//import { theme } from '../details/constants';
// import FontIcon from 'react-native-vector-icons/FontAwesome5'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


const { width, height } = Dimensions.get('window');
const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  ];
const data = [
  900000, 912000, 913000,917000,916000,921000
  ];
const data1 = [
  892000, 902000, 907000,915000,912000,918000
  ];
  
 
const styles1 = StyleSheet.create({
    
    memberImage: {
      height: 30,
      width: 30,
      marginRight:4,
      borderRadius:20,
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC"
    },
    
    groupMembersContent:{
      flexDirection:'row',
      marginTop:10
    }
  });
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: "gray",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  tab: {
    marginRight: 16 * 2,
    paddingBottom: 16
  },
  title: {
    fontSize: 24,
    marginTop: 20,
  },
  stitle: {
    fontSize: 12,
    color: '#a4a4a4',
  },
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:10,
    marginTop:5
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"rgba(52,209,184, 0.16)",
    padding: 10,
    flexDirection:'row',
    borderRadius:16,
  },
  card1:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"rgba(81,141,231, 0.2)",
    padding: 10,
    flexDirection:'row',
    borderRadius:16,
  },
  card2:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"rgba(231,189,81, 0.2)",
    padding: 10,
    flexDirection:'row',
    borderRadius:16,
  },

  name:{
    fontSize:12,
    color:"#000000",
    fontWeight:'bold'
  },
  count:{
    fontSize:10,
    color:"#979797"
  },
  
  flex: {
    flex: 1,
  },
  flex1: {
    flex: 1,
    alignItems: 'flex-end'
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  
  recommended: {
  },
  recommendedHeader: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
    marginVertical: 20 * 0.66
  },
  recommendedList: {
  },
  recommendation: {
    width: (width - (25 * 2)) / 1.2,
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  recommendation1: {
    width: (width - 50),
    marginHorizontal: 8,
    backgroundColor: '#f6f6f6',
    overflow: 'hidden',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16
  },
  recommendationHeader: {
    overflow: 'hidden',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  recommendationOptions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 25 / 2,
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    fontSize: 14 * 1.25,
    color: '#fff'
  },
  recommendationImage: {
    width: (width - (25 * 2)) / 1.2,
    height: (width - (25 * 2)) / 2,
  },
  
  
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  
  card3:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor:"rgba(52,209,184, 1)",
    padding: 5,
    flexDirection:'row',
    borderRadius:16,
    alignSelf: 'flex-end'
  },
  card5:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor:"rgba(52,209,184, 0.18)",
    padding: 5,
    flexDirection:'row',
    borderRadius:16,
    alignSelf: 'flex-end'
  },
  
  card4:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor:"#fff",
    padding: 5,
    flexDirection:'row',
    borderRadius:16,
    width: 140
  },
  card6:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor:"#35d1b9",
    paddingTop: 0,
    paddingRight: 9,
    paddingBottom: 7,
    flexDirection:'row',
    borderRadius:16,
    alignSelf: 'center'
  },
  card7:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    /* marginLeft: 20,
    marginRight: 20, */
    backgroundColor:"#c5c5c5",
    paddingTop: 0,
    paddingRight: 9,
    paddingBottom: 7,
    flexDirection:'row',
    borderRadius:16,
    alignSelf: 'center'
  },
  count:{
    fontSize:12,
    alignSelf:'flex-start',
    color:"#1f2123",
    paddingLeft: 5
  },
  count1:{
    fontSize:12,
    alignSelf:'flex-end',
    color:"#960303",
    paddingLeft: 10,
    marginRight: 5
  },
  cardHeader: {
    flex: 1,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignContent:"space-between", 
    justifyContent:"space-between"
  },
  centeredView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  buttonClose: {
    backgroundColor: "rgba(52,209,184, 0.86)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

const imgs1 = [
  {
    id:3,
    members:[
      "https://i.cbc.ca/1.1688376.1379083887!/httpImage/image.jpg_gen/derivatives/16x9_780/hi-unemployed.jpg", 
      "https://www.cbre.us/-/media/cbre/countryunitedstates/media/images/pr-stock-images/pr-image-04.jpg", 
      "https://hughesmarino.com/wp-content/uploads/San-Diego-downtown-dusk.jpg",
      "https://cdn-res.keymedia.com/cms/images/ca/046/0348_637250306371916023.jpg"
    ]
  }
]
const imgs2 = [
  {
    id: 4,
    members: [
      "https://www.greenwoodswim.com/mabutap/3250/Marijuana-Kamloops-British-Colombia-Canada-5e72a9c9d4bdc.jpg",
      "https://www.chatelaine.com/wp-content/uploads/2017/01/Morin_Library_credit_Patrick_Matte-1.jpg",
      "https://images.adsttc.com/media/images/595b/9b16/b22e/386b/ae00/011e/newsletter/007-_Perkins_Will_Albion_Library.jpg",
      "https://cdn.renewcanada.net/wp-content/uploads/2017/12/22144736/manitoba-government.jpg"
    ]
  }
]
const imgs3 = [
  {
    id: 5,
    members: [
      "https://constructionreviewonline.com/wp-content/uploads/2020/11/image3.jpg",
      "https://loveincorporated.blob.core.windows.net/contentimages/gallery/39f51006-18b2-4e24-9a94-52e8a4dc05b8-shutterstock_521094097.jpg",
      "https://www.thespruce.com/thmb/pIk77UlWUgSY2VGy2yHvKclVYZU=/2121x1193/smart/filters:no_upscale()/Family-home-renovation-GettyImages-513438249-58a0e0803df78c4758055c1a.jpg",
      "https://www.refreshrenovations.global/images/uploads/plan-hero.jpg"
    ]
  }
]

// const testIDs = require('./testIDs');


const loadItems = (day) => {
  setTimeout(() => {
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            name: 'Item for ' + strTime + ' #' + j,
            height: Math.max(50, Math.floor(Math.random() * 150))
          });
        }
      }
    }
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
    this.setState({
      items: newItems
    });
  }, 1000);
}
const mocks = []

let startDate = ''

const ReportScreen = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const [shouldShow1, setShouldShow1] = useState(false);
  const [shouldShow2, setShouldShow2] = useState(false);
  const [shouldShow3, setShouldShow3] = useState(false);
  const [shouldShow4, setShouldShow4] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [NoDateSelected, nowSelected] = useState(true);
  const [selected, setSelected] = useState('');
  const [selected1, setSelected1] = useState('');
  const [dateSelected, setDate] = useState(false);
  const [dateSelected1, setDate1] = useState(false);
  

  const [loading, setLoading] = useState(true); 
  const [users, setUsers] = useState([]); 
  const [userData, setUserData] = useState('')
  const[userProperties, setProperties] = useState([])
  const[community, setCommunities] = useState([])

  useEffect(() => {
    const subscriber = dbh
      .collection('Economics/Country/EconomicIndicator')
      .onSnapshot((querySnapshot) => {
        const users = [];

      querySnapshot.forEach(documentSnapshot => {
        users.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setUsers(users);
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  useEffect(() => {
    const subscriber1 = dbh
      .collection('Economics/Toronto/EconomicIndicator')
      .onSnapshot((querySnapshot) => {
        const users1 = [];

      querySnapshot.forEach(documentSnapshot => {
        users1.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      //setUsers(users =>[...users, users1]);
      setUsers(users => users.concat(users1))
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber1();
  }, []);

  useEffect(() => {
    const userData1 = dbh
      .collection('UserDetails/26P9zBdu34c5UvE2OffJkRSIkgZ2/Property')
      .onSnapshot((querySnapshot) => {
        let userData2 = '';

        querySnapshot.forEach(documentSnapshot => {
          let b = documentSnapshot.data()
          let street = b.streetName
          let streetNumber = b.streetNumber
          let address = streetNumber + ' ' + street
          userData2 = address
        });
        
      
      
      setUserData(userData2)
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => userData1();
  }, []);
  useEffect(() => {
    const userProperty1 = dbh
      .collection('UserDetails/26P9zBdu34c5UvE2OffJkRSIkgZ2/Property')
      .onSnapshot((querySnapshot) => {
        let userProperty2 = [];

        querySnapshot.forEach(documentSnapshot => {
          userProperty2.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        
      
      
      setProperties(userProperty2)
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => userProperty1();
  }, []);
  useEffect(() => {
    const community1 = dbh
      .collection('Community/Ajax/Carruthers Creek')
      .onSnapshot((querySnapshot) => {
        const communities2 = [];

      querySnapshot.forEach(documentSnapshot => {
        communities2.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });

      setCommunities(communities2)
      setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => community1();
  }, []);


  const onDayPress = day => {
    setSelected(day.dateString);
    setDate(!dateSelected);
    startDate = day.dateString
    console.log('start date:' + startDate)
  };
  const { destinations } = mocks;
  let dateOne = '2021-02-14'
  let dateTwo = '2021-02-18'
  
  if (loading) {
    return <ActivityIndicator />;
  }
  
  return (
    
    <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '0' }}
        >

      <View style={styles.root}>
        
      <StatusBar barStyle="light-content" />
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingStart: 20, paddingEnd:20, paddingTop: 10}}>
      <View style={{flexDirection: 'column'}}>
      <Text style={styles.title}>{userData}</Text>
      <Text style={styles.stitle}>Last Updated at 12/28/2020.</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
      
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignItems: 'center'}}>
            <View style={{paddingTop: 0}}>
            {/* <FontIcon
                    name="caret-down"
                    color= '#35d1b9'
                    size={40}
                    solid
                  /> */}
            </View>
            </View>
            </Pressable>
        </View>
        
         
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {modalVisible ? (
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          //presentationStyle={overFullScreen}
          
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.name, {marginTop:5, marginBottom:5}]}>Select Property</Text>
              <FlatList
                  data={userProperties}
                  renderItem={({ item }) => (
                    <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                    <Text style={styles.textStyle}>{item.streetNumber} {item.streetName}</Text>
                      </Pressable>
                    </View>
                  )}
                />
              
            </View>
          </View>
        </Modal>
        ):null}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingStart: 20, paddingEnd:20, paddingTop: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Propzi Price</Text>
        <TouchableOpacity style={{alignContent: 'flex-end'}}  onPress={() => setShouldShow3(!shouldShow3)}>
        <View style={{height: 30, width:88, backgroundColor: '#f2f2f2'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingStart: 15, paddingEnd:15, paddingTop: 7}}>
            <Text style={{fontSize:12, color: '#000', paddingLeft:0}}>Date</Text>
            {/* <FontIcon
                    name="chevron-down"
                    color= '#000000'
                    size={12}
                    solid
                  /> */}
              </View>
        </View>
        </TouchableOpacity>
        
        </View>
        {shouldShow3? (
          
          <View style={{flex: 1, alignContent: 'center'}}>
            {NoDateSelected? (
              <TouchableOpacity onPress={() => nowSelected(!NoDateSelected)}>
                  <Fragment>
                 <Calendar
                 //markingType={'period'}
                 current={'2020-02-02'}
                 testID={testIDs.calendars.FIRST}
                 hideArrows={false}
                //  renderArrow={(direction) => (<FontIcon
                //    name="caret-right"
                //    color= '#35d1b9'
                //    size={40}
                //    solid
                //  />)}
                 onDayPress={onDayPress}
                 markingType={'period'}
                 markedDates={{
                   [selected]: {
                     selected: true,
                     disableTouchEvent: true,
                     selectedColor: '#70d7c7',
                     selectedTextColor: 'white'
                   },
                   '2021-02-14': {marked: true, startingDay: true, color: '#50cebb', textColor: 'white'},
                   '2021-02-15': {marked: true, color: '#70d7c7', textColor: 'white'},
                   '2021-02-16': {marked: true, color: '#70d7c7', textColor: 'white'},
                   '2021-02-17': {marked: true, endingDay: true, color: '#50cebb', textColor: 'white'},
                 }}
                 
                 onPressArrowLeft={subtractMonth => subtractMonth()}
                 // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                 onPressArrowRight={addMonth => addMonth()}
                 // Disable left arrow. Default = false
                 //onDayPress={(day) => {console.log('selected day', day.dateString)}}
                 enableSwipeMonths={true}
               />
                 </Fragment>
               
              </TouchableOpacity>
                 
            ):null}
           
          </View> 
        ): 
        <View>
          <Text style={{fontSize:10, color: '#979797', paddingLeft:3}}>You have selected your start date as: {selected}</Text>
        </View>
        }
      
      {shouldShow4 ? (
        <TouchableOpacity onPress={() => setShouldShow4(!shouldShow4)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingStart: 50, paddingEnd:50, paddingTop: 20}}>
          <View style={{flexDirection: 'row', alignSelf: 'flex-start', alignContent: 'flex-start'}}>
          {/* <FontIcon
                name="circle"
                color= '#35d1b9'
                size={10}
                solid
              /> */}
             <Text style={{fontSize:10, color: '#35d1b9', paddingLeft:3}}>6336 Culmore Cres</Text>      
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'flex-end', alignContent: 'flex-end'}}>
          {/* <FontIcon
                name="circle"
                color= '#979797'
                size={10}
                solid
              /> */}
            <Text style={{fontSize:10, color: '#979797', paddingLeft:3}}>Avg. Market Price</Text>
          </View>
         
          
      </View>
      
          <View style= {{marginTop: 20}}>
        <LineChart
                  data={{
                    labels: labels,
                    datasets: [
                      {
                        data: data,
                        color: (opacity = 1) => `rgba(94, 229, 208, 1)`, // optional
                        strokeWidth: 2 
                      },
                      {
                        data: data1,
                        color: (opacity = 1) => `rgba(151, 151, 151, 1)`, // optional
                        strokeWidth: 2 
                      }
                    ],
                  }}
                  width={Dimensions.get('window').width - 10} // from react-native
                  height={220}
                  //withHorizontalLabels = {false}
                  withDots = {false}
                  withInnerLines = {false}
                  withOuterLines = {false}
                  yAxisLabel="$"
                  yAxisInterval={2}
                  chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#FFF',
                    decimalPlaces: 0, // optional, defaults to 2dp
                    useShadowColorFromDataset: false, // optional,
                    color: (opacity = 0) => `rgba(0, 256, 256, ${opacity})`,
                    labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 30,
                    },
                    propsForDots: {
                      r: '0',
                      strokeWidth: '0',
                      stroke: '#35d1b9',
                    },
                    
                    
                  }}
                  //bezier
                  style={{
                    marginVertical: 5,
                    borderRadius: 15,
                  }}
                  renderDotContent={({ x, y, index }) => {
                    return (
                      <View
                        style={{
                          height: 24,
                          width: 24,
                          backgroundColor: "#abc",
                          position: "absolute",
                          top: y - 36, // <--- relevant to height / width (
                          left: x - 12, // <--- width / 2
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>{data[index]}</Text>
                      </View>
                    );
                  }}
                />
                <View style={[ styles.flex1, styles.row, styles.recommendationOptions ]}>
                
                <View style={[styles.card5, {marginLeft: width - 200}]}>
                  
                    <Text style={{color: '#303030', fontSize: 12}}>$921000</Text>
                    <Text style={{color: '#2cde49', fontSize: 10}}>+1.35%</Text>
                  
                  </View>
              </View>
        </View>
          
        </TouchableOpacity>

       
      ): 
      <TouchableOpacity onPress={() => setShouldShow4(!shouldShow4)}>
      <View style= {{marginTop: 20}}>
      <LineChart
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: data,
                      color: (opacity = 1) => `rgba(94, 229, 208, 1)`, // optional
                      strokeWidth: 2 
                    },
                    {
                      data: data1,
                      color: (opacity = 1) => `rgba(151, 151, 151, 1)`, // optional
                      strokeWidth: 2 
                    }
                  ],
                }}
                width={Dimensions.get('window').width - 10} // from react-native
                height={180}
                //withHorizontalLabels = {false}
                withDots = {false}
                withInnerLines = {false}
                withOuterLines = {false}
                yAxisLabel="$"
                yAxisInterval={2}
                chartConfig={{
                  backgroundColor: '#fff',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#FFF',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  useShadowColorFromDataset: false, // optional,
                  color: (opacity = 0) => `rgba(0, 256, 256, ${opacity})`,
                  labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 30,
                  },
                  propsForDots: {
                    r: '0',
                    strokeWidth: '0',
                    stroke: '#35d1b9',
                  },
                  
                  
                }}
                //bezier
                style={{
                  marginVertical: 5,
                  borderRadius: 15,
                }}
                renderDotContent={({ x, y, index }) => {
                  return (
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        backgroundColor: "#abc",
                        position: "absolute",
                        top: y - 36, // <--- relevant to height / width (
                        left: x - 12, // <--- width / 2
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>{data[index]}</Text>
                    </View>
                  );
                }}
              />
              <View style={[ styles.flex1, styles.row, styles.recommendationOptions ]}>
              
              <View style={[styles.card5, {marginLeft: width - 200}]}>
                
                  <Text style={{color: '#303030', fontSize: 12}}>$921000</Text>
                  <Text style={{color: '#2cde49', fontSize: 10}}>+1.35%</Text>
                 
                </View>
            </View>
      </View>

 
      </TouchableOpacity>
      
      }
      <View style={{marginStart: 20, marginTop:10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Report</Text>
      </View>
           <ScrollView horizontal={true} style={{marginTop: 10, marginStart:20}}>
             {shouldShow ? (
               <TouchableOpacity style={[styles.card6,  {marginBottom: 10}]} onPress={() => 
               {
                setShouldShow(!shouldShow)
                setShouldShow1(false)
                setShouldShow2(false)
               }}>
               <View style={styles.cardContent}>
               <Text style={styles.name}>Home Renovations</Text>
                 
               </View>
             </TouchableOpacity>
             ): 
             <TouchableOpacity style={[styles.card7,  {marginBottom: 10}]} onPress={() => {
              setShouldShow(!shouldShow)
              setShouldShow1(false)
              setShouldShow2(false)
             }}>
          <View style={styles.cardContent}>
          <Text style={styles.name}>Home Renovations</Text>
            
          </View>
        </TouchableOpacity>
             }

             {shouldShow1 ? (
                <TouchableOpacity style={[styles.card6,  {marginBottom: 10, marginLeft: 6}]} onPress={() => {
                  setShouldShow1(!shouldShow1)
                  setShouldShow(false)
                  setShouldShow2(false)
                }}>
                <View style={styles.cardContent}>
                <Text style={styles.name}>Economic Indicators</Text>
                  
                </View>
              </TouchableOpacity>
             ): 
             <TouchableOpacity style={[styles.card7,  {marginBottom: 10, marginLeft: 6}]} onPress={() => {
              setShouldShow1(!shouldShow1)
              setShouldShow(false)
              setShouldShow2(false)
             }}>
             <View style={styles.cardContent}>
             <Text style={styles.name}>Economic Indicators</Text>
               
             </View>
           </TouchableOpacity>
             }
           
           {shouldShow2 ? (
             <TouchableOpacity style={[styles.card6,  {marginBottom: 10, marginLeft: 6}]} onPress={() => {
              setShouldShow2(!shouldShow2)
              setShouldShow(false)
              setShouldShow1(false)
             }}>
             <View style={styles.cardContent}>
             <Text style={styles.name}>Neighbourhood Development</Text>
               
             </View>
           </TouchableOpacity>
           ):
           <TouchableOpacity style={[styles.card7,  {marginBottom: 10, marginLeft: 6}]} onPress={() => {
            setShouldShow2(!shouldShow2)
            setShouldShow(false)
            setShouldShow1(false)
           }}>
           <View style={styles.cardContent}>
           <Text style={styles.name}>Neighbourhood Development</Text>
             
           </View>
         </TouchableOpacity>
           }
        
        
           </ScrollView>
           
           <View style= {{marginTop: -10}}>
      {shouldShow ? (
          <View style={{flex: 1, justifyContent: 'space-between'}}>
          <TouchableOpacity style={[styles.card,  {marginBottom: 20}]} onPress={() => setShouldShow(!shouldShow)}>
          <View style={styles.cardContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text style={styles.name}>Home Renovations</Text>
              <Text style={styles.count}>Last updated on Dec 28th, 2020</Text>
              </View>
              <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
              <View style={{alignSelf: 'flex-end', width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'center', alignItems: 'center'}}>
              <View style={{paddingTop: 5}}>
              {/* <FontIcon
                      name="caret-right"
                      color= '#35d1b9'
                      size={40}
                      solid
                    /> */}
              </View>
              
              </View>
              </View>
            </View>
            
          </View>
        </TouchableOpacity>
            <View style={[styles.flex, styles.column, styles.recommended ]}>
            
            <View style={[styles.column, styles.recommendedList]}>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  scrollEventThrottle={16}
                  snapToAlignment="center"
                  style={{ overflow: 'visible', wid: (width - 50) }}
                  data={community}
                  keyExtractor={(item, index) => `${item.id}`}
                  renderItem={({ item, index }) => 
                  <View style={[
                    styles.flex, styles.column, styles.recommendation, 
                    index === 0 ? { marginLeft: 20 } : null,
                    // isLastItem ? { marginRight: 20 / 2 } : null,
                  ]}>
                    <View style={[styles.flex, styles.recommendationHeader]}>
                      <Image style={[styles.recommendationImage]} source={{ uri: item.img }} />
                      <View style={[ styles.flex1, styles.row, styles.recommendationOptions ]}>
                        
                        <View style={[styles.card3, {marginLeft: ((width - (25 * 2)) / 1.2) - 120, marginTop: 20}]}>
                            <Text style={styles.count}>{item.community}</Text>
                           
                          </View>
                      </View>
                    </View>
                    <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: 25 / 2 }]}>
                      <Text style={{ fontSize: 14 * 1.25, fontWeight: '500', paddingBottom: 25 / 4.5, }}>{item.heading}</Text>
                      <Text style={{ color: '#788490' }}>From: {item.dataSource}</Text>
                      <Text style={{ color: '#1f2123' }}>{item.description}</Text>
                      <View style={
                        { marginTop: 20 }
                      }>
                        <View style={styles.card4}>
                            <Text style={styles.count}>Propzi Impact:</Text>
                            <Text style={styles.count1}>{item.propziImpact}</Text>
                            
                          </View>
                      </View>
                    </View>
                  </View>
                  }
                />
              </View>
            </View>
        
        </View>
        ) : 
        <View >
              <TouchableOpacity style={[styles.card,  {marginBottom: 5}]} onPress={() => setShouldShow(!shouldShow)}>
              <View style={styles.cardContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
                  <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Text style={styles.name}>Home Renovations</Text>
                  <Text style={[styles.count]}>Last visited on 2 Feb 2021</Text>
                  <FlatList
                  data={imgs3}
                  keyExtractor={(item)=>{
                    return item.id;
                  }}
                  renderItem={(item) => {
                    const Group = item.item;
                    
                    return(
                      <View>
                        <View style={styles1.groupMembersContent}>
                          {Group.members.map((prop, key) => {
                            return (
                              <Image key={key} style={styles1.memberImage}  source={{uri:prop}}/>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }}/>

                  </View>
                  <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Text style={{alignItems: 'flex-end', paddingLeft: 45, alignSelf: 'flex-end', marginRight: 5, marginBottom: 5}}>{community.length} Updates</Text>
                    <View style={{ alignSelf: 'flex-end', paddingTop:5}}>
                    <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'flex-end', alignItems: 'center'}}>
              <View style={{paddingTop: 5}}>
              {/* <FontIcon
                      name="caret-down"
                      color= '#35d1b9'
                      size={40}
                      solid
                    /> */}
              </View>
              
              </View>
                    </View>
                    
                  </View>
                
                </View>
                
                
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                
                  <View style={{marginTop: -10, alignContent: 'flex-end', paddingLeft: 50}}>
              
              </View>
                </View>
                
              </View>
            </TouchableOpacity>
            </View>
        }
      </View>   

      <View style= {{marginTop: -10}}>
      {shouldShow1 ? (
          <View>
          <TouchableOpacity style={[styles.card1,  {marginBottom: 20}]} onPress={() => setShouldShow1(!shouldShow1)}>
          <View style={styles.cardContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text style={styles.name}>Economic Indicators</Text>
              <Text style={styles.count}>Last updated on Dec 28th, 2020</Text>
              </View>
              <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center'}}>
              <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'center', alignItems: 'center'}}>
              <View style={{paddingTop: 5}}>
              {/* <FontIcon
                      name="caret-right"
                      color= '#518de7'
                      size={40}
                      solid
                    /> */}
              </View>
              
              </View>
              </View>
            </View>
            
          </View>
        </TouchableOpacity>
        <ScrollView horizontal={true}>
          <View style={[styles.flex, styles.column, styles.recommended ]}>
            
            <View style={[styles.column, styles.recommendedList]}>
            <FlatList
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  scrollEventThrottle={16}
                  snapToAlignment="center"
                  style={{ overflow: 'visible', wid: (width - 50) }}
                  data={users}
                  keyExtractor={(item, index) => `${item.id}`}
                  renderItem={({ item, index }) => 
                  <View style={[
                    styles.flex, styles.column, styles.recommendation, 
                    index === 0 ? { marginLeft: 20 } : null,
                    // isLastItem ? { marginRight: 20 / 2 } : null,
                  ]}>
                    <View style={[styles.flex, styles.recommendationHeader]}>
                      <Image style={[styles.recommendationImage]} source={{ uri: item.img }} />
                      <View style={[ styles.flex1, styles.row, styles.recommendationOptions ]}>
                        
                        <View style={[styles.card3, {marginLeft: ((width - (25 * 2)) / 1.4) - 120, marginTop: 20}]}>
                            <Text style={styles.count}>{item.categoryIndicator}</Text>
                           
                          </View>
                      </View>
                    </View>
                    <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: 25 / 2 }]}>
                      <Text style={{ fontSize: 14 * 1.25, fontWeight: '500', paddingBottom: 25 / 4.5, }}>{item.indicator}</Text>
                      <Text style={{ color: '#788490' }}>From: {item.dataSource}</Text>
                      <Text style={{ color: '#1f2123' }}>{item.description}</Text>
                      <View style={
                        { marginTop: 20 }
                      }>
                        <View style={styles.card4}>
                            <Text style={styles.count}>Propzi Impact:</Text>
                            <Text style={styles.count1}>{item.propziImpact}</Text>
                            
                          </View>
                      </View>
                    </View>
                  </View>
                  }
                />
              </View>
            </View>
            
        </ScrollView>
        
        </View>
        ) : 
        <View>
              <TouchableOpacity style={[styles.card1,  {marginBottom: 0}]} onPress={() => setShouldShow1(!shouldShow1)}>
              <View style={styles.cardContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.name}>Econominc Indicators</Text>
                  <Text style={[styles.count]}>Last visited on 2 Feb 2021</Text>

                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FlatList
                  data={imgs1}
                  keyExtractor={(item)=>{
                    return item.id;
                  }}
                  renderItem={(item) => {
                    const Group = item.item;
                    
                    return(
                      <View>
                        <View style={styles1.groupMembersContent}>
                          {Group.members.map((prop, key) => {
                            return (
                              <Image key={key} style={styles1.memberImage}  source={{uri:prop}}/>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }}/>
                  
                </View>
                
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                  <Text style={{ alignSelf: 'flex-start', marginRight: 5, marginBottom: 5}}>{users.length} Updates</Text>
                  <View style={{ alignSelf: 'flex-end', paddingTop:5}}>
              <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'flex-end', alignItems: 'center'}}>
              <View style={{paddingTop: 5}}>
              {/* <FontIcon
                      name="caret-down"
                      color= '#518de7'
                      size={40}
                      solid
                    /> */}
              </View>
              
              </View>
              </View>
              
                </View>
                
                
                </View>
                
                
                
              </View>
            </TouchableOpacity>
            </View>
        }
      </View>   

      <View style= {{marginTop: -10}}>
      {shouldShow2 ? (
          <View>
          <TouchableOpacity style={[styles.card2,  {marginBottom: 20}]} onPress={() => setShouldShow2(!shouldShow2)}>
          <View style={styles.cardContent}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              <Text style={styles.name}>Neighbourhood Development</Text>
              <Text style={styles.count}>Last updated on Dec 28th, 2020</Text>
              
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
              <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'flex-end', alignItems: 'center'}}>
                <View style={{paddingTop: 5}}>
              {/* <FontIcon
                      name="caret-right"
                      color= '#e7bd51'
                      size={40}
                      solid
                    /> */}
              </View>
              
              </View>
              </View>
            </View>
            
          </View>
        </TouchableOpacity>
        <ScrollView horizontal={true}>
        <View style={[styles.flex, styles.column, styles.recommended ]}>
            
            <View style={[styles.column, styles.recommendedList]}>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  scrollEventThrottle={16}
                  snapToAlignment="center"
                  style={{ overflow: 'visible', wid: (width - 50) }}
                  data={community}
                  keyExtractor={(item, index) => `${item.id}`}
                  renderItem={({ item, index }) => 
                  <View style={[
                    styles.flex, styles.column, styles.recommendation, 
                    index === 0 ? { marginLeft: 20 } : null,
                    // isLastItem ? { marginRight: 20 / 2 } : null,
                  ]}>
                    <View style={[styles.flex, styles.recommendationHeader]}>
                      <Image style={[styles.recommendationImage]} source={{ uri: item.img }} />
                      <View style={[ styles.flex1, styles.row, styles.recommendationOptions ]}>
                        
                        <View style={[styles.card3, {marginLeft: ((width - (25 * 2)) / 1.4) - 120, marginTop: 20}]}>
                            <Text style={styles.count}>{item.community}</Text>
                           
                          </View>
                      </View>
                    </View>
                    <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: 25 / 2 }]}>
                      <Text style={{ fontSize: 14 * 1.25, fontWeight: '500', paddingBottom: 25 / 4.5, }}>{item.heading}</Text>
                      <Text style={{ color: '#788490' }}>From: {item.dataSource}</Text>
                      <Text style={{ color: '#1f2123' }}>{item.description}</Text>
                      <View style={
                        { marginTop: 20 }
                      }>
                        <View style={styles.card4}>
                            <Text style={styles.count}>Propzi Impact:</Text>
                            <Text style={styles.count1}>{item.propziImpact}</Text>
                            
                          </View>
                      </View>
                    </View>
                  </View>
                  }
                />
              </View>
        </View>
        </ScrollView>
        
        
        </View>
        ) : 
        <View>
              <TouchableOpacity style={[styles.card2,  {marginBottom: 20}]} onPress={() => setShouldShow2(!shouldShow2)}>
              <View style={styles.cardContent}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: (width - (25 * 2)) / 1.1}}>
                  <View style={{flexDirection: 'column', justifyConten: 'space-between'}}>
                  <Text style={styles.name}>Neighbourhood Development</Text>
                  <Text style={[styles.count]}>Last visited on 2 Feb 2021</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FlatList
                  data={imgs2}
                  keyExtractor={(item)=>{
                    return item.id;
                  }}
                  renderItem={(item) => {
                    const Group = item.item;
                    
                    return(
                      <View>
                        <View style={styles1.groupMembersContent}>
                          {Group.members.map((prop, key) => {
                            return (
                              <Image key={key} style={styles1.memberImage}  source={{uri:prop}}/>
                            );
                          })}
                        </View>
                      </View>
                    );
                  }}/>
                  
                </View>
                
                  </View>

                  <View style={{flexDirection: 'column', justifyConten: 'space-between', alignSelf: 'flex-end'}}>
                  <Text style={{alignItems: 'flex-end', alignSelf: 'flex-end', marginBottom: 5}}>{community.length} Updates</Text>
                  <View style={{alignSelf: 'flex-end'}}>
                    <View style={{width: 50, height: 50, borderRadius: 25, backgroundColor: '#f6f6f6', alignContent: 'center', alignItems: 'center'}}>
                    <View style={{paddingTop: 5}}>
                    {/* <FontIcon
                            name="caret-down"
                            color= '#e7bd51'
                            size={40}
                            solid
                          /> */}
                    </View>
              
              </View>
              </View>
              
                  </View>
                
                
                </View>
                
                
                
              </View>
            </TouchableOpacity>
            </View>
        }
      </View>   
             
         
      </View>
      </ScrollView>
  );
};

ReportScreen.defaultProps = {
  //navigation: { navigate: () => null },
 
}

export default ReportScreen
