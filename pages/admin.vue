<template>
  <Navbar />

  <section class="container mt-5 pt-5">
    <div class="alert alert-success d-flex justify-content-between align-items-center" role="alert">
      <span>
        Sesión activa como administrador: <strong>{{ authStore.user?.email || "sin email" }}</strong>
      </span>
      <span class="badge bg-dark">Admin</span>
    </div>

    <div class="card shadow-lg border-0">
      
      <div class="card-header bg-dark text-white">
        Crear Noticia
      </div>

      <div class="card-body">

        <input v-model="form.title" class="form-control mb-3" placeholder="Título" />

        <textarea v-model="form.description" class="form-control mb-3" placeholder="Descripción"></textarea>

        <select v-model="form.category" class="form-select mb-3">
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>

        <!-- 🔥 INPUT FILE -->
        <input type="file" class="form-control mb-3" @change="handleFile" />

        <!-- 👁️ PREVIEW -->
        <img v-if="preview" :src="preview" class="img-fluid mb-3" />

        <button class="btn btn-success w-100" @click="submit" :disabled="submitting">
          🚀 Publicar
        </button>

      </div>

    </div>

  </section>
</template>

<script setup>
definePageMeta({
  middleware: "admin"
});

const { createNews } = useNews();
const { uploadImage } = useStorage();
const authStore = useAuthStore();
const categories = ["General", "Tecnología", "Negocios", "Deportes", "Cultura"];
const submitting = ref(false);

const form = ref({
  title: "",
  image: "",
  description: "",
  category: "General",
  authorId: "",
  authorEmail: "",
  date: ""
});

const preview = ref(null);
let file = null;

// 📂 CAPTURA IMAGEN
const handleFile = (e) => {
  file = e.target.files[0];
  preview.value = URL.createObjectURL(file);
};

// 🚀 SUBMIT COMPLETO
const submit = async () => {
  try {
    if (!form.value.title.trim() || !form.value.description.trim()) {
      alert("Completa título y descripción para publicar.");
      return;
    }

    submitting.value = true;

    // 🔥 SUBIR IMAGEN
    if (file) {
      const url = await uploadImage(file);
      form.value.image = url;
    }

    // 📅 FECHA
    form.value.date = Date.now();
    form.value.authorId = authStore.user?.uid ?? "";
    form.value.authorEmail = authStore.user?.email ?? "";

    // 💾 GUARDAR
    await createNews(form.value);

    alert("✅ Noticia creada");

    // RESET
    form.value = {
      title: "",
      image: "",
      description: "",
      category: "General",
      authorId: "",
      authorEmail: "",
      date: ""
    };

    preview.value = null;
    file = null;

  } catch (error) {
    console.error(error);
    alert("❌ Error al crear noticia");
  } finally {
    submitting.value = false;
  }
};
</script>