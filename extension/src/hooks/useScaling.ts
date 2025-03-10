import { request } from "http";
import { useRef, useState } from "react";


function getScaling() {
  const plasmo = document.querySelector('plasmo-csui');
  if (!plasmo) return "1";
  const computedStyles = window.getComputedStyle(plasmo);
  const fontSize = computedStyles.fontSize;
  const match = fontSize.match(/(\d+)px/);
  
  if (match) {
    return (16/parseInt(match[1])).toFixed(2);
  }

  return "1";
}

export function useScaling() {
  const scale = useRef(getScaling()).current;
  return {scale};
}