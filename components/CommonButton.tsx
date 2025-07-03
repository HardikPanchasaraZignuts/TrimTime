import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import clsx from "clsx";

interface CommonButtonProps extends TouchableOpacityProps {
  title: string;
  textClassName?: string;
  className?: string;
  loading?: boolean;
}

export const CommonButton = ({
  title,
  onPress,
  loading,
  className,
  textClassName,
  ...props
}: CommonButtonProps) => {
  return (
    <TouchableOpacity
      disabled={loading}
      className={clsx("p-2 my-3 bg-primary rounded-lg", className, loading && "bg-primary-light")}
      onPress={onPress}
      {...props}
    >
      <Text
        className={clsx(
          "text-lg text-text-inverted font-semibold text-center",
          textClassName
        )}
      >
        {loading ? "wait..." : title}
      </Text>
    </TouchableOpacity>
  );
};
