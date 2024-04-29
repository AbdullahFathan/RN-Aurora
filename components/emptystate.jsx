import { View, Text, Image } from "react-native";
import { images } from "../constants";
import { router } from "expo-router";
import PrimaryButton from "./button";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        className="w-[271px] h-[215px]"
        source={images.empty}
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="text-xl text-center mt-2 font-psemibold text-white">
        {subtitle}
      </Text>

      <PrimaryButton
        title={"Create Video"}
        onTap={() => router.push("/create")}
        containerStyle={"w-full my-5"}
      />
    </View>
  );
};
export default EmptyState;
