import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

import {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videosCollectionId,
  storageId,
} from "@env";

export const appWriteConfig = {
  endpoint: endpoint,
  platform: platform,
  projectId: projectId,
  databaseId: databaseId,
  userCollectionId: userCollectionId,
  videosCollectionId: videosCollectionId,
  storageId: storageId,
};

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platform);

const account = new Account(client);

const avarts = new Avatars(client);

const databases = new Databases(client);

const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avartUrl = avarts.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avartUrl,
      }
    );

    return newUser;
  } catch (eror) {
    console.log(eror);
    throw new Error(eror);
  }
};

export const signIn = async (email, password) => {
  try {
    const sesion = await account.createEmailSession(email, password);

    return sesion;
  } catch (eror) {
    console.log(eror);
    throw new Error(eror);
  }
};

export const getCurrentUser = async () => {
  try {
    const currAccount = await account.get();

    if (!currAccount) throw Error;

    const currUser = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currAccount.$id)]
    );

    if (!currUser) throw Error;

    return currUser.documents[0];
  } catch (eror) {
    console.log(eror);
    throw new Error(eror);
  }
};

export const getAllPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getLatestPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const searchPost = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
export const getUserPost = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosCollectionId,
      [Query.equal("users", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const logoutServices = async () => {
  try {
    const sesion = await account.deleteSession("current");

    return sesion;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const assets = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      assets
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        video: videoUrl,
        thubnail: thumbnailUrl,
        promt: form.prompt,
        users: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
