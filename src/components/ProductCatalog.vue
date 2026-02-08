<script setup>
import { products, cart } from '../store.js'
import ProductCard from './ProductCard.vue'
import HeroSection from './HeroSection.vue'
import FeaturesSection from './FeaturesSection.vue'
import CategoriesSection from './CategoriesSection.vue'
import TestimonialsSection from './TestimonialsSection.vue'

// add products
const handleAddToCart = (product) => { cart.addToCart(product) }
</script>

<template>
  <div class="catalog">
    <HeroSection />
    <CategoriesSection />
    <div class="products-section">
      <div class="products-container">
        <div class="catalog-header">
          <h2>Featured Collection</h2>
          <p>Explore our selection of premium shoes</p>
        </div>
        <div class="products-grid">
          <ProductCard v-for="product in products" :key="product.id" :product="product" @add-to-cart="handleAddToCart" />
        </div>
      </div>
    </div>
    <FeaturesSection />
    <TestimonialsSection />
  </div>
</template>

<style scoped>
.catalog {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.catalog-header {
  text-align: center;
  margin-bottom: 40px;
}

.catalog-header h2 {
  margin: 0 0 10px 0;
  font-size: 32px;
  color: #2c3e50;
}

.catalog-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
