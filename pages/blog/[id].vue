<template>
  <Navbar />

  <section class="container mt-5 pt-5" v-if="post">

    <h1>{{ post.title }}</h1>
    <img :src="post.image" class="img-fluid mb-3" />
    <p>{{ post.description }}</p>

    <div v-if="newsStore.viewedNews.length" class="card p-3 mb-4">
      <h5 class="mb-3">Últimas noticias revisadas</h5>
      <div class="list-group">
        <NuxtLink
          v-for="view in newsStore.viewedNews"
          :key="view.newsId"
          :to="`/blog/${view.newsId}`"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <span>{{ view.title }}</span>
          <small>{{ formatDate(view.visitedAt) }}</small>
        </NuxtLink>
      </div>
    </div>

    <!-- COMENTARIOS -->
    <h4>Comentarios</h4>

    <div v-for="c in comments" :key="c.id" class="mb-2 border-bottom pb-2">
      <strong>{{ c.email }}</strong>
      <p>{{ c.text }}</p>
      <small class="text-muted">{{ formatDate(c.createdAt) }}</small>
    </div>

    <!-- FORM -->
    <div v-if="user">
      <textarea v-model="text" class="form-control mb-2"></textarea>
      <button class="btn btn-primary" @click="sendComment">
        Comentar
      </button>
    </div>

  </section>
</template>

<script setup>
const route = useRoute()
const { getNewsById } = useNews()
const { addComment, getComments } = useComments()
const { user } = useAuth()
const { trackViewedNews, getViewedNews } = useViewedNews()
const newsStore = useNewsStore()

const post = ref(null)
const comments = ref([])
const text = ref("")

const formatDate = (value) => {
  if (!value) return "Sin fecha"
  return new Date(value).toLocaleString("es-CL")
}

onMounted(async () => {
  post.value = await getNewsById(route.params.id)
  comments.value = await getComments(route.params.id)

  if (user.value?.uid && post.value?.id) {
    await trackViewedNews(user.value.uid, post.value)
    const viewed = await getViewedNews(user.value.uid)
    newsStore.setViewedNews(viewed)
  }
})

const sendComment = async () => {
  if (!text.value.trim()) return;

  await addComment({
    postId: route.params.id,
    text: text.value.trim(),
    userId: user.value.uid,
    email: user.value.email
  })

  comments.value = await getComments(route.params.id)
  text.value = ""
}
</script>