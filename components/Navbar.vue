<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-black fixed-top">
    <div class="container-fluid">
      <NuxtLink to="/#inicio" class="navbar-brand">
        <img src="/img/logo_puntoserviciosweb.webp" width="75" />
      </NuxtLink>

      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><NuxtLink to="/#inicio" class="nav-link">Inicio</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/#nosotros" class="nav-link">Nosotros</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/#clientes" class="nav-link">Clientes</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/#servicios" class="nav-link">Servicios</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/#contacto" class="nav-link">Contacto</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/blog" class="nav-link">Blog</NuxtLink></li>
          <li v-if="isAdmin" class="nav-item"><NuxtLink to="/admin" class="nav-link">Admin</NuxtLink></li>
          <li v-if="isAuthenticated" class="nav-item d-flex align-items-center px-2">
            <span class="badge bg-success">Logeado: {{ roleLabel }}</span>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <button class="btn btn-sm btn-outline-light ms-2 mt-1 mt-lg-0" @click="handleLogout">
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { logout } = useAuth()
const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.role === "admin")
const roleLabel = computed(() => (isAdmin.value ? "Admin" : "Usuario"))

const handleLogout = async () => {
  await logout()
  router.push("/login")
}
</script>