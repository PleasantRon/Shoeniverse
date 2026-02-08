<script setup>
import { ref, onMounted } from 'vue'
const features = [
  { icon: '🚚', title: 'We Deliver Nationwide', desc: 'Fast reliable shipping across the country.' },
  { icon: '👑', title: 'High Fashion', desc: 'Walk majestically with our high-fashion collection.' },
  { icon: '💎', title: 'Premium Quality', desc: 'Carefully selected premium materials.' }
]
// animate
const visible = ref([])
onMounted(() => features.forEach((_,i)=>setTimeout(()=>visible.value.push(i), i*120)))
</script>

<template>
  <section class="features">
    <div class="wrap">
      <h2>Why Shoeniverse</h2>
      <div class="grid">
        <article v-for="(f,i) in features" :key="i" :class="{ show: visible.includes(i) }" class="card">
          <div class="icon">{{f.icon}}</div>
          <h3>{{f.title}}</h3>
          <p>{{f.desc}}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features{padding:48px 20px;background:#fff}
.wrap{max-width:1100px;margin:0 auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px}
.card{padding:20px;border-radius:12px;border:1px solid #eee;background:linear-gradient(180deg,#fff,#fafafa);transform:translateY(18px);opacity:0;transition:all .45s}
.card.show{transform:none;opacity:1}
.icon{font-size:32px;margin-bottom:10px}
</style>
