"use client";

import React, { forwardRef } from "react";
import styles from "./ClearGlassButton.module.css";

/**
 * Premium Apple-Inspired Clear Glass Button (Liquid Glass)
 *
 * Optical Characteristics:
 * - Exact 17px border radius strictly preserved
 * - Genuine optical backdrop transmission with photon saturation amplification & refraction blur
 * - Asymmetric curved specular overhead reflection (35% key-light bias)
 * - Multi-frequency edge refraction bevel with razor-sharp rim specular highlight
 * - Diagonal prismatic sheen with overlay color-bleed
 * - Fluid Apple spring transitions for hover, active, and focus states
 * - 100% cross-browser reliability (Chrome, Edge, Safari macOS/iOS, Firefox)
 *
 * @param {Object} props
 * @param {string} [props.label="Clear Glass"] - Button text label (used if children not provided)
 * @param {React.ReactNode} [props.children] - Custom child content (overrides label)
 * @param {React.ReactNode} [props.icon] - Leading icon element
 * @param {React.ReactNode} [props.suffixIcon] - Trailing icon element
 * @param {"auto"|"dark"|"light"} [props.theme="auto"] - Adaptive optical color profile
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Size variant (all maintain 17px radius)
 * @param {boolean} [props.disabled=false] - Disabled interaction state
 * @param {"button"|"submit"|"reset"} [props.type="button"] - HTML button type
 * @param {string} [props.className=""] - Additional custom CSS classes
 * @param {React.CSSProperties} [props.style={}] - Inline style overrides
 * @param {boolean} [props.showBackdrop=true] - Toggle backdrop blur & refraction layer
 * @param {boolean} [props.showReflection=true] - Toggle curved specular reflection layer
 * @param {boolean} [props.showEdgeRefraction=true] - Toggle edge bevel refraction layer
 * @param {boolean} [props.showSheen=true] - Toggle surface sheen gloss layer
 */
export const ClearGlassButton = forwardRef(function ClearGlassButton(
  {
    label = "Clear Glass",
    children,
    icon = null,
    suffixIcon = null,
    theme = "auto",
    size = "md",
    disabled = false,
    type = "button",
    className = "",
    style = {},
    showBackdrop = true,
    showReflection = true,
    showEdgeRefraction = true,
    showSheen = true,
    ...restProps
  },
  ref
) {
  // Size variant mapping
  const sizeClass =
    size === "sm"
      ? styles.sizeSm
      : size === "lg"
      ? styles.sizeLg
      : styles.sizeMd;

  // Theme variant mapping
  const themeClass =
    theme === "light"
      ? styles.themeLight
      : theme === "dark"
      ? styles.themeDark
      : "";

  const combinedClass = [
    styles.clearGlassButton,
    sizeClass,
    themeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentText = children !== undefined ? children : label;

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-disabled={disabled ? "true" : undefined}
      className={combinedClass}
      style={style}
      {...restProps}
    >
      {/* Layer 1: Backdrop Optical Transmission & Refraction */}
      {showBackdrop && (
        <span className={styles.backdrop} aria-hidden="true" />
      )}

      {/* Layer 2: Edge Refraction Illusion & Inset Bevel */}
      {showEdgeRefraction && (
        <span className={styles.edgeRefraction} aria-hidden="true" />
      )}

      {/* Layer 3: Curved Specular Overhead Environmental Reflection */}
      {showReflection && (
        <span className={styles.specularReflection} aria-hidden="true" />
      )}

      {/* Layer 4: Surface Sheen & Prismatic Dispersion */}
      {showSheen && (
        <span className={styles.surfaceSheen} aria-hidden="true" />
      )}

      {/* Layer 5: Razor-sharp Optical Content */}
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {contentText && <span className={styles.label}>{contentText}</span>}
        {suffixIcon && <span className={styles.icon}>{suffixIcon}</span>}
      </span>
    </button>
  );
});

ClearGlassButton.displayName = "ClearGlassButton";

export default ClearGlassButton;
