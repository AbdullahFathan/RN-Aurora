import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/searchinput";
import Treding from "../../components/treding";
import EmptyState from "../../components/emptystate";
import { useEffect, useState } from "react";
import { getAllPost } from "../../lib/appwrite";
import { useAppWrite } from "../../lib/useAppWrite";
import VideoCard from "../../components/videocard";

const Home = () => {
  const [refershing, setRefershing] = useState(false);

  const { data: posts, fetchData } = useAppWrite(getAllPost);

  const onRefershing = async () => {
    setRefershing(true);
    await fetchData();
    setRefershing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6 ">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Abdullah Fathan
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Video
              </Text>
              <Treding posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos" subtitle="Be first upload video" />
        )}
        refreshControl={
          <RefreshControl refreshing={refershing} onRefresh={onRefershing} />
        }
      />
    </SafeAreaView>
  );
};
export default Home;
