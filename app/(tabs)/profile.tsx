import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonButton } from '@/components/CommonButton';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import COLORS from '@/constants/Colors';

const ProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter()
    const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="bg-background flex-1 px-6">
      <View className="flex-1 justify-center items-center">
        <Ionicons name="person-circle" size={80} color={COLORS.primary} />
        <Text className="text-xl mb-4 text-primary font-semibold">
          User Profile
        </Text>
        <>
          <Text className="text-primary text-lg font-medium mb-4">
            Email : {user?.email}
          </Text>
          <CommonButton
            loading={loading}
            className="px-4"
            title="Logout"
            onPress={handleLogout}
          />
        </>
      </View>
    </SafeAreaView>
  );
}

export default ProfilePage