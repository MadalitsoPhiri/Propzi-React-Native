import React from 'react'
import { View, Text,TouchableOpacity,FlatList,Image } from 'react-native'
import {styles} from './cardStyle'

const ReportRectangleCard = ({
  onPress,
  imagesArray = [],
  arrowUrl,
  title,
  date,
  updates = 0,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { marginBottom: 5, backgroundColor: backgroundColor },
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.date]}>Last visited on {date}</Text>
            <FlatList
              data={imagesArray}
              keyExtractor={(item) => {
                return item.id;
              }}
              renderItem={(item) => {
                const Group = item.item;

                return (
                  <View>
                    <View style={styles.groupMembersContent}>
                      {Group.members.map((prop, key) => {
                        return (
                          <Image
                            key={key}
                            style={styles.memberImage}
                            source={{ uri: prop }}
                          />
                        );
                      })}
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <Text style={styles.updateText}>{updates} Updates</Text>
            <View style={styles.arrowContainer}>
              <Image source={arrowUrl} style={styles.arrow} />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportRectangleCard

// const styles = StyleSheet.create({
//   card: {
//     shadowColor: "#00000021",
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },

//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 12,

//     marginLeft: 20,
//     marginRight: 20,
//     marginTop: 20,
//     padding: 10,
//     flexDirection: "row",
//     borderRadius: 16,
//   },

//   cardContent: {
//     paddingHorizontal: 10,
//     marginTop: 5,
//     width: "100%",
//   },

//   arrow: {
//     width: 25,
//     height: 25,
//     marginLeft: 5,
//   },

//   arrowContainer: {
//     backgroundColor: "#f6f6f6",
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "flex-end",
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//   },

//   title: {
//     fontSize: 14,
//     color: "#000000",
//     fontWeight: "bold",
//   },

//   updateText: {
//     marginBottom: 10,
//   },

//   date: {
//     fontSize: 12,
//     marginTop: 2,
//     color: "#979797",
//   },

//   groupMembersContent: {
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   memberImage: {
//     height: 30,
//     width: 30,
//     marginRight: 4,
//     borderRadius: 20,
//   },
// });