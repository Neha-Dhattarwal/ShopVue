<template>
  <div class="checkout">
    <h1 class="page-title">Checkout</h1>

    <div v-if="!orderPlaced" class="checkout-content">
      <div class="checkout-form-section">
        <div class="form-card">
          <h2 class="section-title">Shipping Information</h2>

          <form @submit.prevent="handleSubmit" class="checkout-form">
            <div class="form-group">
              <label for="name" class="form-label">Full Name *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                class="form-input"
                :class="{ error: errors.name }"
                placeholder="John Doe"
              />
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address *</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ error: errors.email }"
                placeholder="john@example.com"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <div class="form-group">
              <label for="address" class="form-label">Shipping Address *</label>
              <textarea
                id="address"
                v-model="form.address"
                class="form-textarea"
                :class="{ error: errors.address }"
                placeholder="123 Main Street, City, State, PIN"
                rows="4"
              ></textarea>
              <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
            </div>

            <button type="submit" class="place-order-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>

      <div class="order-summary-section">
        <div class="summary-card">
          <h2 class="section-title">Order Summary</h2>

          <div class="summary-items">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="summary-item"
            >
              <img :src="item.image" :alt="item.title" class="summary-item-image" />
              <div class="summary-item-details">
                <p class="summary-item-title">{{ item.title }}</p>
                <p class="summary-item-qty">Qty: {{ item.quantity }}</p>
              </div>
              <p class="summary-item-price">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</p>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>₹{{ cartStore.total.toLocaleString('en-IN') }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping:</span>
              <span class="free-shipping">FREE</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total-row">
              <span>Total:</span>
              <span class="total-amount">₹{{ cartStore.total.toLocaleString('en-IN') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="order-confirmation">
      <div class="success-animation">
        <div class="checkmark-circle">
          <div class="checkmark"></div>
        </div>
      </div>
      <h2 class="success-title">Order Placed Successfully!</h2>
      <p class="success-message">Thank you for your purchase. Your order has been confirmed.</p>
      <p class="order-number">Order #{{ orderNumber }}</p>
      <button @click="router.push('/')" class="back-home-btn">
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const form = reactive({
  name: '',
  email: '',
  address: ''
})

const errors = reactive({
  name: '',
  email: '',
  address: ''
})

const orderPlaced = ref(false)
const orderNumber = ref('')

const validateForm = (): boolean => {
  let isValid = true

  errors.name = ''
  errors.email = ''
  errors.address = ''

  if (!form.name.trim()) {
    errors.name = 'Full name is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email address is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.address.trim()) {
    errors.address = 'Shipping address is required'
    isValid = false
  }

  return isValid
}

const generateOrderNumber = (): string => {
  return 'ORD' + Date.now().toString().slice(-8)
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  if (cartStore.items.length === 0) {
    router.push('/cart')
    return
  }

  orderNumber.value = generateOrderNumber()
  orderPlaced.value = true
  cartStore.clearCart()
}
</script>

<style scoped>
.checkout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 2rem 0;
  text-align: center;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.form-card,
.summary-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
}

.form-input,
.form-textarea {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ff6b6b;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.place-order-btn {
  padding: 1.2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.place-order-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.order-summary-section {
  position: sticky;
  top: 100px;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background: #f8f9fa;
}

.summary-item-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 4px;
}

.summary-item-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.summary-item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.summary-item-qty {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
}

.summary-item-price {
  font-weight: 700;
  color: #667eea;
  margin: 0;
  white-space: nowrap;
}

.summary-divider {
  height: 2px;
  background: #e0e0e0;
  margin: 1rem 0;
}

.summary-totals {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: #666;
}

.free-shipping {
  color: #4caf50;
  font-weight: 600;
}

.total-row {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.total-amount {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.order-confirmation {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  animation: scaleIn 0.5s ease;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.success-animation {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.checkmark-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 0.6s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.checkmark {
  width: 40px;
  height: 60px;
  border-right: 8px solid white;
  border-bottom: 8px solid white;
  transform: rotate(45deg);
  animation: checkmarkDraw 0.4s ease 0.2s backwards;
}

@keyframes checkmarkDraw {
  from {
    width: 0;
    height: 0;
  }
  to {
    width: 40px;
    height: 60px;
  }
}

.success-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1rem 0;
}

.success-message {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 1rem 0;
}

.order-number {
  font-size: 1.1rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 2rem 0;
}

.back-home-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.back-home-btn:hover {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .form-card,
  .summary-card {
    padding: 1.5rem;
  }

  .success-title {
    font-size: 2rem;
  }
}
</style>
