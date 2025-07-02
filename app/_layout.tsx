import { auth } from "@/config/firebaseConfig";
import COLORS from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const router = useRouter();
  const {setUser, isLoading , setIsLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("🚀 ~ unsubscribe ~ firebaseUser:", firebaseUser)
      setUser(firebaseUser ?? null);
      setIsLoading(false);
      if (firebaseUser) {
        router.replace("/home");
      } else {
        router.replace("/sign-in");
      }
    });

    return () => unsubscribe()
  }, [])

  if (isLoading) return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
