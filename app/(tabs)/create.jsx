import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFlied from "../../components/formflied";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import PrimaryButton from "../../components/button";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = async () => {
    if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
      return Alert.alert("Fill all data");
    }

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post Upload");
      router.push("/home");
    } catch (error) {
      Alert.alert("Eror", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const openPicker = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        type === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (type === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (type === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 y-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>

        <FormFlied
          title="Video Title"
          value={form.title}
          handelChange={(e) => setForm({ ...form, title: e })}
          placeholder="Enter your title"
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-psemibold">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormFlied
          title="AI Prompt"
          value={form.prompt}
          handelChange={(e) => setForm({ ...form, prompt: e })}
          placeholder="Enter your AI prompt"
          otherStyles="mt-7"
        />

        <PrimaryButton
          title="Submit & Publish"
          onTap={submit}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Create;
