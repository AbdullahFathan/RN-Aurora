import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormFlied = ({
  title,
  value,
  handelChange,
  otherStyles,
  keyboardType,
  placeholder,
}) => {
  const [isObscure, setIsObscure] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 w-full flex-row h-16 px-4 bg-black-100 rounded-xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handelChange}
          secureTextEntry={title === "Password" && !isObscure}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setIsObscure(!isObscure)}>
            <Image
              source={!isObscure ? icons.eye : icons.eyeHide}
              className="w-6 h-6 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormFlied;
