<template>
  <section class="contact-section py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-3">
          <div class="card shadow-lg border-0 rounded-3 p-4 bg-white text-dark">
            <h2 class="text-center mb-4">Crear cuenta</h2>

            <input v-model="email" class="form-control mb-2" placeholder="Email" />
            <input
              v-model="password"
              type="password"
              class="form-control mb-3"
              placeholder="Password"
            />

            <button class="btn btn-primary w-100" @click="handleRegister">
              Crear cuenta
            </button>

            <div class="text-center mt-3">
              <NuxtLink to="/login" class="btn btn-link">
                Ya tienes cuenta? Iniciar sesión
              </NuxtLink>
            </div>

            <div class="mt-3">
              <button
                class="btn btn-link px-0"
                type="button"
                @click="toggleRecover"
              >
                Recuperar contraseña
              </button>

              <div v-if="showRecover" class="mt-3">
                <input
                  v-model="recoverEmail"
                  class="form-control mb-2"
                  placeholder="Email para recuperar"
                />
                <button class="btn btn-dark w-100" type="button" @click="handleRecover">
                  Enviar enlace
                </button>

                <div v-if="recoverStatus === 'success'" class="alert alert-success mt-3 mb-0">
                  Revisa tu email para restablecer la contraseña.
                </div>
                <div v-else-if="recoverStatus === 'error'" class="alert alert-danger mt-3 mb-0">
                  No se pudo enviar el enlace. Revisa el email e intenta de nuevo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { register, recoverPassword } = useAuth()
const router = useRouter()

const email = ref("")
const password = ref("")

const showRecover = ref(false)
const recoverEmail = ref("")
const recoverStatus = ref<"idle" | "success" | "error">("idle")

const handleRegister = async () => {
  await register(email.value, password.value)
  router.push('/blog')
}

const handleRecover = async () => {
  try {
    await recoverPassword(recoverEmail.value)
    recoverStatus.value = "success"
  } catch (e) {
    recoverStatus.value = "error"
  }
}

const toggleRecover = () => {
  showRecover.value = !showRecover.value
  recoverStatus.value = "idle"
  if (showRecover.value) recoverEmail.value = email.value
}
</script>