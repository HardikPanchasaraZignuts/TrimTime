import { db } from "@/config/firebaseConfig";
import COLORS from "@/constants/Colors";
import IMAGES from "@/constants/Images";
import { ProviderItem } from "@/types/provider";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter()
  const [providers, setProviders] = useState<ProviderItem[]>([]);

  const getProviders = async () => {
    try {
      const q = query(collection(db, "providers"));
      const res = await getDocs(q);
      const data: ProviderItem[] = res.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ProviderItem, "id">),
      }));
      setProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  const renderItem = ({ item }: { item: ProviderItem }) => (
    <TouchableOpacity
      onPress={() => router.push(`/salon/${item.id}`)}
      className="bg-primary-light mt-3 max-h-64 min-w-52 flex justify-center rounded-lg p-4 mx-4 shadow-md shadow-primary-light"
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.profileImage }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white mb-2">{item.specialization}</Text>
      <Text className="text-white mb-2">
        Rating : {item.rating}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: COLORS.background },
        Platform.OS === "android"
          ? { paddingBottom: 45 }
          : { paddingBottom: 30 },
      ]}
    >
      <View className="items-center">
        <View className="flex-row p-2 w-11/12 rounded-lg shdow-lg justify-center items-center">
          <Text className="font-semibold text-xl text-primary">
            Welcome to Trim time {"  "}
          </Text>
          <Image
            resizeMode="cover"
            source={IMAGES.logo}
            className="w-12 h-12 rounded-full overflow-hidden"
          />
        </View>
      </View>
      <ScrollView >
        <Image
          resizeMode='cover'
          className="h-52 w-full justify-center items-center"
          source={IMAGES.salonBg}
        >
        </Image>
        <View className="p-4 flex-row items-center">
          <Text className="text-3xl text-primary ml-5 font-semibold">
            Special Discount 10%
          </Text>
        </View>
        {providers.length > 0 ? (
          <FlatList
            data={providers}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ marginLeft: 20, paddingBottom: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={COLORS.primary} />
        )}
        <View className="p-4 flex-row items-center">
          <Text className="text-3xl text-primary mr-2 font-semibold">
            Our Providers
          </Text>
        </View>
        {providers.length > 0 ? (
          <FlatList
            data={providers}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{ paddingBottom: 16 }}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
          />
        ) : (
          <ActivityIndicator animating color={COLORS.primary} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
