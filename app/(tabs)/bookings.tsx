import { db } from "@/config/firebaseConfig";
import COLORS from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type BookingItem = {
  id: string;
  providerName: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
};

const BookingsPage = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loader, setLoader] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", user.uid)
      );
      const res = await getDocs(q);
      const data: BookingItem[] = res.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<BookingItem, "id">),
      }));
      setBookings(data);
      setLoader(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, "bookings", bookingId));
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
      alert("Booking canceled successfully.");
    } catch (error) {
      console.error("Error canceling booking:", error);
      alert("Failed to cancel booking.");
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background px-6">
      {loader ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={bookings}
          onRefresh={fetchBookings}
          refreshing={loader}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="p-4 m-4 gap-3 rounded-xl shadow-md shadow-primary-light bg-primary">
              <View className="flex-row justify-between items-center">
                <View className="gap-3">
                  <Text className="text-text-inverted">
                    Provider name: {item.providerName}
                  </Text>
                  <Text className="text-text-inverted">
                    Status: {item.status}
                  </Text>
                </View>
                <Ionicons
                  name="trash-bin"
                  size={20}
                  color={COLORS.textInverted}
                  onPress={() => handleCancelBooking(item.id)}
                />
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-text-inverted">Date: {item.date}</Text>
                <Text className="text-text-inverted">Time:{item.time}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </SafeAreaView>
  );
};

export default BookingsPage;
