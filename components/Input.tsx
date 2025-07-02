import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends Partial<TextInputProps> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: TextInputProps["keyboardType"];
  error?: string;
  className?: string;
  secureTextEntry?: boolean;
}

export default function Input({
  label,
  value,
  onChangeText,
  onBlur,
  keyboardType = "default",
  error,
  className,
  secureTextEntry = false,
}: InputProps) {
  return (
    <View className={className}>
      <Text className="text-primary mb-2">{label}</Text>
      <TextInput
        className="h-10 border-2 border-primary text-primary font-medium rounded-lg px-2"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {error && <Text className="text-error mt-1 text-sm">{error}</Text>}
    </View>
  );
}
