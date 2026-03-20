import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

export const useComments = () => {

  const { $db } = useNuxtApp();

  const addComment = async (comment: {
    postId: string;
    userId: string;
    email: string;
    text: string;
  }) => {
    await addDoc(collection($db, "comments"), {
      ...comment,
      createdAt: Date.now()
    });
  };

  const getComments = async (postId: string) => {
    const q = query(
      collection($db, "comments"),
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  };

  return {
    addComment,
    getComments
  };
};