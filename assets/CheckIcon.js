import React from "react";
import { View, Text } from "react-native";
import Checked from "./checktrue.svg";
import NotChecked from "./checkFalse.svg";

export const CheckTrue = () => {
  return <Checked />;
};

export const CheckFalse = () => {
  return <NotChecked />;
};
