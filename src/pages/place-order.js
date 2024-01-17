import AppLayout from '@/components/Layouts/AppLayout'
import React, { useState } from 'react'

const PlaceOrder = () => {

    const [orderCard, setOrderCard]=useState(1);

    const handleOrderCard=(index)=>{
        setOrderCard(index)
    }
  return (
      <>
          <AppLayout>
              <div className="business-cart">
                  <div className="business-wrapper">
                      <div className="business-cart-item">
                          <div className="shopping-cart-con">
                              <div className="shopping-cart-header">
                                  <h2 className="shopping-cart-title">
                                      Order Summary
                                  </h2>
                              </div>
                              <div className="row mt-4">
                                  <div className="col-md-8 mx-auto ">
                                      <div className="order-play-price-item">
                                          <p>Subtotal (4 items)</p>
                                          <p>৳ 439</p>
                                      </div>
                                      <div className="order-play-price-item">
                                          <p>Shipping Fee</p>
                                          <p>৳ 189</p>
                                      </div>
                                      <div className="order-play-price-item">
                                          <p>Shipping Fee Discount </p>
                                          <p>-৳ 79</p>
                                      </div>
                                      <div className="order-play-price-item order-play-price-total">
                                          <p>Total</p>
                                          <p>-৳ 79</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="business-cart-item">
                          <div className="shopping-cart-con">
                              <div className="shopping-cart-header">
                                  <h2 className="shopping-cart-title">
                                      Select Payment Method
                                  </h2>
                              </div>
                              <div className="order-payment-wrapper">
                                  <div className="order-payment-header">
                                      <div
                                          onClick={() => handleOrderCard(1)}
                                          className={`${
                                              orderCard === 1
                                                  ? 'order-payment-item active'
                                                  : 'order-payment-item'
                                          }`}>
                                          <div className="order-payment-item-list">
                                              <div className="payment-logo-img">
                                                  <img
                                                      src="/img/product/payment-logo-1.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <span>Credit/Debit Card</span>
                                          </div>
                                      </div>
                                      <div
                                          onClick={() => handleOrderCard(2)}
                                          className={`${
                                              orderCard === 2
                                                  ? 'order-payment-item active'
                                                  : 'order-payment-item'
                                          }`}>
                                          <div className="order-payment-item-list">
                                              <div className="payment-logo-img">
                                                  <img
                                                      src="/img/product/payment-logo-2.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <span>NAGAD</span>
                                          </div>
                                      </div>
                                      <div
                                          onClick={() => handleOrderCard(3)}
                                          className={`${
                                              orderCard === 3
                                                  ? 'order-payment-item active'
                                                  : 'order-payment-item'
                                          }`}>
                                          <div className="order-payment-item-list">
                                              <div className="payment-logo-img">
                                                  <img
                                                      src="/img/product/payment-logo-3.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <span>NAGAD</span>
                                          </div>
                                      </div>
                                      <div
                                          onClick={() => handleOrderCard(3)}
                                          className={`${
                                              orderCard === 3
                                                  ? 'order-payment-item active'
                                                  : 'order-payment-item'
                                          }`}>
                                          <div className="order-payment-item-list">
                                              <div className="payment-logo-img">
                                                  <img
                                                      src="/img/product/payment-logo-3.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <span>NAGAD</span>
                                          </div>
                                      </div>
                                      <div
                                          onClick={() => handleOrderCard(5)}
                                          className={`${
                                              orderCard === 3
                                                  ? 'order-payment-item active'
                                                  : 'order-payment-item'
                                          }`}>
                                          <div className="order-payment-item-list">
                                              <div className="payment-logo-img">
                                                  <img
                                                      src="/img/product/payment-logo-3.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <span>NAGAD</span>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="order-payment-body-content">
                                      <div
                                          className={`order-payment-content-item ${
                                              orderCard === 1 ? 'active' : ''
                                          }`}>
                                          <form action="">
                                              <div className="order-visa-img">
                                                  <img
                                                      src="/img/product/visa.png"
                                                      alt=""
                                                  />
                                              </div>
                                              <div className="row mt-3">
                                                  <div className="col-md-12">
                                                      <div className="order-payment-input">
                                                          <label htmlFor="cardNumber">
                                                              Card number
                                                              <span>*</span>
                                                          </label>
                                                          <input
                                                              id="cardNumber"
                                                              className="form-control"
                                                              type="number"
                                                              required
                                                              placeholder="Card number"
                                                          />
                                                      </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                      <div className="order-payment-input">
                                                          <label htmlFor="nameCard">
                                                              Name on card
                                                              <span>*</span>
                                                          </label>
                                                          <input
                                                              id="nameCard"
                                                              className="form-control"
                                                              type="text"
                                                              required
                                                              placeholder="Name on card"
                                                          />
                                                      </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                      <div className="row">
                                                          <div className="col-md-6">
                                                              <div className="order-payment-input">
                                                                  <label htmlFor="date">
                                                                      Expiration
                                                                      date
                                                                      <span>
                                                                          *
                                                                      </span>
                                                                  </label>
                                                                  <input
                                                                      className="form-control"
                                                                      id="date"
                                                                      type="date"
                                                                      required
                                                                  />
                                                              </div>
                                                          </div>
                                                          <div className="col-md-6">
                                                              <div className="order-payment-input">
                                                                  <label htmlFor="cvv">
                                                                      CVV
                                                                      <span>
                                                                          *
                                                                      </span>
                                                                  </label>
                                                                  <input
                                                                      className="form-control"
                                                                      id="cvv"
                                                                      type="text"
                                                                      required
                                                                      placeholder="CVV"
                                                                  />
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                                  <div className="col-md-12">
                                                      <h4 className="order-save-card">
                                                          Save Card
                                                      </h4>
                                                      <p>
                                                          We will save this card
                                                          for your convenience.
                                                          If required, you can
                                                          remove the card in the
                                                          "Payment Options"
                                                          section in the
                                                          "Account" menu.
                                                      </p>

                                                      <button
                                                          className="custom-btn pay-now-btn"
                                                          type="submit">
                                                          PAY NOW
                                                      </button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </AppLayout>
      </>
  )
}

export default PlaceOrder