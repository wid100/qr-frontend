import React, { useState } from 'react'

const OrderPrice = () => {

        // State variables
        const [price, setPrice] = useState(0)
        const [discount, setDiscount] = useState(0)
        const [quantity, setQuantity] = useState(0)

        // Calculate total function
        const calculateTotal = () => {
            const subtotal = price * quantity
            const discountAmount = (subtotal * discount) / 100
            const total = subtotal - discountAmount

            return total
        }
  return (
      <>
          <div className="shopping-cart-con">
              <div className="shopping-cart-header">
                  <h2 className="shopping-cart-title">Order Summary</h2>
              </div>
              <div className="row mt-4">
                  <div className="col-md-8 mx-auto">
                      <div className="order-play-price-item">
                          <p>Subtotal ({quantity} items)</p>
                          <p>৳ {price * quantity}</p>
                      </div>
                      <div className="order-play-price-item">
                          <p>Discount</p>
                          <p>-৳ {(price * quantity * discount) / 100}</p>
                      </div>
                      <div className="order-play-price-item order-play-price-total">
                          <p>Total</p>
                          <p>৳ {calculateTotal()}</p>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default OrderPrice