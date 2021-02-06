import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors } from "../../styles";
import PropTypes from "prop-types";

export default function GlobalCard({
  imgUrl,
  category,
  title,
  from,
  desc,
  propziImpact,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardImage}>
        <Image source={imgUrl} style={{ width: "100%", height: "100%" }} />
        <View style={styles.category}>
          <Text>{category}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text>From {from}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <TouchableOpacity
          onPress={() => Alert.alert(propziImpact)}
          style={styles.propziImpact}
        >
          <Text>
            Propzi Impact:
            <Text style={styles.propziImpactInner}> {propziImpact}</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const propTypes = {
  propziImpact: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    marginTop: 50,
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    position: "relative",
    height: "53%",
  },
  category: {
    position: "absolute",
    color: "#333",
    padding: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY_COLOR,
    right: 20,
    top: 20,
  },
  content: {
    padding: 20,
    borderColor: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  desc: {
    marginVertical: 10,
    marginBottom: 20,
    color: "#999",
    lineHeight: 23,
  },
  propziImpact: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 60,
    width: "60%",
    backgroundColor: "white",
  },
  propziImpactInner: {
    color: "red",
  },
});
