<script setup>
// 
import { ref, onMounted } from 'vue'
// 
const testimonials = [
  { name:'Sarah', role:'Style Fan', text:'Lovely shoes, arrived fast!', avatar:'👩' },
  { name:'Marcus', role:'Runner', text:'Great performance and fit.', avatar:'👨' },
  { name:'Amara', role:'Blogger', text:'Beautiful craftsmanship.', avatar:'👩‍🦳' }
]
// Animate testimonials with staggered fade-in
const visible=ref([])
onMounted(()=>testimonials.forEach((_,i)=>setTimeout(()=>visible.value.push(i), i*110)))
</script>

<template>
  <section class="testimonials">
    <div class="wrap">
      <h2>What Customers Say</h2>
      <div class="grid">
        <blockquote v-for="(t,i) in testimonials" :key="i" :class="{ show: visible.includes(i) }" class="quote">
          <p>“{{t.text}}”</p>
          <footer>{{t.avatar}} {{t.name}} — <small>{{t.role}}</small></footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials{padding:48px 20px;background:#fff}
.wrap{max-width:1100px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
.quote{padding:20px;border-radius:12px;border:1px solid #6d3d3d;background:linear-gradient(180deg,#fff,#fbfbfb);transform:translateY(18px);opacity:0;transition:all .45s}
.quote.show{transform:none;opacity:1}
.quote footer{margin-top:12px;color:#666;font-size:13px}
</style>
