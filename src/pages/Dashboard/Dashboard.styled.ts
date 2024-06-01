import styled from "styled-components";

export const Stats = styled.div`
  color: #9a9a9a;
  font-weight: 300;

  i {
    margin-right: 5px;
    position: relative;
    top: 0px;
    color: #66615b;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh;

  .wrapper-full-page {
    min-height: 100vh;
    height: auto;
  }
`;

export const MainPainel = styled.div`
  width: 100%;
  background-color: transparent;
  transition: all 0.5s cubic-bezier(0.685, 0.0473, 0.346, 1);

  @media screen and (max-width: 991px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .content {
      padding-left: 15px;
      padding-right: 15px;
    }
    .card-stats [class*="col-"] .statistics::after {
      display: none;
    }
    .card .form-horizontal .col-md-3.col-form-label {
      text-align: left;
    }
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
  background-color: #ffffff;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  border: 0 none;
  transition: transform 300ms cubic-bezier(0.34, 2, 0.6, 1),
    box-shadow 200ms ease;

  .footer .stats {
    color: #9a9a9a;
    font-weight: 300;
  }
  .category,
  .card-category {
    text-transform: capitalize;
    font-weight: 400;
    color: #9a9a9a;
    font-size: 0.7142em;
  }

  .card-body.table-full-width {
    padding-left: 0;
    padding-right: 0;
  }
  .card-header {
    padding: 15px 15px 0;
    border: 0;
  }
  .card-header:not([data-background-color]) {
    background-color: transparent;
  }
  .card-header .card-title {
    margin-top: 10px;
  }
  .map {
    border-radius: 3px;
  }
  .map.map-big {
    height: 500px;
  }
  .image {
    overflow: hidden;
    height: 200px;
    position: relative;
  }
  .avatar {
    width: 30px;
    height: 30px;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  .numbers {
    text-align: right;
    font-size: 2rem;
  }
  .big-title {
    font-size: 12px;
    text-align: center;
    font-weight: 500;
    padding-bottom: 15px;
  }
  label {
    font-size: 0.8571em;
    margin-bottom: 5px;
    color: #9a9a9a;
  }
  .card-footer {
    background-color: transparent;
    border: 0;
  }
  .card-footer .stats i {
    margin-right: 5px;
    position: relative;
    top: 0px;
    color: #66615b;
  }
  .card-footer .btn {
    margin: 0;
  }
  .card-plain {
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
  }
  .card-plain .card-body {
    padding-left: 5px;
    padding-right: 5px;
  }
  .card-plain img {
    border-radius: 12px;
  }
  .card-user .image {
    height: 130px;
  }
  .card-user .image img {
    border-radius: 12px;
  }

  .card-user .author {
    text-align: center;
    text-transform: none;
    margin-top: -77px;
  }
  .card-user .author a + p.description {
    margin-top: -7px;
  }

  .card-user .avatar {
    width: 124px;
    height: 124px;
    border: 1px solid #ffffff;
    position: relative;
  }

  .card-user .card-body {
    min-height: 240px;
  }

  .card-user hr {
    margin: 5px 15px 15px;
  }

  .card-user .card-body + .card-footer {
    padding-top: 0;
  }

  .card-user .card-footer h5 {
    font-size: 1.25em;
    margin-bottom: 0;
  }

  .card-user .button-container {
    margin-bottom: 6px;
    text-align: center;
  }
`;

export const Icon = styled.div`
  display: inline-block;
  font: normal normal normal 14px / 1 "nucleo-icons";
  font-size: inherit;
  speak: none;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: yellow;
`;
