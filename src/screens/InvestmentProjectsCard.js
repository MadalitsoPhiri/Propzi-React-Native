import React,{useContext,useEffect,useState} from "react";
import {View,Text,StyleSheet, SafeAreaView, ScrollView,Dimensions,Image,TouchableWithoutFeedback} from "react-native";
import {AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { dbh } from "../../firebase/index"
import {Provider,useSelector,useDispatch} from "react-redux";

const {width,height} = Dimensions.get("window");
const CARD_HEIGHT = height * 0.4
const CARD_WIDTH = width * 0.6
const LIKE_BUTTON_SIZE = CARD_WIDTH * 0.09
const IMAGE_WIDTH = CARD_WIDTH - 1 // subtracting 1 becuase of the border width
const IMAGE_HEIGHT = "100%"
const imgUrl = "https://storage.googleapis.com/community_card_photos/DTAH_11-Wellesley-Street_Dr-Lillian-McGregor-Park_Toronto_North-Plaza.jpg"
const title = "Dr. Lillian McGregor Park"
const description = "A new park at 25 Wellesley St. W. will be a 1.6-acre L-shaped park bordered by Wellesey Streen west to the north dmfndjndjndfndjjdfjjdjdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
const dataSource = "from City of Toronto"
const testingData = {

}

const styles = StyleSheet.create({
        container:{
            backgroundColor:"white",
            borderRadius:17,
            shadowColor:"#000",
            shadowOffset:{width:5,height:10},
            shadowOpacity:0.08,
            shadowRadius:16,
            borderWidth:1,
            borderColor: 'rgba(158, 150, 158, .5)',
            width:CARD_WIDTH,
            height:CARD_HEIGHT,
            margin:12
        
        },
        cardBody:{
           flex:4 ,
           backgroundColor:"cyan",
           borderTopRightRadius: 17,
           borderTopLeftRadius: 17,
        },
        cardFooter:{
         flex:0.8,
         backgroundColor:"white",
         borderBottomRightRadius: 17,
         borderBottomLeftRadius: 17,
         justifyContent:"center",
         alignItems:"flex-start",
         paddingHorizontal:16
        },
        cardMiddle:{
           flex:1,
           backgroundColor:"white",
           paddingTop:10,
           paddingHorizontal:15, 
          
        },
        imageContainer:{
            flex:1,
            backgroundColor:"orange",
            borderTopRightRadius: 17,
            borderTopLeftRadius: 17,
            flexDirection:"row",
            justifyContent:"flex-end"
        },
        image:{
            resizeMode: "cover",
            borderTopRightRadius: 17,
            borderTopLeftRadius: 17,
        },
        categoryBadge:{
            borderRadius:17,
            maxWidth:CARD_WIDTH  *0.5,
            paddingHorizontal:10,
            paddingVertical:5,
            marginRight:"7%",
            marginTop:"7%",
            backgroundColor:'rgba(0,0,0, .6)',
            justifyContent:"center",
            alignItems:"center",
            alignSelf:"flex-start",
           
        },
        categoryBadgeText:{
            color:"white",
            fontSize:12
        },
        titleText:{
            color:"black",
            fontFamily:"Poppins-Medium"
        },
        sourceText:{
            color:"gray",
            fontSize:12,
            fontFamily:"Poppins-Regular",
            marginTop:"2%"
        },
        descriptionText:{
            color:"black",
            fontSize:10,
            fontFamily:"Poppins-Medium",
            marginTop:"2%"
        },
        likesText:{
            textAlign:"center",
            fontFamily:"Poppins-Medium",
            marginLeft:"5%",
            fontSize:12
        },
        likesContainer:{
           justifyContent:"space-between",
           alignItems:"center",
           flexDirection:"row"
        }

       
    })

const findIndex = (array,userId)=>{

}

export default InvestmentProjectsCard = ({data})=>{
    const [Likes,setLikes] = useState(0)
    const [Liked,setLiked] = useState(false)
    const [requesting,setRequesting] = useState(false)
    const {user} = useSelector((state)=>state.auth)
    const [likedIds,setLikedIds] = useState([])
    const navigation = useNavigation();
    const dummyArray = [user.uid]
    const indexCallback = (value)=>{
        return value == user.uid 
    }
    // const userLikeIndex = data.likeInfo.likedIds.findIndex(indexCallback)
    const handleUnlike = ()=>{
    //     let updateObject = {
    //         ...data.likeInfo
    //     }
    //     updateObject.likes  = data.likeInfo.likes === 0 ? 0 : data.likeInfo.likes - 1
    //     //remove the userid
        
     
          
            

    //         updateObject.likedIds = updateObject.likedIds.filter((item)=>{
    //             return item == user.id
    //         });

        
    //     console.log("UpdateObject",updateObject)
    //     console.log("item id:",data.id)
    //     console.log("likedIds : ", updateObject.likedIds)
    //     console.log("userindex:",userLikeIndex)
    //     setLiked(false)
    //     setRequesting(true)
    //     dbh.collection("Communit").doc(`${data.id}`).update({'likeInfo':updateObject}).then(()=>{
    //         setRequesting(false)
    //         // setLiked(false)
    //         // setLikes((prev)=>{
    //         //   return prev - 1  
    //         // }
            
    //         // )
    //         console.log("Success disliking")
           

            
    
    // }).catch((err)=>{
    //    console.log(err)
    // })
   
    }




    const handleLike = ()=>{
    //     let updateObject = {
    //         ...data.likeInfo
    //     }
    //     updateObject.likes  = data.likeInfo.likes  + 1
    //     //remove the userid
        
    //     if(userLikeIndex <= -1){
          
            

    //       updateObject.likedIds.push(user.uid)
    //     }
    //     console.log("UpdateObject",updateObject)
    //     console.log("item id:",data.id)
    //     console.log("likedIds : ", updateObject.likedIds)
    //     console.log("userindex:",userLikeIndex)
    //     setLiked(true)
    //     dbh.collection("Communit").doc(`${data.id}`).update({'likeInfo':updateObject}).then(()=>{

    //         // setLiked(false)
    //         // setLikes((prev)=>{
    //         //   return prev - 1  
    //         // }
            
    //         // )
    //         console.log("Success liking")
           

            
    
    // }).catch((err)=>{
    //     console.log(err)
    // })
    }




    // useEffect(()=>{
    //   // run code when card first mounts
    //   setLikes(data.likeInfo.likes)
    //   if(userLikeIndex >= 0){
    //     setLiked(true)
    //   }else{
    //       setLiked(false)
    //   }
    // },[])

    const handleLikeTapped = ()=>{
        //check if iiked 
        if(!requesting){
            if(Liked){

                handleUnlike()
            
            }else{
            //    setLiked(true)
            //    setLikes((prev)=>{
            //     return prev + 1 
            //   })
            handleLike()
            }
        }
      
    }
    return <View style={styles.container}>
        <TouchableWithoutFeedback
      onPress={() => console.log("clicked")
        // data.projectUrl && data.projectUrl !== ""
        //   ? navigation.navigate("WebView", { projectURL:data.projectUrl })
        //   : null
      }
    >
         <View style={styles.cardBody}>
                  <View style={styles.imageContainer}>
                  <Image source={{ uri: data.thumbnailUrl }}style={[StyleSheet.absoluteFill,styles.image]} />
                  <View style={styles.categoryBadge}>
                      <Text style={styles.categoryBadgeText} numberOfLines={1}>{data.status}</Text>
                  </View>
                  </View>
                  <View style={styles.cardMiddle}> 
                  <Text style={styles.titleText}>{data.title}</Text>
                  {/* <Text style={styles.sourceText} numberOfLines={2}>{data.dataSource}</Text> */}
                  <Text styles={styles.descriptionText}numberOfLines={4} ellipsizeMode='tail'>{data.caption}</Text>
                  </View>

         </View>
         </TouchableWithoutFeedback>
         <View style={styles.cardFooter}>
            {/* Here is where the like feature will live */}
            <TouchableWithoutFeedback onPress={handleLikeTapped}>
            <View style={styles.likesContainer}>
           
            {Liked ? <AntDesign name="heart" size={LIKE_BUTTON_SIZE} color="black" /> :<AntDesign name="hearto" size={LIKE_BUTTON_SIZE} color="black" />}
            
            <Text style={styles.likesText}>
                {/* {data.likeInfo.likes.toString()} */}
                0
            </Text>
            </View>
            </TouchableWithoutFeedback>
            
            
         </View>
    
             
    </View>
}
