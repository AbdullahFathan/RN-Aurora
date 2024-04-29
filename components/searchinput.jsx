import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ title, value, handelChange, otherStyles}) => {
  const [isObscure, setIsObscure] = useState(false);
  return (
    <View className="border-2 border-black-200 w-full flex-row h-16 px-4 space-x-4 bg-black-100 rounded-xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={value}
        placeholder="Search..."
        placeholderTextColor="#7b7b8b"
        onChangeText={handelChange}
        secureTextEntry={title === "Password" && !isObscure}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default SearchInput;
