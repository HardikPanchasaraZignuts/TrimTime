import { View, Text } from "react-native";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
   const { user } = useAuthStore();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl font-bold text-primary">Welcome {user?.email}</Text>
    </View>
  );
}
