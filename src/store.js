import { reactive } from 'vue'

//products, ued an array of objects.
export const products = [
  {
    id: 1,
    name: 'Classic Runner Pro',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight running shoe with excellent cushioning'
  },
  {
    id: 2,
    name: 'Madam Koi Koi',
    price: 45000,
    image: 'https://adaptabilitymy.com/wp-content/uploads/2014/10/Red-high-heel-women-shoes-on-white-background.jpg',
    description: 'Perfect for date nights and sexual innuendos'
  },
  {
    id: 3,
    name: 'Apex Trail Runner',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    description: 'Built for off-road adventures and tough terrain'
  },
  {
    id: 4,
    name: 'Elite Red Wings Boots',
    price: 80000,
    image: 'https://4feetshoes.com/cdn/shop/products/Brown037498-01.jpg?v=1647291335&width=1080',
    description: 'High-ankle boots for offshore workers'
  },
  {
    id: 5,
    name: 'Comfort Casual Walk',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
    description: 'All-day comfort for walking and casual activities'
  },
  {
    id: 6,
    name: 'Sprint Speed Racer',
    price: 60000,
    image: 'https://vader-prod.s3.amazonaws.com/1695157095-nbfuelcellscelitev3-650a09c421c24.jpg',
    description: 'Aeodynamic design for maximum speed and agility'
  }
]

// if product already there then increase it by one if not just add it to cart
export const cart = reactive({
  items: [],

  addToCart(product) {
    const existingItem = this.items.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        ...product,
        quantity: 1
      })
    }
  },

  //basically remove the item from the cart by filtering out the item with the given productId
  removeFromCart(productId) {
    this.items = this.items.filter(item => item.id !== productId)
  },

  //update the quantity of a specific item in the cart. It finds the item by its productId and updates its quantity but only if the new quantity is greater than 0.
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId)
    if (item && quantity > 0) {
      item.quantity = quantity
    }
  },

  // always remeber to return. (total price of all items in the cart by multiplying the price of each item by its quantity and summing them up)
  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0)
  },

  // 
  clearCart() {
    this.items = []
  }
})
