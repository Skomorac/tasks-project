import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "react-bootstrap";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="container main-container-home">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">{t("welcome_to_remindme")}</h1>
        <p className="hero-subtitle">{t("hero_subtitle")}</p>
        <Button
          onClick={() => navigate("/login")}
          variant="primary"
          className="cta-button"
        >
          {t("get_started")}
        </Button>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>{t("about_title")}</h2>
        <p>{t("about_description")}</p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>{t("features_title")}</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>{t("feature_one_title")}</h3>
            <p>{t("feature_one_description")}</p>
          </div>
          <div className="feature-item">
            <h3>{t("feature_two_title")}</h3>
            <p>{t("feature_two_description")}</p>
          </div>
          <div className="feature-item">
            <h3>{t("feature_three_title")}</h3>
            <p>{t("feature_three_description")}</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>{t("cta_title")}</h2>
        <Button
          onClick={() => navigate("/signup")}
          variant="success"
          className="cta-button"
        >
          {t("sign_up_now")}
        </Button>
      </section>
    </div>
  );
};

export default Home;
