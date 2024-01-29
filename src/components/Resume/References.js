import React from 'react'

const References = () => {
  return (
      <>
          <div className="form-group-wrapper mt-3">
              <div
                  className="form-group-title"
                  data-bs-toggle="collapse"
                  data-bs-target="#information"
                  aria-expanded="true"
                  aria-controls="information">
                  <p>References</p>
                  <div className="bottom-arrow">
                      <img src="/img/icons/bottom-arrow.svg" alt="" />
                  </div>
              </div>

              <div className="information-form collapse show" id="information">
                  <p>Please name your references</p>
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
                                      placeholder="First name"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Job Title*:</p>
                                  </div>
                                  <input
                                      id=""
                                      type="text"
                                      name=""
                                      className="form-control"
                                      placeholder="Type job position"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Phone/Mobile*:</p>
                                  </div>
                                  <input
                                      id=""
                                      type="number"
                                      name=""
                                      className="form-control"
                                      placeholder="Type Phone number"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Email*:</p>
                                  </div>
                                  <input
                                      id="location_address"
                                      type="email"
                                      name="location_address"
                                      className="form-control"
                                      placeholder="Enter email address"
                                  />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default References