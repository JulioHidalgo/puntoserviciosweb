<template>
  <section id="inicio" class="hero">

    <Swiper
      :modules="modules"
      :slides-per-view="2"
      :loop="true"
      :autoplay="{ delay: 4000 }"
      :pagination="{ clickable: true }"
      class="hero-swiper"
    >

      <SwiperSlide v-for="slide in slides" :key="slide.img">
        
        <div class="slide-container">
          <img :src="slide.img" class="w-100 hero-img" />

          <div class="slider-content">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.text }}</p>
          </div>
        </div>

      </SwiperSlide>

    </Swiper>

  </section>
</template>

<script setup>
// ✅ IMPORTS CORRECTOS
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

// ✅ ESTILOS NECESARIOS
import 'swiper/css'
import 'swiper/css/pagination'

// ✅ MÓDULOS
const modules = [Autoplay, Pagination]

// ✅ DATA
const slides = [
  {
    img: '/img/slider_servicio_paginas_web.webp',
    title: 'Creamos páginas web modernas, atractivas y completamente responsivas',
    text: 'Optimización SEO y diseño profesional para destacar tu negocio.'
  },
  {
    img: '/img/slider_servicio_softwares_a_medida.webp',
    title: 'Desarrollo de software a medida',
    text: 'Soluciones tecnológicas personalizadas para tu empresa.'
  }
]
</script>