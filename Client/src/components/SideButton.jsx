"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Link from "next/link";

const SideButton = (props) => {
  const activeLink = `${props.link}`;

  return (
    <div>
      <Link href={activeLink}>
        <Button
          variant={props.type}
          disableElevation={true}
          style={{
            backgroundColor: props.color,
            borderRadius: "12px",
            width: "10vw",
            display: "flex",
            justifyContent: "flex-start",
            paddingLeft: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            gap: "1rem",
            color: props.textColor,
          }}>
          <FontAwesomeIcon icon={props.icon} style={{ fontSize: "20px" }} />
          <div style={{ margin: "0 0 0 6px", fontSize: "13px" }}>
            {props.title}
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default SideButton;
