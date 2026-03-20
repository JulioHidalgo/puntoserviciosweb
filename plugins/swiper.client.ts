import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default defineNuxtPlugin(() => {
  if (process.client) {
    window.Swiper = Swiper;
  }
});