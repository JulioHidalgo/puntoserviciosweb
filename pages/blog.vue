<template>
  <Navbar />

  <section class="container-fluid bg-dark text-white py-5 mt-5">
    <div class="container">
      <h1 class="display-6 fw-bold mb-2">Blog de Noticias</h1>
      <p class="mb-0">Actualidad y tendencias, ordenadas desde la más reciente.</p>
    </div>
  </section>

  <section class="container py-4">
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <button
        v-for="category in categories"
        :key="category"
        class="btn"
        :class="activeCategory === category ? 'btn-dark' : 'btn-outline-dark'"
        @click="selectCategory(category)"
      >
        {{ category }}
      </button>
    </div>
  </section>

  <section class="container pb-4">
    <h2 class="text-center mb-4">Últimas noticias</h2>

    <!-- LOADING -->
    <div v-if="loading" class="text-center">
      Cargando noticias...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="alert alert-danger">
      Error al cargar las noticias
    </div>

    <!-- VACÍO -->
    <div v-else-if="!posts.length" class="text-center">
      No hay noticias en esta categoría
    </div>

    <!-- DATA -->
    <div v-else class="row g-4">
      <NewsCard v-for="post in posts" :key="post.id" :news="post" />
    </div>

  </section>

  <Footer />
</template>

<script setup>
const { getLatestNews, getNewsByCategory } = useNews()
const newsStore = useNewsStore()

const posts = ref([])
const loading = ref(true)
const error = ref(false)
const categories = ["Todas", "General", "Tecnología", "Negocios", "Deportes", "Cultura"]
const activeCategory = computed(() => newsStore.activeCategory)

const loadNews = async () => {
  loading.value = true
  error.value = false

  try {
    if (activeCategory.value === "Todas") {
      posts.value = await getLatestNews()
    } else {
      posts.value = await getNewsByCategory(activeCategory.value)
    }
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}

const selectCategory = async (category) => {
  newsStore.setActiveCategory(category)
  await loadNews()
}

onMounted(async () => {
  await loadNews()
})
</script>