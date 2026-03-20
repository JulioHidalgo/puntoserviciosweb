import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

export const useStorage = () => {

  const { $storage } = useNuxtApp();

  const uploadImage = async (file: File) => {

    const fileRef = storageRef(
      $storage,
      `news/${Date.now()}-${file.name}`
    );

    await uploadBytes(fileRef, file);

    return await getDownloadURL(fileRef);
  };

  return {
    uploadImage
  };
};