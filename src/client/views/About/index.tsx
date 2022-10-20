import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button/Button";
import Welcome from "@/components/Welcome/Welcome";
import { useTestStore } from "@/store";

export default function About() {
  const navigate = useNavigate();
  const { version } = useTestStore();
  return (
    <>
      <Welcome />
      <Button click={() => navigate("/")}>Home {version}</Button>
    </>
  );
}
