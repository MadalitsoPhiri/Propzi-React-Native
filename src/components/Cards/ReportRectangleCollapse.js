import React from "react";
import { View, Text, TouchableOpacity, Image,Dimensions } from "react-native";
import { styles } from "./cardStyle";
const {width} = Dimensions.get("window")
const ReportRectangleCollapse = ({
  dropDownIcon,
  title,
  date,
  onPress,
  backgroundColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { marginBottom: 30, backgroundColor, height: 90,width:width-32,alignSelf:"center" }]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>Last updated on {date}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#f6f6f6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ paddingTop: 0 }}>
                <Image
                  source={dropDownIcon}
                  style={{
                    width: 25,
                    height: 25,
                    marginTop: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportRectangleCollapse;
