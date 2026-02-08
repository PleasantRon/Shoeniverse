<script setup>
import { ref, onMounted } from 'vue'
const visible = ref(false)
// animate
onMounted(() => { setTimeout(() => visible.value = true, 80) })
</script>

<template>
  <section class="hero" :class="{ 'visible': visible }">
    <div class="hero-inner">
      <div class="hero-text">
        <h1>Step Into Style</h1>
        <p>Discover premium shoes — we deliver nationwide.</p>
        <div class="hero-actions">
          <button @click="$emit('show-shop')" class="btn-primary">Shop Now</button>
          <button class="btn-ghost">Learn More</button>
        </div>
      </div>
      <div class="hero-visual">👟</div>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: 56px 20px; background: linear-gradient(135deg,#fff 0%,#f7f7f9 100%); overflow:hidden; }
.hero-inner { max-width:1200px; margin:0 auto; display:flex; gap:32px; align-items:center; justify-content:space-between; }
.hero-text h1 { margin:0 0 12px 0; font-size:42px; font-weight:700; }
.hero-text p { margin:0 0 18px 0; color:#555; }
.hero-actions { display:flex; gap:12px }
.btn-primary { background:#2f6bff; color:white; border:none; padding:12px 22px; border-radius:10px; cursor:pointer }
.btn-ghost { background:transparent; border:1px solid #ccc; padding:10px 18px; border-radius:10px }
.hero-visual { font-size:120px; opacity:0.95 }
.hero.visible { transform: translateY(0); transition: all 700ms ease; }
@media (max-width:768px){ .hero-inner{flex-direction:column; text-align:center}.hero-visual{font-size:72px} }
</style>
