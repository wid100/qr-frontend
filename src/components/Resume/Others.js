
import React from 'react'

const Others = () => {
  return (
      <>
          <div className="form-group-wrapper mt-3">
              <div
                  className="form-group-title"
                  data-bs-toggle="collapse"
                  data-bs-target="#information"
                  aria-expanded="true"
                  aria-controls="information">
                  <p>Others</p>
                  <div className="bottom-arrow">
                      <img src="/img/icons/bottom-arrow.svg" alt="" />
                  </div>
              </div>

              <div className="information-form collapse show" id="information">
                  <p>Describe other details</p>
                  <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-md-10">
                          <div className="row mt-4">
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Skills:</p>
                                  </div>
                                  <input
                                      id=""
                                      type="text"
                                      name=""
                                      className="form-control"
                                      placeholder="Name the skills"
                                  />
                                  <p>Suggested based on your profile</p>
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Language:</p>
                                  </div>
                                  <input
                                      id="employer_name"
                                      type="text"
                                      name="employer_name"
                                      className="form-control"
                                      placeholder="Name the language"
                                  />
                              </div>
                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Proficiency:</p>
                                  </div>
                                  <input
                                      id="location_address"
                                      type="text"
                                      name="location_address"
                                      className="form-control"
                                      placeholder="Type your address"
                                  />
                              </div>

                              <div className="col-md-12 mt-3">
                                  <div className="info-form-label mb-2">
                                      <p>Interests:</p>
                                  </div>
                                  <div className="mb-3">
                                      <input
                                          id="location_address"
                                          type="text"
                                          name="location_address"
                                          className="form-control"
                                          placeholder="Type your interest"
                                      />
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

export default Others