export const useNewsStore = defineStore("news", {
  state: () => ({
    activeCategory: "Todas",
    viewedNews: [] as Array<any>
  }),
  actions: {
    setActiveCategory(category: string) {
      this.activeCategory = category;
    },
    setViewedNews(items: Array<any>) {
      this.viewedNews = items;
    }
  }
});
