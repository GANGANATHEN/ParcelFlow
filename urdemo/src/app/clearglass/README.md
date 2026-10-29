# Apple-Inspired Liquid Glass Button (`ClearGlassButton`)

A production-quality, reusable clear glass button inspired by Apple's Liquid Glass design language (VisionOS, iOS 18).

---

## 💎 Visual Architecture & Optical Physics

Unlike basic frosted-glass buttons that rely on a simple `blur(10px)` and white border (which looks milky on dark surfaces and disappears on white), this button uses a layered **optical composite** that emulates genuine transparent polished glass:

1. **True Transparency & Light Transmission**:
   - The base glass slab uses ultra-thin tinting (`rgba(255, 255, 255, 0.16)` fading to `0.03`) so background colors, text, and patterns remain completely visible.
   - `backdrop-filter: blur(20px) saturate(185%) brightness(105%) contrast(102%)` (with `-webkit-backdrop-filter`).
   - The `185%` saturation boost prevents the glass from looking cloudy, ensuring background colors beneath the lens appear vivid and rich.

2. **Curved Specular Environmental Reflection**:
   - Positioned across the upper 58% of the button dome.
   - Elliptical radial gradient (`radial-gradient(ellipse 120% 100% at 50% -20%, ...)`) simulating an overhead studio softbox or ambient sky reflection on a polished glass cylinder.

3. **Edge Refraction Illusion & Inset Bevel**:
   - Total internal reflection and rim refraction simulated via multi-frequency inset box shadows:
     - `inset 0 1px 1px 0 rgba(255, 255, 255, 0.85)`: Specular hairline along the top rim.
     - `inset 0 2px 5px 0 rgba(255, 255, 255, 0.22)`: Diffuse bevel light.
     - `inset 0 -1.5px 3px 0 rgba(0, 0, 0, 0.16)`: Grounding ambient occlusion at the bottom edge.
     - `inset 1px 0 2px 0 / -1px 0 2px 0`: Lateral rim luminance.

4. **Surface Sheen & Prismatic Luster**:
   - Diagonal gloss flare blended via `mix-blend-mode: overlay` adding 3D physical presence.

5. **Exact 17px Border Radius**:
   - Boundary radius is strictly locked to `17px` across the container, backdrop filter, and all reflection masks.

---

## 🚀 Quick Usage

```jsx
import { ClearGlassButton } from "@/app/clearglass";
import { Sparkles } from "lucide-react";

export default function Example() {
  return (
    <ClearGlassButton
      size="md"
      theme="auto"
      icon={<Sparkles size={16} />}
      onClick={() => console.log("Clicked")}
    >
      Clear Glass
    </ClearGlassButton>
  );
}
```

---

## ⚙️ Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `"Clear Glass"` | Text label (fallback when `children` is omitted). |
| `children` | `ReactNode` | `undefined` | Custom content inside button. |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size variant. **All sizes retain 17px border radius**. |
| `theme` | `"auto" \| "dark" \| "light"` | `"auto"` | Color & reflection profile optimized for surface brightness. |
| `icon` | `ReactNode` | `null` | Optional leading icon. |
| `suffixIcon` | `ReactNode` | `null` | Optional trailing icon. |
| `disabled` | `boolean` | `false` | Disables interaction, applies desaturated glass filter. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type attribute. |
| `className` | `string` | `""` | Additional CSS class names. |
| `style` | `CSSProperties` | `{}` | Inline style overrides. |
| `showBackdrop` | `boolean` | `true` | Toggle backdrop filter layer (useful for testing/X-Ray). |
| `showReflection` | `boolean` | `true` | Toggle curved specular reflection layer. |
| `showEdgeRefraction` | `boolean` | `true` | Toggle edge bevel refraction layer. |
| `showSheen` | `boolean` | `true` | Toggle surface sheen layer. |

---

## 🎨 Background Adaptability Matrix

| Background Type | Behavior & Optical Strategy |
| :--- | :--- |
| **Pure White / Light** | Uses `theme="light"`. Dark charcoal text (`#0f172a`) with white text-shadow, calibrated rim shading so the glass remains distinct and tactile without washing out. |
| **Dark / Black** | High-contrast white typography with ambient shadow, luminous top specular highlight, and vibrant light transmission of background elements. |
| **Vibrant Gradient** | `saturate(185%)` amplifies background colors without causing cloudiness; diagonal surface luster glides across the color spectrum. |
| **Photographic Imagery** | Complex textures, horizon lines, and silhouettes diffuse cleanly through the 20px Gaussian blur. |

---

## 🌐 Cross-Browser Compatibility

| Browser | Status | Implementation Details |
| :--- | :---: | :--- |
| **Google Chrome** (desktop & Android) | Full Support | Hardware-accelerated `backdrop-filter`, radial gradients, GPU composited. |
| **Apple Safari** (macOS & iOS) | Full Support | Supported via `-webkit-backdrop-filter`. Fluid touch response and tap highlight removal. |
| **Microsoft Edge** | Full Support | Chromium-based rendering matching Chrome performance. |
| **Mozilla Firefox** | Full Support | Supported since Firefox 103 with full backdrop-filter and CSS blend modes. |
| **Legacy / Filter Disabled** | Graceful Fallback | Detected via `@supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px)))`. Renders semi-translucent tinted surfaces (`rgba(30, 34, 46, 0.82)` / `rgba(245, 246, 250, 0.92)`) keeping 100% legibility and 17px geometry intact. |

### Accessibility Features:
- **`prefers-reduced-motion`**: Disables all spring transforms and transition animations.
- **Windows High Contrast Mode (`forced-colors: active`)**: Adapts automatically to system colors (`ButtonBorder`, `ButtonText`, `ButtonFace`, `Highlight`).
- **Keyboard Navigation**: Native `<button>` semantics with visible 2px offset focus ring.

