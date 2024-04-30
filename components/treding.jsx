import { View, Text, FlatList } from "react-native";
import TredingItem from "./tredingitem";
import { useState } from "react";

const Treding = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[1]);

  const viewAbleChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TredingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewAbleChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};
export default Treding;
