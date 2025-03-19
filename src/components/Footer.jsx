import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "10px", color: "#fff" }}>
      &copy; {currentYear} All rights reserved Cadinals Design.
    </footer>
  );
}

export default Footer;
