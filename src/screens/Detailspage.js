import React from 'react';
import { StyleSheet, View, Text,Image,FlatList } from 'react-native';
import { Container, Header, Content, Tab, Tabs,ScrollableTab  } from 'native-base';

export default function Detailspage({route, navigation }) {
  const { item, otherParam } = route.params;
  // const images = item.images
  console.log('the single item data', item)
  return (
    <View>
      
      {/* <Text>Details page</Text> */}
      <Image source={{uri: `https://cdn.repliers.io/${item.images[1]}`}}  style={{ width: "100%",
    height:150,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#f3f3f3",
  }} />

      <Text style={{fontWeight:'bold',color:'#35d1b9',marginTop:10,marginBottom:1,marginLeft:12,fontSize:15}}>{item.address.streetNumber} {item.address.streetName},  Unit {item.address.unitNumber}</Text>
      <Text style={{fontWeight:'bold',marginLeft:12,fontSize:15,marginBottom:20}}>{item.mlsNumber}</Text>
    
      {/* <Image source={require(props.imageUri)} /> */}
      
      <Tabs tabBarUnderlineStyle={{ backgroundColor: '#35d1b9'}} renderTabBar={()=> <ScrollableTab  />}>
          <Tab textStyle={{fontSize: 12, color:'black'}}  activeTextStyle={{fontSize: 12, color: "black"}} heading="Details">
            <View style={{marginTop:10}}>
<Text  style={{marginTop:3,marginBottom:3}}> Description:{item.details.description}</Text>
<Text  style={{marginTop:3,marginBottom:3}}> Days On The Market:{item.daysOnMarket}</Text>
<Text  style={{marginTop:3,marginBottom:3}}> Style:{item.details.style}</Text>
{/* <Text  style={{marginTop:3,marginBottom:3}}>Broker Name:{item.office}</Text> */}
<Text  style={{marginTop:3,marginBottom:3}}>Year Built:{item.details.yearBuild}</Text>
<Text style={{marginTop:3,marginBottom:3}}>Type:{item.type}</Text>


            </View>
          </Tab>
          <Tab  textStyle={{fontSize: 12, color:'black'}} activeTextStyle={{fontSize: 12, color: "black"}} heading="Property Details">
          <View style={{marginTop:10}}>
          <Text  style={{marginTop:3,marginBottom:3}}>Property Type:{item.details.propertyType}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Patio:{item.details.patio}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>No of Rooms:{item.details.numRooms}</Text>
<Text style={{marginTop:3,marginBottom:3}}>No of Bedrooms:{item.details.numBedrooms}</Text>
<Text style={{marginTop:3,marginBottom:3}}>No of Bathrooms:{item.details.numBathrooms}</Text>
<Text style={{marginTop:3,marginBottom:3}}>Garage:{item.details.garage}</Text>
<Text style={{marginTop:3,marginBottom:3}}>Sqft:{item.details.sqft}</Text>
<Text style={{marginTop:3,marginBottom:3}}>Balcony:{item.details.balcony}</Text>
</View>
          </Tab>
          <Tab  textStyle={{fontSize: 12, color:'black'}} activeTextStyle={{fontSize: 12, color: "black"}} heading="Location">
          <View style={{marginTop:10}}>
          <Text style={{marginTop:3,marginBottom:3}}>Area:{item.address.are}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>City:{item.address.city}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Country:{item.address.country}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>District:{item.address.district}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Neighborhood:{item.address.neighborhood}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>State:{item.details.state}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Street Name:{item.details.streetName}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Street Number:{item.details.streetNumber}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Unit Number:{item.details.unitNumber}</Text>
          <Text style={{marginTop:3,marginBottom:3}}>Street Suffix:{item.details.streetSuffix}</Text>

          </View>
          </Tab>
      
        </Tabs>
    </View>
  )}