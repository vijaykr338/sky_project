"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

export default function LoadingProvider() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen") === "true";

    setShow(!seen);
    setChecked(true);
  }, []);

  if (!checked) return null;

  return show ? <LoadingScreen /> : null;
}