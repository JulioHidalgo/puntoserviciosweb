<template>
  <section id="nosotros" class="my-5">
    
    <h2 class="text-center text-orange mb-4">
      💡 Convertimos ideas en soluciones digitales.<br>
      <strong>
        Creamos sitios web, apps y software con innovación y compromiso.
        Si buscas un equipo profesional, estamos listos para ayudarte. 💻
      </strong>
    </h2>

    <div class="row">
      <div class="col-md-3 mb-4" v-for="p in proyectos" :key="p.title">
        <div class="card h-100">

          <img
            :src="p.img"
            loading="lazy"
            :alt="p.alt"
            class="gallery-img"
          />

          <div class="card-content p-3">
            <h5>{{ p.title }}</h5>
            <p>{{ p.desc }}</p>
          </div>

        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
const proyectos = [
  {
    img: '/img/sitios_web/web_BlackInPower.webp',
    title: 'Página Web / Black in Power',
    desc: 'Agencia de Comunicación y Marketing.',
    alt: 'Sitio web Black in Power'
  },
  {
    img: '/img/sitios_web/web_saludalmmentis.webp',
    title: 'Página Web / Salud Almmentis',
    desc: 'Centro especializado en salud mental.',
    alt: 'Sitio web Salud Almmentis'
  },
  {
    img: '/img/sitios_web/web_BajoLitoral.webp',
    title: 'Página Web / El Bajo Litoral',
    desc: 'Talleres de deportes acuáticos.',
    alt: 'Sitio web Bajo Litoral'
  },
  {
    img: '/img/sitios_web/web_insumosolar.webp',
    title: 'Página Web / Insumo Solar',
    desc: 'Suministros solares de alta calidad.',
    alt: 'Sitio web Insumo Solar'
  },
  {
    img: '/img/sitios_web/web_fierroslitoral.webp',
    title: 'Página Web / Fierros Litoral',
    desc: 'Estructuras metálicas y acero.',
    alt: 'Sitio web Fierros Litoral'
  },
  {
    img: '/img/sitios_web/web_estamosparati.webp',
    title: 'Página Web / Estamos para Ti',
    desc: 'Cuidado de adultos mayores.',
    alt: 'Sitio web Estamos para Ti'
  },
  {
    img: '/img/sitios_web/web_creatividadactiva.webp',
    title: 'Página Web / Creatividad Activa',
    desc: 'Cursos certificados.',
    alt: 'Sitio web Creatividad Activa'
  },
  {
    img: '/img/sitios_web/web_apoyosalud.webp',
    title: 'Página Web / Apoyo Salud',
    desc: 'Cuidado domiciliario.',
    alt: 'Sitio web Apoyo Salud'
  },
  {
    img: '/img/sitios_web/web_homecodigua.webp',
    title: 'Página Web / Home Codigua',
    desc: 'Tienda para el hogar.',
    alt: 'Sitio web Home Codigua'
  },
  {
    img: '/img/sitios_web/web_tecniclean.webp',
    title: 'Página Web / Tecniclean',
    desc: 'Tratamiento de agua.',
    alt: 'Sitio web Tecniclean'
  },
  {
    img: '/img/sitios_web/web_karinatorres.webp',
    title: 'Página Web / Constructor Civil',
    desc: 'Ingeniería y construcción.',
    alt: 'Sitio web Constructor Civil'
  },
  {
    img: '/img/sitios_web/web_geoconsultores.webp',
    title: 'Página Web / GeoConsultores',
    desc: 'Diseño y construcción.',
    alt: 'Sitio web GeoConsultores'
  },
  {
    img: '/img/sitios_web/web_cpradel.webp',
    title: 'Página Web / CPradel',
    desc: 'Construcción integral.',
    alt: 'Sitio web CPradel'
  },
  {
    img: '/img/sitios_web/web_mauricioaguilar.webp',
    title: 'Página Web / Política',
    desc: 'Servicio comunitario.',
    alt: 'Sitio web político'
  },
  {
    img: '/img/sitios_web/web_marcorellana.webp',
    title: 'Página Web / Consejero Regional',
    desc: 'Políticas locales.',
    alt: 'Sitio web consejero'
  },
  {
    img: '/img/sitios_web/web_robertobarra.webp',
    title: 'Página Web / Concejal',
    desc: 'Servicio comunitario.',
    alt: 'Sitio web concejal'
  },
  {
    img: '/img/sitios_web/web_rodrigourzua.webp',
    title: 'Página Web / Senador',
    desc: 'Políticas públicas.',
    alt: 'Sitio web senador'
  },
  {
    img: '/img/sitios_web/web_hlcomputacion.webp',
    title: 'Página Web / HLComputación',
    desc: 'Insumos tecnológicos.',
    alt: 'Sitio web HLComputación'
  },
  {
    img: '/img/sitios_web/web_sheriff.webp',
    title: 'Página Web / Sheriff',
    desc: 'Cercos eléctricos.',
    alt: 'Sitio web Sheriff'
  },
  {
    img: '/img/sitios_web/web_papelfotografico.webp',
    title: 'Página Web / Papel Fotográfico',
    desc: 'Suministros de oficina.',
    alt: 'Sitio web papel fotográfico'
  },
  {
    img: '/img/sitios_web/web_arandanomarketing.cl.webp',
    title: 'Página Web / ArandanoMarketing',
    desc: 'Marketing digital.',
    alt: 'Sitio web ArandanoMarketing'
  },
  {
    img: '/img/sitios_web/software_aguarural.webp',
    title: 'Software / Agua Rural',
    desc: 'Control de consumo de agua.',
    alt: 'Software agua rural'
  },
  {
    img: '/img/sitios_web/app_smarthome.webp',
    title: 'App / HomeLight',
    desc: 'Control de luces.',
    alt: 'App HomeLight'
  },
  {
    img: '/img/sitios_web/app_vecindad.webp',
    title: 'App / Vecindad',
    desc: 'Marketplace comunitario.',
    alt: 'App Vecindad'
  }
]
</script>