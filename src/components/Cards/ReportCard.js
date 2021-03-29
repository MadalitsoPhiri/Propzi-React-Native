import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { colors } from "../../styles";
const { width } = Dimensions.get("screen");

const ReportCard = ({
  imgUrl,
  isHigh = false,
  title,
  dataSource,
  desc,
  propziImpact,
  category,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: imgUrl }}
          style={[styles.image, { resizeMode: "cover" }]}
        />
        <View style={styles.tag}>
          <Text style={styles.tagName}>{category}</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={{ color: "#788490", marginBottom: 4, fontSize: 12 }}>
            From: {dataSource}
          </Text>
          <Text style={{ color: "#1f2123", fontSize: 13, lineHeight: 20 }}>
            {desc?.substr(0, 89) + "..."}
            <Text style={{ color: colors.PRIMARY_COLOR }}>Read more</Text>
          </Text>
        </View>
        {propziImpact !== "" && propziImpact ? (
          <View style={styles.cardFooter}>
            <Text style={styles.propziImpactTitle}>Propzi Impact:</Text>
            <Text
              style={[
                styles.propziImpact,
                { color: isHigh ? colors.PRIMARY_COLOR : "red" },
              ]}
            >
              {propziImpact}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width * 0.7,
    marginHorizontal: 20,
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#f3f3f3",
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
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    marginTop: 10,
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

export default ReportCard;
