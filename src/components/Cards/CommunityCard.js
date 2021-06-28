import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import {AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get("screen");
import { set } from "react-native-reanimated";
import { firebase, dbh } from "../../../firebase";



const CommunityCard = ({
  id,
  data,
  user
//   imgUrl,
//   isHigh = false,
//   title,
//   dataSource,
//   desc,
//   propziImpact,
//   category,
//   projectURL,
//   likeInfo,
}) => {
  const navigation = useNavigation();
const [Liked,setLiked] = useState(false)
const  [Disliked,setDisliked] = useState(false)
const [likes,setlikes] = useState(0)
const [dislikes,setdislikes] = useState(0)
const LikeIconSize = width*0.055
const search = (element) => element == user.uid;
useEffect(()=>{
  //check like info
  if(data.likeInfo.likedIds.findIndex(search)  > -1){
    setLiked(true)
  }

  if(data.likeInfo.dislikedIds.findIndex(search) > -1){
   setDisliked(true)
  }
  setlikes(data.likeInfo.likes)
  setdislikes(data.likeInfo.dislikes)
  console.log("data is: ",data)


},[])

const handleLike = ()=>{
  //like has been clicked
 if(!Liked){

  //make firebase call
  console.log("Like Clicked : " ,data.likeInfo.dislikedIds)
  //its the community collection
  let initialLikesArray = data.likeInfo.likedIds
  let initialDislikesArray = data.likeInfo.dislikedIds
  let fullDataObject = {...data}

  let updatedObject = {}
  initialLikesArray.findIndex(search) < 0 &&  initialLikesArray.push(user.uid)

  if(data.likeInfo.dislikedIds.findIndex(search) > -1){
   //had disliked before
   updatedObject.likedIds = initialLikesArray
   updatedObject.likes = data.likeInfo.likes + 1
  
   let indexOfDislike  = initialDislikesArray.findIndex(search)
   indexOfDislike == -1 ? console.log("indexOfDislike: ",indexOfDislike): delete initialDislikesArray[indexOfDislike]; 
   updatedObject.dislikes = data.likeInfo.dislikes - 1
   updatedObject.dislikedIds = initialDislikesArray
  }else{
    updatedObject.likedIds = initialLikesArray
    updatedObject.likes = data.likeInfo.likes + 1
  
  }
  console.log("Like Clicked : " ,updatedObject)
  console.log("Liked item id : " ,data.id)
//   dbh.collection("Communit").doc(data.id).update({likeInfo:updatedObject}).then(()=>{
//     setLiked(true)
//     setlikes(likes+1)
//     setDisliked(false)
    
   
//   })
 
//     setLiked(true)
//     setlikes(likes+1)
//     setDisliked(false)
//     setdislikes(dislikes<=0?0:dislikes-1)
 }
}



const handleDisLike = ()=>{
  // dislike has been clicked
 if(!Disliked){
  setDisliked(true)
  setdislikes(dislikes+1)
  setLiked(false)
  setlikes(likes<=0?0:likes-1)
 }
}

  return (
    <View

      style={styles.container}
    >
      <View>
      <TouchableOpacity
      onPress={() =>
        data.projectUrl && data.projectUrl !== ""
          ? navigation.navigate("WebView", { projectURL:data.projectUrl })
          : null
      }
    >
        <Image
          source={{ uri: data.cardImage }}
          style={[styles.image, { resizeMode: "cover" }]}
        />
        {console.log("the image url",data.cardImage)}
        <View style={styles.tag}>
          <Text style={styles.tagName}>{data.category}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{data.heading}</Text>
          <Text style={{ color: "#788490", marginBottom: 4, fontSize: 12 }}>
            From: {data.dataSource}
          </Text>
          <Text style={{ color: "#1f2123", fontSize: 13, lineHeight: 20 }}>
            {data.description?.substr(0, 89) + "..."}
            <Text style={{ color: colors.PRIMARY_COLOR }}>Read more</Text>
          </Text>
        </View>
        </TouchableOpacity>
        <View style={[styles.cardFooter,{justifyContent:"space-between"}]}>
        {data.propziImpact !== "" && data.propziImpact ? (
          <View style={[styles.propziImpactContainer,{flexDirection:"row"}]}>
            <Text style={styles.propziImpactTitle}>Propzi Impact:</Text>
            <Text
              style={[
                styles.propziImpact,
                { color: isHigh ? colors.PRIMARY_COLOR : "red" },
              ]}
            >
              {data.propziImpact}
            </Text>
          </View>
        ) : <View style={{flex:1}}></View>}
        <View style={styles.LikeContainer}>
          <TouchableOpacity onPress={handleLike} style={styles.likeIconConatiner}>
           {Liked ? <AntDesign name="like1" size={LikeIconSize} color="black" />:<AntDesign name="like2" size={LikeIconSize} color="black" />} 
           <Text style={styles.LikeText}>Like</Text>
           <Text  style={styles.LikeCount}>{likes}</Text>
          </TouchableOpacity>
       <TouchableOpacity onPress={handleDisLike} style={styles.likeIconConatiner}>
       {Disliked ? <AntDesign name="dislike1" size={LikeIconSize} color="black" />:<AntDesign name="dislike2" size={LikeIconSize} color="black" />}
       <Text style={styles.LikeText}>Dislike</Text>
       <Text  style={styles.LikeCount}>{dislikes}</Text>
       </TouchableOpacity>
       
        </View>
     
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "relative",
    // width: width * 0.7,
    // marginHorizontal: 20,
    // overflow: "hidden",
    // borderRadius: 16,
    // backgroundColor: "#f3f3f3",
    width:width - 32,
    backgroundColor:"white",
    borderRadius:17,
    alignSelf:"center",
    shadowColor:"#000",
    shadowOffset:{width:5,height:10},
    shadowOpacity:0.08,
    shadowRadius:16,
    justifyContent:"center",
    borderWidth:1,
    borderColor: 'rgba(158, 150, 158, .5)',
    elevation:8,
    marginHorizontal:16,
    marginBottom:25
  },

  likeIconConatiner:{
    justifyContent:"center",
    alignItems:"center"
  },
 LikeCount:{
  fontFamily:"Poppins-Medium",
  fontSize:12
 },
 LikeText:{
 fontFamily:"Poppins-Medium",
 fontSize:12,padding:"2%"
 },
  image: {
    width: "100%",
    height: (width - 25 * 2) / 1.7,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#f3f3f3",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  cardBody: {
    padding: 10,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 10,
  },

  cardFooter: {
    flexDirection:"row",
   justifyContent:"space-between",
   alignItems:"center",
   paddingHorizontal:16,
   paddingVertical:"8%"
  },

  propziImpactContainer:{
    flex:1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 16,
    width: width * 0.4,
    height: 30,
    alignItems: "center",
  },

  propziImpactTitle: {
    fontSize: 12,
  },

  propziImpact: {
    fontSize: 12,
    marginLeft: 5,
  },
  LikeContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"

  },
  tag: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: "absolute",
    top: 20,
    right: 14,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 50,
  },

  tagName: {
    fontSize: 12,
  },
});

export default CommunityCard;
