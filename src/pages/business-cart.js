import AppLayout from '@/components/Layouts/AppLayout'
const BusinessCartPage = () => {
  return (
      <>
          <AppLayout>
              <div className="business-cart">
                  <div className="business-wrapper">
                      <div className="business-cart-item-select">
                          <div className="business-select-count">
                              <div className="business-select-input">
                                  <input
                                      type="checkbox"
                                      name=""
                                      id="selectItem"
                                  />
                                  <label htmlFor="selectItem">
                                      SELECT ALL (4 ITEM(S))
                                  </label>
                              </div>
                              <button className="business-select-delete">
                                  <span>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 16 16"
                                          fill="none">
                                          <path
                                              d="M6.5 2.9375V3.125H9.5V2.9375C9.5 2.53968 9.34196 2.15814 9.06066 1.87684C8.77936 1.59554 8.39782 1.4375 8 1.4375C7.60218 1.4375 7.22064 1.59554 6.93934 1.87684C6.65804 2.15814 6.5 2.53968 6.5 2.9375ZM5.5625 3.125V2.9375C5.5625 2.29103 5.81931 1.67105 6.27643 1.21393C6.73355 0.756807 7.35353 0.5 8 0.5C8.64647 0.5 9.26645 0.756807 9.72357 1.21393C10.1807 1.67105 10.4375 2.29103 10.4375 2.9375V3.125H14.6562C14.7806 3.125 14.8998 3.17439 14.9877 3.26229C15.0756 3.3502 15.125 3.46943 15.125 3.59375C15.125 3.71807 15.0756 3.8373 14.9877 3.92521C14.8998 4.01311 14.7806 4.0625 14.6562 4.0625H13.5624L12.8124 13.0085C12.7554 13.6879 12.4453 14.321 11.9434 14.7825C11.4416 15.2439 10.7847 15.5 10.103 15.5H5.897C5.21532 15.4999 4.55854 15.2438 4.0568 14.7823C3.55506 14.3209 3.24498 13.6878 3.188 13.0085L2.438 4.0625H1.34375C1.21943 4.0625 1.1002 4.01311 1.01229 3.92521C0.924386 3.8373 0.875 3.71807 0.875 3.59375C0.875 3.46943 0.924386 3.3502 1.01229 3.26229C1.1002 3.17439 1.21943 3.125 1.34375 3.125H5.5625ZM4.12213 12.9301C4.15945 13.3752 4.36261 13.79 4.69134 14.0923C5.02007 14.3947 5.45038 14.5625 5.897 14.5625H10.103C10.5497 14.5626 10.9801 14.3948 11.3089 14.0924C11.6377 13.7901 11.8409 13.3752 11.8783 12.9301L12.6215 4.0625H3.3785L4.12213 12.9301ZM7.0625 6.59375C7.0625 6.53219 7.05038 6.47124 7.02682 6.41437C7.00326 6.3575 6.96873 6.30582 6.92521 6.26229C6.88168 6.21877 6.83 6.18424 6.77313 6.16068C6.71626 6.13712 6.65531 6.125 6.59375 6.125C6.53219 6.125 6.47124 6.13712 6.41437 6.16068C6.3575 6.18424 6.30582 6.21877 6.26229 6.26229C6.21877 6.30582 6.18424 6.3575 6.16068 6.41437C6.13712 6.47124 6.125 6.53219 6.125 6.59375V12.0312C6.125 12.0928 6.13712 12.1538 6.16068 12.2106C6.18424 12.2675 6.21877 12.3192 6.26229 12.3627C6.30582 12.4062 6.3575 12.4408 6.41437 12.4643C6.47124 12.4879 6.53219 12.5 6.59375 12.5C6.65531 12.5 6.71626 12.4879 6.77313 12.4643C6.83 12.4408 6.88168 12.4062 6.92521 12.3627C6.96873 12.3192 7.00326 12.2675 7.02682 12.2106C7.05038 12.1538 7.0625 12.0928 7.0625 12.0312V6.59375ZM9.40625 6.125C9.665 6.125 9.875 6.335 9.875 6.59375V12.0312C9.875 12.1556 9.82561 12.2748 9.73771 12.3627C9.6498 12.4506 9.53057 12.5 9.40625 12.5C9.28193 12.5 9.1627 12.4506 9.07479 12.3627C8.98689 12.2748 8.9375 12.1556 8.9375 12.0312V6.59375C8.9375 6.335 9.1475 6.125 9.40625 6.125Z"
                                              fill="#5C5E61"
                                          />
                                      </svg>
                                  </span>
                                  <span>Delete</span>
                              </button>
                          </div>
                      </div>
                      <div className="business-cart-item">
                          <div className="shopping-cart-con">
                              <div className="shopping-cart-header">
                                  <div className="shopping-cart-header-left">
                                      <input type="checkbox" id="cart" />
                                      <label htmlFor="cart">
                                          Maliha Unique Collection
                                      </label>
                                  </div>
                                  <div className="shopping-cart-header-right">
                                      <p>
                                          Earliest Delivery:
                                          <span>22 Jan</span>
                                      </p>
                                  </div>
                              </div>
                              <div className="shopping-cart-wrapper">
                                  <div className="shopping-cart-item">
                                      <div className="shopping-cart-checkbox">
                                          <input type="checkbox" />
                                      </div>
                                      <div className="shopping-cart-item-content">
                                          <div className="shopping-cart-img">
                                              <img
                                                  src="/img/product/shopping-cart-1.png"
                                                  alt=""
                                              />
                                          </div>
                                          <div>
                                              <div className="shopping-cart-item-title">
                                                  <h1>
                                                      High Quality Velvet Shawl
                                                      & Stone works, Comfortable
                                                      Soft Winter Wear Velvet
                                                      Chador
                                                  </h1>
                                                  <p>
                                                      <span>No Brand</span>,
                                                      Size:
                                                      <span>Int: One size</span>
                                                      , Color Family:
                                                      <span> Black</span>
                                                  </p>
                                              </div>
                                              <div className="shopping-cart-price-item">
                                                  <h2 className="shopping-cart-price">
                                                      ৳ 250
                                                  </h2>
                                                  <h4>৳ 1,000</h4>
                                                  <span>75%</span>
                                                  <div className="shopping-deleting-btn">
                                                      <button className="shopping-love-btn">
                                                          <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 18 18"
                                                              fill="none">
                                                              <path
                                                                  d="M12.5156 2.39062C11.0391 2.39062 9.75516 3.05648 9 4.17234C8.24484 3.05648 6.96094 2.39062 5.48438 2.39062C4.36589 2.39193 3.29359 2.83682 2.50271 3.62771C1.71182 4.41859 1.26693 5.49089 1.26562 6.60938C1.26563 8.6625 2.54531 10.7993 5.06953 12.9593C6.22621 13.9449 7.47564 14.8162 8.80031 15.5609C8.8617 15.5938 8.93031 15.6111 9 15.6111C9.06969 15.6111 9.1383 15.5938 9.19969 15.5609C10.5244 14.8162 11.7738 13.9449 12.9305 12.9593C15.4547 10.7993 16.7344 8.6625 16.7344 6.60938C16.7331 5.49089 16.2882 4.41859 15.4973 3.62771C14.7064 2.83682 13.6341 2.39193 12.5156 2.39062ZM9 14.703C7.84617 14.0372 2.10938 10.5272 2.10938 6.60938C2.11031 5.71456 2.46618 4.85665 3.09892 4.22392C3.73165 3.59118 4.58956 3.23531 5.48438 3.23438C6.91031 3.23438 8.10773 3.99586 8.60977 5.22211C8.64155 5.29949 8.69562 5.36567 8.7651 5.41224C8.83459 5.45882 8.91635 5.48369 9 5.48369C9.08365 5.48369 9.16541 5.45882 9.2349 5.41224C9.30438 5.36567 9.35845 5.29949 9.39023 5.22211C9.89227 3.99586 11.0897 3.23438 12.5156 3.23438C13.4104 3.23531 14.2683 3.59118 14.9011 4.22392C15.5338 4.85665 15.8897 5.71456 15.8906 6.60938C15.8906 10.5272 10.1538 14.0372 9 14.703Z"
                                                                  fill="#898989"
                                                              />
                                                          </svg>
                                                      </button>
                                                      <button className="shopping-delete-btn">
                                                          <svg
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              width="18"
                                                              height="18"
                                                              viewBox="0 0 18 18"
                                                              fill="none">
                                                              <path
                                                                  d="M12.5156 2.39062C11.0391 2.39062 9.75516 3.05648 9 4.17234C8.24484 3.05648 6.96094 2.39062 5.48438 2.39062C4.36589 2.39193 3.29359 2.83682 2.50271 3.62771C1.71182 4.41859 1.26693 5.49089 1.26562 6.60938C1.26563 8.6625 2.54531 10.7993 5.06953 12.9593C6.22621 13.9449 7.47564 14.8162 8.80031 15.5609C8.8617 15.5938 8.93031 15.6111 9 15.6111C9.06969 15.6111 9.1383 15.5938 9.19969 15.5609C10.5244 14.8162 11.7738 13.9449 12.9305 12.9593C15.4547 10.7993 16.7344 8.6625 16.7344 6.60938C16.7331 5.49089 16.2882 4.41859 15.4973 3.62771C14.7064 2.83682 13.6341 2.39193 12.5156 2.39062ZM9 14.703C7.84617 14.0372 2.10938 10.5272 2.10938 6.60938C2.11031 5.71456 2.46618 4.85665 3.09892 4.22392C3.73165 3.59118 4.58956 3.23531 5.48438 3.23438C6.91031 3.23438 8.10773 3.99586 8.60977 5.22211C8.64155 5.29949 8.69562 5.36567 8.7651 5.41224C8.83459 5.45882 8.91635 5.48369 9 5.48369C9.08365 5.48369 9.16541 5.45882 9.2349 5.41224C9.30438 5.36567 9.35845 5.29949 9.39023 5.22211C9.89227 3.99586 11.0897 3.23438 12.5156 3.23438C13.4104 3.23531 14.2683 3.59118 14.9011 4.22392C15.5338 4.85665 15.8897 5.71456 15.8906 6.60938C15.8906 10.5272 10.1538 14.0372 9 14.703Z"
                                                                  fill="#898989"
                                                              />
                                                          </svg>
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="shopping-cart-quntity">
                                          <button>-</button>
                                          <span>1</span>
                                          <button>+</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="business-cart-item">
                          <div className="shopping-cart-con">
                              <div className="shopping-cart-header">
                                  <h2 className="shopping-cart-title">
                                      Delivery address:
                                  </h2>
                              </div>
                              <div className="row mt-3">
                                  <div className="col-md-12 ">
                                      <div className="delivery-input-item">
                                          <label htmlFor="">
                                              Full Name <span> *</span>
                                          </label>
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Full Name"
                                          />
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="delivery-input-item">
                                          <label htmlFor="">
                                              Address <span> *</span>
                                          </label>
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Address"
                                          />
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="row">
                                          <div className="col-md-6">
                                              <div className="delivery-input-item">
                                                  <label htmlFor="">
                                                      Mobile Number
                                                      <span> *</span>
                                                  </label>
                                                  <input
                                                      className="form-control"
                                                      type="phone"
                                                      placeholder="Mobile number"
                                                  />
                                              </div>
                                          </div>
                                          <div className="col-md-6">
                                              <div className="delivery-input-item">
                                                  <label htmlFor="">
                                                      Email Adress
                                                      <span> *</span>
                                                  </label>
                                                  <input
                                                      className="form-control"
                                                      type="phone"
                                                      placeholder="Email Adress"
                                                  />
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="col-md-12">
                                      <div className="delivery-input-checkbox">
                                          <input type="checkbox" id="save" />
                                          <label htmlFor="save">
                                              Save address for later use.
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="business-cart-item">
                          <div className="shopping-cart-con">
                              <div className="shopping-cart-header">
                                  <h2 className="shopping-cart-title">
                                      Order Summary
                                  </h2>
                              </div>
                              <div className="row mt-4">
                                  <div className="col-md-8 mx-auto">
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
                                      <div className="order-play-price-item-apply">
                                          <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter Voucher Code"
                                          />
                                          <button className="order-apply-btn">
                                              APPLY
                                          </button>
                                      </div>
                                      <div className="order-play-price-item order-play-price-total">
                                          <p>Total</p>
                                          <p>-৳ 79</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <button className="custom-btn order-play-btn">
                          PLACE ORDER
                      </button>
                  </div>
              </div>
          </AppLayout>
      </>
  )
}

export default BusinessCartPage