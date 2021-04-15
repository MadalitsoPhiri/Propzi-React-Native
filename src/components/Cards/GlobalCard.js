import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
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
  to,
  projectURL,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => to.navigate("WebView", { projectURL })}
    >
      <View style={styles.cardImage}>
        <Image source={{ uri: imgUrl }} style={styles.cardImage} />
        <View style={styles.category}>
          <Text>{category}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ color: "#999" }}>From {from}</Text>
        <Text style={styles.desc}>{desc.substr(0, 110) + "...."}</Text>
        <Text style={{ color: colors.PRIMARY_COLOR }}>Read more</Text>
        {propziImpact == "" ? null : (
          <TouchableOpacity
            onPress={() => Alert.alert(propziImpact)}
            style={styles.propziImpact}
          >
            <Text>
              Propzi Impact:
              <Text style={styles.propziImpactInner}> {propziImpact}</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const propTypes = {
  propziImpact: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.LIGHT_COLOR,
    marginTop: 50,
    marginBottom: 20,
    borderRadius: 10,
    flexWrap: "wrap",
    overflow: "hidden",
    marginHorizontal: 16,
  },

  cardImage: {
    height: 250,
    width: "100%",
  },
  category: {
    position: "absolute",
    color: "#333",
    padding: 3,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: colors.PRIMARY_COLOR,
    right: 15,
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
