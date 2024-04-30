import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPost } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";
import { useEffect } from "react";
import SearchInput from "../../components/searchinput";
import EmptyState from "../../components/emptystate";
import VideoCard from "../../components/videocard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: searchResult, fetchData } = useAppWrite(() =>
    searchPost(query)
  );

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Search Result
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {query}
              </Text>
            </View>

            <View className="mt-6 mb-8">
              <SearchInput initiaQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos"
            subtitle="No videos founds by this name"
          />
        )}
      />
    </SafeAreaView>
  );
};
export default Search;
