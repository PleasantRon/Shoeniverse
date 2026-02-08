<script setup>
import { ref, onMounted } from 'vue'
const cats = [
  { title: 'Walk Majestically', subtitle: 'High Fashion Shoes', emoji: '👑' },
  { title: 'Run with Power', subtitle: 'Performance Runners', emoji: '⚡' },
  { title: 'Comfort Casual', subtitle: 'Everyday Essentials', emoji: '☁️' }
]
const visible = ref([])
onMounted(()=>cats.forEach((_,i)=>setTimeout(()=>visible.value.push(i), i*140)))
</script>

<template>
  <section class="categories">
    <div class="wrap">
      <h2>Shop by Style</h2>
      <div class="grid">
        <div v-for="(c,i) in cats" :key="i" :class="{ show: visible.includes(i) }" class="cat">
          <div class="emoji">{{c.emoji}}</div>
          <h3>{{c.title}}</h3>
          <p class="sub">{{c.subtitle}}</p>
          <p class="desc">Explore curated picks to match the mood.</p>
          <button class="link">Explore →</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.categories{padding:48px 20px;background:linear-gradient(180deg,#f6f7fb,#fff)}
.wrap{max-width:1100px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px}
.cat{padding:22px;border-radius:12px;background:white;border:1px solid #eee;transform:translateY(22px);opacity:0;transition:all .45s}
.cat.show{transform:none;opacity:1}
.emoji{font-size:36px}
.link{margin-top:12px;padding:8px 14px;border-radius:8px;border:1px solid #ddd;background:transparent}
</style>
