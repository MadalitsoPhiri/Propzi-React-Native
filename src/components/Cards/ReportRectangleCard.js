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
