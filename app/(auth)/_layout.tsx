import { useAuthStore } from "@/store/authStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/home");
    }
  }, [user, isLoading]);
  return <Stack screenOptions={{ headerShown: false }} />;
}
