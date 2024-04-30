import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initiaQuery }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState(initiaQuery || "");
  return (
    <View className="border-2 border-black-200 w-full flex-row h-16 px-4 space-x-4 bg-black-100 rounded-xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={query}
        placeholder="Search..."
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missin Keyword", "Input keyword search");
          }

          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default SearchInput;
