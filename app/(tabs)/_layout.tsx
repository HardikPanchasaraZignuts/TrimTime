import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

const TabsLayout = () => {
  useProtectedRoute();
  return (
    <Tabs>
      <Tabs.Screen name="home" />
    </Tabs>
  );
};

export default TabsLayout;
