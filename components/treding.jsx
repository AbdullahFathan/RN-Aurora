import { View, Text, FlatList } from "react-native";
const Treding = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text key={item.id} className="text-5xl text-white">
          {item.id}
        </Text>
      )}
    />
  );
};
export default Treding;
