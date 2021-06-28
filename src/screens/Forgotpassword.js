import React,{useState}from "react";
import {View,Text,TouchableOpacity,StyleSheet,TextInput,Dimensions} from "react-native";
import { MaterialCommunityIcons,Entypo,Ionicons} from '@expo/vector-icons';
import Loader from "../components/Loader";
import { firebase,dbh} from "../../firebase";

const {width} = Dimensions.get("window");

export default forgotpassword = ({navigation}) => {
   const [email,setEmail] = useState("")
   const [loading, setLoading] = useState(false)
   const [sent,setSent] = useState(false)
   const [sendingError,setSendingError] = useState(false)
    const styles = StyleSheet.create({
        heading: {
            fontSize:25,
            fontFamily:"Poppins-Bold",
            textAlign: "center",
            color:"#4F4F4F",
        },
        container:{
            paddingTop:"10%",
            flex:1,
            backgroundColor:"#fff",
            alignItems: "center"

        },
        paragraph: {
            fontSize:15,
            fontFamily:"Poppins-Medium",
            textAlign: "center",
            color:"#4F4F4F",
        },
        
        content:{
            marginTop:"10%",
            padding:"7%"
        },
        label: {
            marginBottom: 10,
            marginTop: 20,
            fontSize: 15,
            fontFamily:"Poppins-Medium"
          },
          input: {
            borderWidth: 3,
            borderColor: "#BDBDBD",
            borderRadius: 10,
            backgroundColor:"white",
            flexDirection:"row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          },
          sendButton:{
           borderRadius:20,
           paddingVertical:10,
           paddingHorizontal:40,
           backgroundColor:"#6FCF97",
           alignSelf:"center",
           marginTop:"10%",
          },
          sendButtonText:{
              color:"#fff",
              fontSize:16,
              fontFamily:"Poppins-Bold",

          },
          emailSentCheckMark:{
              width:width * 0.333333,
              alignSelf:"center",
          },
          ErrorText:{
              color:"red",
              fontFamily:"Poppins-Regular",
              fontSize:13,
              marginTop:"5%"
          }
    })

    const handleOnEmailChange = (e)=>{
           setEmail(e.toLowerCase())
    }
    const handleSendButton = (e)=>{
      // firebase operation to send forgot password email
      setSendingError(null)
      setLoading(true)
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
          //email sent 
          setLoading(false)
          setSent(true)

      }).catch((err)=>{
        setLoading(false)
        setSendingError(err)
      })
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: ({size}) =>(
           
                <TouchableOpacity onPress={() => navigation.goBack()}><Entypo name="chevron-with-circle-left" size={32} style={{ marginLeft: 20 }} color="#6FCF97"/></TouchableOpacity>
                          ),
        });
      }, [navigation]);


      if(loading){
        return <Loader text="sending..."/>;
       }

    return(<View style={styles.container}>
        
        { sent ?<View><Text style={styles.heading}>Email Sent</Text>
        <View style={styles.content}>
        <Ionicons name="checkmark-circle" size={width  * 0.3} color="lime" style={styles.emailSentCheckMark} />
        <Text style={[styles.paragraph,{marginTop:"8%"}]}>{`An Email has been sent to ${email}.Open it and click the link in the email follow the steps in safari or your default browser.`}</Text>
        <TouchableOpacity style={styles.sendButton} onPress={()=>{
            navigation.goBack()
        }}>
            <Text style={styles.sendButtonText}>
                Done
            </Text>
        </TouchableOpacity>
        </View></View>:<View><Text style={styles.heading}>Forgot your password?</Text>
        <View style={styles.content}>
        <Text style={styles.paragraph}>Enter the email address associated with your account</Text>
        <View>
        <Text style={styles.label}>Email Address</Text>
        <View style={[styles.input, { }]}>
      <MaterialCommunityIcons name="email-outline" size={25} color="#BDBDBD" style={{marginRight:"5%"}} />
      <TextInput
        placeholder={"Enter Email"}
        autoCorrect={true}
        onChangeText={handleOnEmailChange}
        value={email}
        style={{
          fontSize: 17,
          fontWeight: "500",
          fontFamily:"Poppins-Medium",
          color:"#4F4F4F",
          height:50,
          flex:1
        }}
      />
      
    </View>
       {sendingError ?<Text style={styles.ErrorText}>{sendingError.message}</Text>:null}
      </View>
        <Text style={[styles.paragraph,{marginTop:"8%"}]}>An Email will be sent to your email address.Open it and click the link in the email follow the steps in safari or your default browser.</Text>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendButton}>
            <Text style={styles.sendButtonText}>
                Send
            </Text>
        </TouchableOpacity>
        </View></View> }
         
        
       
    </View>);
}