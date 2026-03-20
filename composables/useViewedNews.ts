import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc
} from "firebase/firestore";

export const useViewedNews = () => {
  const { $db } = useNuxtApp();

  const viewedCollection = (uid: string) =>
    collection($db, "users", uid, "viewedNews");

  const trackViewedNews = async (
    uid: string,
    news: { id: string; title: string; image: string }
  ) => {
    const viewedRef = doc($db, "users", uid, "viewedNews", news.id);
    await setDoc(
      viewedRef,
      {
        newsId: news.id,
        title: news.title ?? "",
        image: news.image ?? "",
        visitedAt: Date.now()
      },
      { merge: true }
    );

    const q = query(viewedCollection(uid), orderBy("visitedAt", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.docs.length <= 10) return;

    const docsToDelete = snapshot.docs.slice(10);
    await Promise.all(docsToDelete.map((item) => deleteDoc(item.ref)));
  };

  const getViewedNews = async (uid: string, maxItems = 10) => {
    const q = query(
      viewedCollection(uid),
      orderBy("visitedAt", "desc"),
      limit(maxItems)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data()
    }));
  };

  return {
    trackViewedNews,
    getViewedNews
  };
};
