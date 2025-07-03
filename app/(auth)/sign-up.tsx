import { CommonButton } from "@/components/CommonButton";
import { auth } from "@/config/firebaseConfig";
import IMAGES from "@/constants/Images";
import { authSchema } from "@/schemas/auhSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import Input from "../../components/Input";

type AuthFormData = z.infer<typeof authSchema>;

export default function SignUpPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      const usercredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = usercredentials.user;

      if (user) {
        router.push("/home");
      } else {
        Alert.alert(
          "Sign up Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(
          "Signup Failed!",
          "This email address is already in use. Please use a different email.",
          [{ text: "OK" }]
        );
      } else {
        Alert.alert(
          "Sign up Error",
          "An unexpected error occurred. Please try again later.",
          [{ text: "OK" }]
        );
      }
    }
  };
  return (
    <SafeAreaView className="bg-background flex-1 px-6">
      <KeyboardAvoidingView behavior={"height"}>
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="flex justify-center items-center pb-24 my-auto">
            <Image source={IMAGES.logo} style={{ height: 220, width: 220 }} />
            <Text className="text-xl text-center text-primary font-bold">
              Join TrimTime today
            </Text>
            <Text className="text-sm text-center text-primary-light font-bold mb-8">
              Book smarter. Style faster. Look better.
            </Text>
            <View className="w-11/12">
              <View className="w-full">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.email?.message}
                      keyboardType="email-address"
                      className="mb-4"
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={errors.password?.message}
                      keyboardType="default"
                      secureTextEntry={true}
                      className="mb-4"
                    />
                  )}
                />
                <CommonButton
                  title="Sign Up"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
              <View className="flex justify-center items-center">
                <TouchableOpacity
                  onPress={() => router.push("/sign-in")}
                  className="mt-4 flex-row justify-center items-center"
                >
                  <Text className="text-text text-lg font-semibold">
                    Already a User?{"   "}
                    <Text className="font-semibold underline text-primary">
                      Sign in
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
