<script setup>
import { cart } from '../store.js'
import { ref, computed } from 'vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: ''
})

// track order placement
const orderPlaced = ref(false)

// to calculate subtotal, tax, and total for the order summary
const subtotal = computed(() => cart.getTotal())
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + tax.value)

// if any is false, submit button will be disabled. ensures that users fill in all required fields before placing an order.
const isFormValid = computed(() => {
  return formData.value.firstName &&
    formData.value.lastName &&
    formData.value.email &&
    formData.value.address &&
    formData.value.city &&
    formData.value.state &&
    formData.value.zipCode &&
    formData.value.cardNumber &&
    formData.value.cardExpiry &&
    formData.value.cardCVC
})

const handleSubmit = () => {
  if (!isFormValid.value) {
    alert('Please fill in all fields')
    return
  }

  // display when order is placed
  alert('Thank you for walking the shoeniverse! Your shoes will be delivered soon.')
  orderPlaced.value = true
  
  // Clear cart and reset
  setTimeout(() => {
    cart.clearCart()
    resetForm()
    window.dispatchEvent(new CustomEvent('show-catalog'))
  }, 1000)
}

// reset form and order status after successful order placement 
const resetForm = () => {
  formData.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  }
  orderPlaced.value = false
}

// switch back to cart view if user clicks back button on checkout page
const goBack = () => {
  window.dispatchEvent(new CustomEvent('show-cart'))
}
</script>

<template>
  <div class="checkout-container">
    <h2>Checkout</h2>

    <div class="checkout-content">
      <form @submit.prevent="handleSubmit" class="checkout-form">
        <div class="form-section">
          <h2>Shipping Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label>First Name *</label>
              <input 
                v-model="formData.firstName" 
                type="text" 
                placeholder="Ron"
                required
              />
            </div>
            <div class="form-group">
              <label>Last Name </label>
              <input 
                v-model="formData.lastName" 
                type="text"
                placeholder="Ami"
                required
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Email </label>
              <input 
                v-model="formData.email" 
                type="email"
                placeholder="Ron@example.com"
                required
              />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input 
                v-model="formData.phone" 
                type="tel"
                placeholder="+234"
              />
            </div>
          </div>

          <div class="form-group full">
            <label>Address</label>
            <input 
              v-model="formData.address" 
              type="text"
              placeholder="123 My Street"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>City</label>
              <input 
                v-model="formData.city" 
                type="text"
                placeholder="PH"
                required
              />
            </div>
            <div class="form-group">
              <label>State</label>
              <input 
                v-model="formData.state" 
                type="text"
                placeholder="Rivs"
                required
              />
            </div>
            <div class="form-group">
              <label>ZIP Code</label>
              <input 
                v-model="formData.zipCode" 
                type="text"
                placeholder="10000"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Payment Information</h3>
          <div class="form-group full">
            <label>Card Number</label>
            <input 
              v-model="formData.cardNumber" 
              type="text"
              placeholder="1234 5678 9012 3456"
              maxlength="19"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Expiry Date *</label>
              <input 
                v-model="formData.cardExpiry" 
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                required
              />
            </div>
            <div class="form-group">
              <label>CVC</label>
              <input 
                v-model="formData.cardCVC" 
                type="text"
                placeholder="123"
                maxlength="4"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" @click="goBack" class="back-btn">Back to Cart</button>
          <button type="submit" :disabled="!isFormValid" class="submit-btn">Place Order</button>
        </div>
      </form>

      <div class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-items">
          <div v-for="item in cart.items" :key="item.id" class="summary-item">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>₦{{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
        <div class="summary-line">
          <span>Subtotal:</span>
          <span>₦{{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-line">
          <span>Tax (10%):</span>
          <span>₦{{ tax.toFixed(2) }}</span>
        </div>
        <div class="summary-line total">
          <span>Total:</span>
          <span>₦{{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.checkout-container h2 {
  margin: 0 0 30px 0;
  color: #2c3e50;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.checkout-form {
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-section {
  margin-bottom: 30px;
}

.form-section:last-of-type {
  margin-bottom: 0;
}

.form-section h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  color: #2c3e50;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-row.three {
  grid-template-columns: 1fr 1fr 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  margin-bottom: 6px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-group input {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;
}

.back-btn,
.submit-btn {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.back-btn {
  background: #f0f0f0;
  color: #333;
}

.back-btn:hover {
  background: #e0e0e0;
}

.submit-btn {
  background: #42b983;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #359268;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.order-summary {
  background: #f9f9f9;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.order-summary h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.summary-items {
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.summary-line.total {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px solid #ddd;
  font-weight: bold;
  font-size: 16px;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .order-summary {
    position: static;
  }
}
</style>
