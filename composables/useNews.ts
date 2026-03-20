import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc
} from "firebase/firestore";

export const useNews = () => {
  const { $db } = useNuxtApp();

  const toMillis = (value: any): number => {
    if (!value) return 0;
    if (typeof value === "number") return value;
    if (value instanceof Date) return value.getTime();
    if (typeof value?.toMillis === "function") return value.toMillis();
    if (typeof value?.seconds === "number") return value.seconds * 1000;
    return 0;
  };

  const normalizeCategory = (raw: any): string[] => {
    if (Array.isArray(raw)) {
      return raw
        .map((item) => String(item ?? "").trim())
        .filter(Boolean);
    }

    const single = String(raw ?? "").trim();
    return single ? [single] : ["General"];
  };

  const normalizeText = (value: string) =>
    (value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const normalizeNews = (snap: any) => {
    const data = snap.data() ?? {};
    const normalizedDate =
      toMillis(data.date) || toMillis(data.data) || toMillis(data.createdAt) || 0;
    const categories = normalizeCategory(data.category);

    return {
      id: snap.id,
      ...data,
      category: categories[0] ?? "General",
      categories,
      date: normalizedDate
    };
  };

  const getLatestNews = async (maxItems = 50) => {
    try {
      // Leemos y ordenamos en cliente para soportar docs antiguos con `data` (timestamp)
      // y evitar errores de indice compuesto al filtrar por categoria.
      const snapshot = await getDocs(collection($db, "news"));
      return snapshot.docs
        .map(normalizeNews)
        .sort((a, b) => (b.date || 0) - (a.date || 0))
        .slice(0, maxItems);

    } catch (error) {
      console.error("Error cargando noticias:", error);
      throw error;
    }
  };

  const getNews = async () => {
    return getLatestNews();
  };

  const getNewsByCategory = async (category: string, maxItems = 50) => {
    const cleanCategory = category?.trim();
    if (!cleanCategory || cleanCategory.toLowerCase() === "todas") {
      return getLatestNews(maxItems);
    }

    const target = normalizeText(cleanCategory);
    const allNews = await getLatestNews(maxItems * 3);
    return allNews
      .filter((item: any) =>
        (item.categories || []).some((cat: string) => normalizeText(cat) === target)
      )
      .slice(0, maxItems);
  };

  const getNewsById = async (id: string) => {
    const ref = doc($db, "news", id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null;
    }

    return normalizeNews(snapshot);
  };

  const createNews = async (news: {
    title: string;
    description: string;
    image: string;
    category: string;
    authorId?: string;
    authorEmail?: string;
    date?: number;
    updatedAt?: number;
  }) => {
    const now = Date.now();
    const normalizedCategory = news.category?.trim() || "General";
    const payload = {
      ...news,
      category: normalizedCategory,
      categories: [normalizedCategory],
      data: new Date(news.date ?? now),
      date: news.date ?? now,
      updatedAt: news.updatedAt ?? now
    };

    const created = await addDoc(collection($db, "news"), payload);
    return created.id;
  };

  return {
    getNews,
    getLatestNews,
    getNewsByCategory,
    getNewsById,
    createNews
  };
};