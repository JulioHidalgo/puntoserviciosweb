<template>
  <section id="servicios" class="py-5">
    <h2 class="text-center mb-4">Servicios</h2>

    <div class="row">
      <div class="col-md-4" v-for="s in servicios" :key="s.title">
        <div class="service-card text-center">
          <img :src="s.img" class="img-fluid" />
          <h5>{{ s.title }}</h5>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const servicios = [
  {
    img: '/img/servicio_paginas_web.webp',
    title: 'Páginas Web',
    desc: 'Diseño moderno y SEO'
  },
  {
    img: '/img/servicio_appMobile.webp',
    title: 'Apps',
    desc: 'Aplicaciones móviles'
  },
  {
    img: '/img/servicio_software_a_medida.webp',
    title: 'Software',
    desc: 'Soluciones a medida'
  }
]
</script>