import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "src/assets/images/logo.svg";
import logoLightImg from "src/assets/images/logo-light.svg";

const Logo = ({ img = logoImg, imgLight = logoLightImg, className = "" }) => {
  return (
    <Link
      href={"/"}
      className={`ttnc-logo inline-block text-primary-6000 ${className}`}
    >
      {img ? (
        <Image
          className={`block max-h-12 ${imgLight ? "dark:hidden" : ""}`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <Image
          className="hidden max-h-12 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;
