import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="container main-container-dashboard">
      <h1>{t("dashboard")}</h1>
    </div>
  );
};

export default Dashboard;
