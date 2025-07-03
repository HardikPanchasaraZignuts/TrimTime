import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ProviderItem } from "@/types/provider";
import COLORS from "@/constants/Colors";
import { db } from "@/config/firebaseConfig";
import { addDoc, collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePickerComponent from "@/components/DatePickerComponent";
import { useAuthStore } from "@/store/authStore";


const SalonDetailsPage = () => {
  const { id } = useLocalSearchParams();
  const [provider, setProvider] = useState<ProviderItem | null>(null);
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const fetchProvider = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const ref = doc(db, "providers", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProvider({
            id: snap.id,
            ...(snap.data() as Omit<ProviderItem, "id">),
          });
        }
      } catch (err) {
        console.error("Error loading provider:", err);
      }
    };

    fetchProvider();
  }, [id]);

  const handleSlotPress = (slot: any) => {
    let prevSlot = selectedSlot;
    if (prevSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  const handleBooking = async () => {
    if (!user || !provider) return;
    try {
      const bookingDate = date.toISOString().split("T")[0];

      // Check for existing booking (prevent double booking)
      const bookingQuery = query(
        collection(db, "bookings"),
        where("providerId", "==", provider.id),
        where("date", "==", bookingDate),
        where("time", "==", selectedSlot)
      );
      const existing = await getDocs(bookingQuery);

      if (!existing.empty) {
        alert("This slot is already booked. Please choose another.");
        return;
      }

      // Save booking
      await addDoc(collection(db, "bookings"), {
        userId: user.uid,
        providerId: provider.id,
        providerName: provider.name,
        date: bookingDate,
        time: selectedSlot,
        status: "upcoming",
        createdAt: Timestamp.now(),
      });

      alert("Booking confirmed");
      setSelectedSlot(null);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Booking failed. Try again.");
    }
  };

  if (!provider)
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: COLORS.background },
        Platform.OS === "android"
          ? { paddingBottom: 45 }
          : { paddingBottom: 30 },
      ]}
      className="bg-background flex-1 px-6"
    >
      <Ionicons name="arrow-back" size={20} color={COLORS.primary} onPress={() => router.back()} />
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-primary mr-2 font-semibold">
            {provider.name}
          </Text>
          <View className="border-b border-primary" />
        </View>

        <Image
          source={{ uri: provider.profileImage }}
          className="h-64 rounded-xl"
        />

        <View className="flex-1 flex-row mt-4 gap-2 items-center">
          <Ionicons name="location-sharp" size={24} color={COLORS.primary} />
          <Text className="max-w-[75%] text-primary">
            {provider.location.address} | {"  "}
            <Text
              // onPress={handleLocation}
              className="underline flex items-center mt-1 text-primary italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row mt-4 gap-2 items-center">
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text className="max-w-[75%] text-primary">
            {provider.description}
          </Text>
        </View>
        <View className="flex-1 mt-4 p-3 flex-row rounded-lg border border-primary">
          <View className="flex-1 flex-row items-center">
            <Ionicons name="calendar" size={24} color={COLORS.primary} />
            <Text className="text-primary mx-2 ">Select booking date</Text>
          </View>
          <DatePickerComponent date={date} setDate={setDate} />
        </View>
        <View className="flex-1">
          <Text className="text-center mt-4 pb-2 text-2xl font-semibold text-primary border-b-2 border-primary">
            Slots
          </Text>
          <View className="flex-wrap flex-row p-2 mt-4 rounded-lg">
            {provider.availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                className={`m-2 p-4 bg-primary rounded-lg items-center justify-center
                ${selectedSlot && selectedSlot !== slot ? "opacity-50" : ""}
                `}
                onPress={() => handleSlotPress(slot)}
                disabled={
                  selectedSlot === slot || selectedSlot == null ? false : true
                }
              >
                <Text className="text-white font-bold">{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedSlot != null && (
            <View className="flex-1">
              <TouchableOpacity onPress={handleBooking}>
                <Text className="text-center text-lg font-semibold bg-primary p-2 my-3 rounded-lg text-white">
                  Book Slot
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SalonDetailsPage;
