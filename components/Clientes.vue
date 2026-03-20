<template>
  <section id="clientes" class="py-5 text-center">
    <h3>Clientes</h3>

    <div class="row">
      <div class="col-6 col-md-2" v-for="logo in logos" :key="logo">
        <img :src="logo" class="img-fluid" />
      </div>
    </div>
  </section>
</template>

<script setup>
const logos = [
  '/img/clientes/logo_aero_trans.webp',
  '/img/clientes/logo_eps.webp',
  '/img/clientes/logo_black_in_power.webp',
  '/img/clientes/logo_box_music.webp',
  '/img/clientes/logo_cpradel.webp',
  '/img/clientes/logo_hl.webp',
  '/img/clientes/logo_mauricio_aguilar.webp',
  '/img/clientes/logo_mcr.webp',
  '/img/clientes/logo_osler.webp',
  '/img/clientes/logo_perfumes_complices.webp',
  '/img/clientes/logo_piedra_laja.webp',
  '/img/clientes/logo_primer_transfer.webp',
  '/img/clientes/logo_todo_evento_spa.webp',
  '/img/clientes/logo_tonerrecicla.webp',
  '/img/clientes/logo_unionx.webp',
  '/img/clientes/logo_val.webp',
  '/img/clientes/logo_zumelzu.webp'
]

</script>