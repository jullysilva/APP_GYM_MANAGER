/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Profile.css";
import hike from "../../assets/HIKE.png";
import profile from "../../assets/hikebanner.png";
import user from "../../assets/user-profile.svg";
import UploadImage from "./UploadImage";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const ProfileTwo = () => {
  return (
    <div className="p-4">
      <div className="main-panel">
        <div className="content">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-user">
                <div className="image mw-25">
                  <img className="" src={hike} alt="..." />
                </div>
                <div className="card-body">
                  <UploadImage />
                  <div className="row align-items-center text-center">
                    <p className="col mb-0">Idade</p>
                    <p className="col mb-0">42</p>
                  </div>
                  <div className="row align-items-center text-center">
                    <p className="col mb-0">Cargo</p>
                    <p className="col mb-0">Sub-Gerente</p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="row justify-content-between align-items-center">
                    <h4 className="card-title col-8">Administradores</h4>
                    <button className="btn btn-sm btn-outline-success btn-round btn-icon col-4">
                      <FaPlus className="" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled team-members">
                    {true && (
                      <li>
                        <div className="row">
                          <div className="col-md-2 col-2">
                            <div className="avatar">
                              <img
                                src={user}
                                alt="Circle Image"
                                className="img-circle img-no-padding img-responsive"
                              />
                            </div>
                          </div>
                          <div className="col-md-7 col-7">
                            DJ Khaled
                            <br />
                            <span className="text-muted">
                              <small>Offline</small>
                            </span>
                          </div>
                          <div className="col-md-3 col-3 text-right">
                            <button className="btn btn-sm btn-outline-success btn-round btn-icon">
                              <MdEdit />
                            </button>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card card-user">
                <div className="card-header">
                  <h5 className="card-title">Edit Profile</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row">
                      <div className="col-md-5 pr-1">
                        <div className="form-group">
                          <label>Company (disabled)</label>
                          <input
                            type="text"
                            className="form-control"
                            disabled
                            placeholder="Company"
                            value="Creative Code Inc."
                          />
                        </div>
                      </div>
                      <div className="col-md-3 px-1">
                        <div className="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            value="michael23"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pl-1">
                        <div className="form-group">
                          <label>Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 pr-1">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Company"
                            value="Chet"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 pl-1">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            value="Faker"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Home Address"
                            value="Melbourne, Australia"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 pr-1">
                        <div className="form-group">
                          <label>City</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="City"
                            value="Melbourne"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 px-1">
                        <div className="form-group">
                          <label>Country</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Country"
                            value="Australia"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 pl-1">
                        <div className="form-group">
                          <label>Postal Code</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="ZIP Code"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>About Me</label>
                          <textarea className="form-control textarea">
                            Oh so, your weak rhyme You doubt I'll bother,
                            reading into it
                          </textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="update ml-auto mr-auto">
                        <button
                          type="submit"
                          className="btn btn-primary btn-round"
                        >
                          Update Profile
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
  );
};

export default ProfileTwo;
