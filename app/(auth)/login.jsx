import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFlied from "../../components/formflied";
import { useState } from "react";
import PrimaryButton from "../../components/button";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";
const Login = () => {
  const [formFlied, setFormFlied] = useState({
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  const submit = async () => {
    if (!formFlied.password || !formFlied.email) {
      Alert.alert("Eror", "Fill all form");
    }

    setIsSubmiting(true);
    try {
      await signIn(formFlied.email, formFlied.password);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Eror", error.message);
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[82vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Aurora
          </Text>

          <FormFlied
            title="Email"
            value={formFlied.email}
            handelChange={(e) => setFormFlied({ ...formFlied, email: e })}
            otherStyles="mt-7"
            keyboardType="email-addres"
          />
          <FormFlied
            title="Password"
            value={formFlied.password}
            handelChange={(e) => setFormFlied({ ...formFlied, password: e })}
            otherStyles="mt-7"
          />

          <PrimaryButton
            title="Login"
            containerStyle="mt-12"
            onTap={submit}
            isLoading={isSubmiting}
          />

          <View className="justify-center pt-5  flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              {" "}
              Dont have Account ?
            </Text>
            <Link
              href="/register"
              className="text-lg font-psemibold text-secondary"
            >
              Register
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Login;
