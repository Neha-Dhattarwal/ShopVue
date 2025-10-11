<template>
  <div class="shopping-cart">
    <h1 class="page-title">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart">
      <span class="empty-icon">🛒</span>
      <h2>Your cart is empty</h2>
      <p>Add some products to get started!</p>
      <button @click="router.push('/')" class="continue-shopping-btn">
        Continue Shopping
      </button>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.title" class="item-image" />

          <div class="item-details">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-price">₹{{ item.price.toLocaleString('en-IN') }}</p>
          </div>

          <div class="item-controls">
            <div class="quantity-control">
              <label :for="`quantity-${item.id}`" class="quantity-label">Qty:</label>
              <select
                :id="`quantity-${item.id}`"
                :value="item.quantity"
                @change="updateQuantity(item.id, Number(($event.target as HTMLSelectElement).value))"
                class="quantity-select"
              >
                <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
              </select>
            </div>

            <div class="item-subtotal">
              <span class="subtotal-label">Subtotal:</span>
              <span class="subtotal-value">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
            </div>

            <button @click="removeItem(item.id)" class="remove-btn" title="Remove item">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-card">
          <h2 class="summary-title">Order Summary</h2>

          <div class="summary-details">
            <div class="summary-row">
              <span>Items ({{ cartStore.itemCount }}):</span>
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

          <button @click="router.push('/checkout')" class="checkout-btn">
            Proceed to Checkout
          </button>

          <button @click="router.push('/')" class="continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
}
</script>

<style scoped>
.shopping-cart {
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

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-cart h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 1rem 0;
}

.empty-cart p {
  font-size: 1.1rem;
  color: #666;
  margin: 1rem 0 2rem 0;
}

.continue-shopping-btn {
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

.continue-shopping-btn:hover {
  transform: scale(1.05);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.cart-item:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.item-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 8px;
  background: #f8f9fa;
  padding: 0.5rem;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  line-height: 1.4;
}

.item-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #667eea;
  margin: 0;
}

.item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-label {
  font-weight: 600;
  color: #2c3e50;
}

.quantity-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.quantity-select:focus {
  outline: none;
  border-color: #667eea;
}

.item-subtotal {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
}

.subtotal-label {
  font-size: 0.9rem;
  color: #666;
}

.subtotal-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.remove-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #ff6b6b;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ff6b6b;
  transform: scale(1.1);
}

.cart-summary {
  position: sticky;
  top: 100px;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.summary-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

.summary-divider {
  height: 2px;
  background: #e0e0e0;
  margin: 0.5rem 0;
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

.checkout-btn,
.continue-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.checkout-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
}

.continue-btn {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.continue-btn:hover {
  background: #f8f9fa;
}

@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .shopping-cart {
    padding: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-controls {
    grid-column: 1 / -1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .item-subtotal {
    align-items: center;
  }
}
</style>
