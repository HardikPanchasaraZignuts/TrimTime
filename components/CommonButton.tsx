import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";
import clsx from "clsx";

interface CommonButtonProps extends TouchableOpacityProps {
  title: string;
  textClassName?: string;
  className?: string;
}

export const CommonButton = ({
  title,
  onPress,
  className,
  textClassName,
  ...props
}: CommonButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx("p-2 my-3 bg-primary rounded-lg", className)}
      onPress={onPress}
      {...props}
    >
      <Text
        className={clsx(
          "text-lg text-text-inverted font-semibold text-center",
          textClassName
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
