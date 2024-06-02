import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/Home.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="container main-container">
      <h1>{t("welcome")}</h1>
    </div>
  );
};

export default Home;
