import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";

export const useProtectedRoute = () => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/sign-in");
    }
  }, [user, isLoading]);
};
