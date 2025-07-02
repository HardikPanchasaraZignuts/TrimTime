import { CommonButton } from "@/components/CommonButton";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const router = useRouter()

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <CommonButton title="redirect to Home" onPress={() => router.replace('/home')} />
    </View>
  );
}
