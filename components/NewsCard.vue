<template>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="news-card h-100" @click="goToDetail">
      <img :src="news.image || '/img/logo_puntoserviciosweb.webp'" class="news-card-image" />

      <div class="p-3">
        <h5>{{ news.title }}</h5>
        <p>{{ shortText }}</p>
        <small class="d-block text-muted mb-1">{{ news.category || "General" }}</small>
        <small>{{ formatDate(news.date) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  news: Object
});

const router = useRouter();

const goToDetail = () => {
  router.push(`/blog/${props.news.id}`);
};

const shortText = computed(() => {
  const desc = props.news?.description || '';
  return desc.substring(0, 100) + (desc.length > 100 ? '...' : '');
});

const formatDate = (date) => {
  if (!date) return 'Sin fecha';
  try {
    return new Date(date).toLocaleDateString("es-CL");
  } catch {
    return 'Fecha inválida';
  }
};
</script>