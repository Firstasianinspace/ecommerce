<template>
  <div class="product-gallery">
    <client-only>
      <swiper
        ref="swiperThumbs"
        class="swiper gallery-thumbs"
        :options="swiperOptionThumbs"
      >
        <swiper-slide
          v-for="image in images"
          :key="image.id"
          class="slide-1 product-gallery__thumb-image"
          :style="{ backgroundImage: 'url(' + image.url + ')' }"
        />
      </swiper>
      <swiper
        ref="swiperTop"
        :options="swiperOptionTop"
        class="swiper gallery-main"
      >
        <swiper-slide
          v-for="image in images"
          :key="image.id"
          class="slide product-gallery__main-image"
          :style="{ backgroundImage: 'url(' + image.url + ')' }"
        />
        <div
          slot="button-next"
          class="swiper-button-next swiper-button-white"
        ></div>
        <div
          slot="button-prev"
          class="swiper-button-prev swiper-button-white"
        ></div>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'ProductGallery',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    swiperOptionTop: {
      loop: true,
      centeredSlides: true,
      loopedSlides: 5,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    },
    swiperOptionThumbs: {
      loop: true,
      loopedSlides: 5,
      direction: 'vertical',
      spaceBetween: 10,
      slidesPerView: 5,
      centeredSlides: true,
      touchRatio: 0.2,
      slideToClickedSlide: true,
    },
  }),
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  },
}
</script>

<style lang="scss" scoped>
.product-gallery {
  overflow: hidden;
  display: grid;
  grid-template-columns: 15% 75%;
  height: 600px;
}
.swiper {
  width: 100%;
}
.gallery-main {
  width: 100%;
}
.product-gallery__main-image {
  padding-bottom: 85%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.product-gallery__thumb-image {
  height: 100%;
  width: 100%;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>