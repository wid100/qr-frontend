import React from 'react'

const Heading = () => {
  return (
      <>
          <div className="form-group-wrapper mt-3">
              <div
                  className="form-group-title"
                  data-bs-toggle="collapse"
                  data-bs-target="#information"
                  aria-expanded="true"
                  aria-controls="information">
                  <p>Heading</p>
                  <div className="bottom-arrow">
                      <img src="/img/icons/bottom-arrow.svg" alt="" />
                  </div>
              </div>

              <div className="information-form collapse show" id="information">
                  <p>
                      Introduce your business or organization in a few words.
                      Optionally, add a button to a website of your choice.
                      Fields marked with a * are mandatory.
                  </p>
                  <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-md-10">
                          <div className="row mt-4">
                              <div className="col-md-6">
                                  <div className="info-form-label mb-2">
                                      <p>First Name*:</p>
                                  </div>
                                  <input
                                      id="first_name"
                                      type="text"
                                      name="first_name"
                                      className="form-control"
                                      placeholder="First name"
                                  />
                              </div>
                              <div className="col-md-6">
                                  <div className="info-form-label mb-2">
                                      <p>Last Name*:</p>
                                  </div>
                                  <input
                                      id="last_name"
                                      type="text"
                                      name="last_name"
                                      className="form-control"
                                      placeholder="Last Name"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Profession*:</p>
                                  </div>
                                  <input
                                      id="profession"
                                      type="text"
                                      name="profession"
                                      className="form-control"
                                      placeholder="Type your profession"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Address*:</p>
                                  </div>
                                  <input
                                      id="address"
                                      type="text"
                                      name="address"
                                      className="form-control"
                                      placeholder="Enter your Address"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="info-form-label mb-2">
                                              <p>City*:</p>
                                          </div>
                                          <input
                                              id="city"
                                              type="text"
                                              name="city"
                                              className="form-control"
                                              placeholder="Enter your City"
                                          />
                                      </div>
                                      <div className="col-md-6">
                                          <div className="info-form-label mb-2">
                                              <p>Postal Code*:</p>
                                          </div>
                                          <input
                                              id="postal_code"
                                              type="text"
                                              name="postal_code"
                                              className="form-control"
                                              placeholder="Postal code"
                                          />
                                      </div>
                                  </div>
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="info-form-label mb-2">
                                              <p>Country*:</p>
                                          </div>
                                          <select
                                              className="form-select form-control"
                                              aria-label="Default select example">
                                              <option selected>
                                                  Select Your Country
                                              </option>
                                              <option value="1">One</option>
                                              <option value="2">Two</option>
                                              <option value="3">Three</option>
                                          </select>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Heading