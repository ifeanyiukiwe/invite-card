import React from "react";
import { useLocation } from "react-router-dom";
import "./InviteCard.css";
import patternticket from "../assets/images/pattern-ticket.svg";
import imageavatar from "../assets/images/image-avatar.jpg";
import icongithub from "../assets/images/icon-github.svg";
import logofull from "../assets/images/logo-full.svg";
import patternbottom from "../assets/images/pattern-squiggly-line-bottom-desktop.svg";
import patterntop from "../assets/images/pattern-squiggly-line-top.svg";

function InviteCard() {
  const location = useLocation();
  const inviteData =
    location.state || JSON.parse(localStorage.getItem("inviteData")) || {};

  return (
    <div className="main">
      <img src={patterntop} alt="Pattern Top" className="pattern-top" />
      <img
        src={patternbottom}
        alt="Pattern Bottom"
        className="pattern-bottom"
      />
      <div>
        <img src={logofull} alt="Logo Full" className="logo-full" />
      </div>
      <h1>
        Congrats,{" "}
        <span style={{ color: "#f57463" }}>
          {inviteData.fullName || "Guest"}
        </span>
        ! <br />
        Your ticket is ready.
      </h1>
      <p>
        We've emailed your ticket to <br />
        <span style={{ color: "#f57463" }}>
          {inviteData.email || "N/A"}
        </span>{" "}
        and will send updates in <br /> the run-up to the event.
      </p>

      <div
        className="card-details"
        style={{ position: "relative", marginTop: "40px" }}
      >
        {/* Pattern Ticket (Background) */}
        <img
          src={patternticket}
          alt="Pattern Ticket"
          className="patternticket"
          // style={{
          //   position: "absolute",
          //   top: 0,
          //   left: 0,
          //   width: "100%",
          //   height: "100%",
          //   zIndex: "-1",
          // }}
        />

        {/* Ticket Number */}
        <small
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "rotate(270deg) translateY(-50%)",
            color: "gray",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {inviteData.uniqueNumber}
        </small>

        {/* Top-left details */}
        <div
          className="card-detail-top"
          style={{
            position: "absolute",
            top: "10px",
            left: "20px",
            color: "#fff",
            fontSize: "14px",
          }}
        >
          <img
            src={logofull}
            alt="Logo Full"
            className="logo-full"
            style={{ width: "150px" }}
          />
          <p style={{ margin: "5px 0 0", fontWeight: "bold" }}>
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}{" "}
            / Austin, TX
          </p>
        </div>

        {/* User Details */}
        <div
          className="card-detail-bottom"
          style={{
            position: "absolute",
            bottom: "10px",
            left: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#fff",
          }}
        >
          <img
            src={inviteData.image || imageavatar}
            alt="Avatar"
            className="uploaded-avatar"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {inviteData.fullName || "Guest"}
            </p>
            <p
              style={{
                margin: "2px 0 0",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <img
                src={icongithub}
                alt="GitHub Icon"
                style={{ width: "16px", marginLeft: "5px" }}
              />
              <span>{inviteData.github || "@unknown"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteCard;
