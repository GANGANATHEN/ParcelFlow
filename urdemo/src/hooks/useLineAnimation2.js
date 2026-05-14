"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { morphConfig } from "@/app/draw1/components/pathData";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Flip, MorphSVGPlugin);

export default function useLineAnimation({ refs }) {
  useEffect(() => {
    if (!refs || !refs.current) return;

    // draw line main container
    const scope = refs.current.scope;

    // line animations
    const wings = refs.current.wings;
    const path = refs.current.path;

    // buttons and wraps
    const btnWraps = refs.current.btnWraps;

    if (!scope || !path) return;
    morphConfig.forEach((item) => {
      MorphSVGPlugin.convertToPath(item.shape);
      MorphSVGPlugin.convertToPath(item.target);
    });

    const wingsLength = wings.getTotalLength();
    const pathLength = path.getTotalLength();

    // LINE DRAW
    const speed = 0.18;

    // LINE INIT
    gsap.set(wings, {
      strokeDasharray: wingsLength,
      strokeDashoffset: wingsLength,
    });

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // SVG SHAPE INIT
    const allShapes = morphConfig.flatMap((item) => [item.shape, item.target]);

    gsap.set(allShapes, {
      transformOrigin: "50% 50%",
    });

    // FALL SVG ICONS INIT
    gsap.set(
      [
        "#iconStar1",
        "#iconStar2",
        "#iconStar3",
        "#iconStar4",
        "#iconStar5",
        "#iconStar6",
        "#iconStar7",
      ],
      { opacity: 0, scale: 0 },
    );

    // for line height
    const svg = scope.querySelector("#wrap");

    // function getDynamicEnd() {
    //   const renderedSvgHeight = svg.getBoundingClientRect().height;
    //   const distance = renderedSvgHeight * 1.45;
    // console.log(distance);
    // return distance;
    // }

    function getDynamicEnd() {
      const renderedSvgHeight = svg.getBoundingClientRect().height;
      const distance = renderedSvgHeight * 1.45;
      console.log(distance);
      return distance;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "mainLine",
        trigger: scope,
        start: "top center",
        end: () => `+=${getDynamicEnd()}`,
        scrub: 3.6,
        invalidateOnRefresh: true,
      },
    });

    // wings (4% scroll)
    tl.to(wings, {
      strokeDashoffset: 0,
      strokeWidth: 2.5,
      ease: "none",
      duration: 0.006,
    });

    // path (96% scroll)
    tl.to(path, {
      strokeDashoffset: 0,
      strokeWidth: 2.5,
      ease: "none",
    });

    const gap = 0.02; // distance between buttons
    const startBase = 0.01;
    const end = 0.26;

    // BUTTON PATH FOLLOW
    tl.to(
      btnWraps[0],
      {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.7, 0.7],
          start: startBase,
          end: end,
        },
        ease: "none",
        duration: speed,
      },
      0,
    );

    tl.to(
      btnWraps[1],
      {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.7, 0.7],
          start: startBase + gap,
          end: end,
        },
        ease: "none",
        duration: speed,
      },
      0,
    );

    tl.to(
      btnWraps[2],
      {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.7, 0.7],
          start: startBase + gap * 3,
          end: end,
        },
        ease: "none",
        duration: speed,
      },
      0,
    );

    // BUTTONS AlIGN & STYLE
    const start1 = 0.02;
    const start2 = 0.03;

    const mid1 = start1 + (end - start1) * 0.16;
    const mid2 = start2 + (end - start2) * 0.1;
    const mid3 = start2 + (end - start2) * 0.16;

    tl.to(
      btnWraps[0],
      {
        flexDirection: "column",
        alignItems: "center",
        gap: "53px",
        marginLeft: "153px",
        marginTop: "-53px",
        duration: 0.15,
        ease: "power2.out",
      },
      mid1,
    );

    tl.to(
      btnWraps[1],
      {
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "53px",
        marginTop: "-23px",
        gap: "53px",
        duration: 0.15,
        ease: "power2.out",
      },
      mid2,
    );

    tl.to(
      btnWraps[2],
      {
        flexDirection: "column",
        alignItems: "center",
        marginTop: "-33px",
        marginLeft: "73px",
        gap: "53px",
        duration: 0.15,
        ease: "power2.out",
      },
      mid3,
    );

    // tl.to(
    //   btnWraps[0],
    //   {
    //     opacity: 0,
    //     duration: 0.04,
    //     scale: 0.3,
    //   },
    //   "0.13",
    // );

    // button inner float and heart beat animation
    btnWraps.forEach((wrap) => {
      if (!wrap || !wrap.children) return;

      Array.from(wrap.children).forEach((el, i) => {
        gsap.to(el, {
          yPercent: "random(-8,8)",
          xPercent: "random(-6,6)",
          rotate: "random(-3,3)",
          duration: "random(1.6,1.8)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          transformOrigin: "50% 50%",
        });
      });
    });

    // Button SWAP WHEN REACH END
    const swapPoint = speed;

    // morph shapes, text hide and gradient change
    morphConfig.forEach((item, i) => {
      const delay = swapPoint - 0.08 + i * 0.005;

      // morph
      tl.to(
        item.shape,
        {
          morphSVG: {
            shape: item.target,
            shapeIndex: "auto",
            type: "rotational",
          },
          duration: 0.12,
          ease: "expo.inOut",
        },
        delay,
      );

      // text hide
      tl.to(
        item.text,
        {
          opacity: 0,
          duration: 0.05,
        },
        delay + 0.02,
      );

      // gradient change
      tl.to(
        item.shape,
        {
          attr: { fill: item.gradient },
          duration: 0.15,
        },
        delay + 0.08,
      );
    });
    // --------------------------------------------------
    // RESPONSIVE PATH ANCHOR ENGINE (single source truth)
    // --------------------------------------------------

    function getAnchorPoint(progress) {
      const total = path.getTotalLength();
      const pt = path.getPointAtLength(total * progress);

      const svgRect = svg.getBoundingClientRect();
      const scopeRect = scope.getBoundingClientRect();
      const vb = svg.viewBox.baseVal;

      // convert svg viewBox units -> rendered pixels inside scope
      const scaleX = svgRect.width / vb.width;
      const scaleY = svgRect.height / vb.height;

      return {
        x: svgRect.left - scopeRect.left + pt.x * scaleX,
        y: svgRect.top - scopeRect.top + pt.y * scaleY,
      };
    }

    // all anchors from path progress
    function buildDynamicAnchors() {
      return {
        anchor1: getAnchorPoint(0.44),
        anchor2: getAnchorPoint(0.452),
        anchor3: getAnchorPoint(0.463),
        anchor4: getAnchorPoint(0.49),

        anchor5: getAnchorPoint(0.63),
        anchor6: getAnchorPoint(0.71),
        anchor7: getAnchorPoint(0.735),
        anchor8: getAnchorPoint(0.76),

        anchor9: getAnchorPoint(0.89),
        anchor10: getAnchorPoint(0.905),
        anchor11: getAnchorPoint(0.922),
        anchor12: getAnchorPoint(0.945),

        mergeAnchor: getAnchorPoint(0.79),
      };
    }

    let dynamicAnchors = buildDynamicAnchors();

    const btnAnchorKeys = [
      "anchor1",
      "anchor2",
      "anchor3",
      "anchor4",
      "anchor1",
      "anchor3",
    ];

    refs.current.buttons.forEach((btn, i) => {
      if (!btn) return;

      const delay = swapPoint + i * 0.002;

      tl.to(
        btn,
        {
          x: () => {
            const btnRect = btn.getBoundingClientRect();
            const scopeRect = scope.getBoundingClientRect();
            const target = dynamicAnchors[btnAnchorKeys[i]];

            const currentX = btnRect.left - scopeRect.left;
            return target.x - currentX - 12;
          },

          y: () => {
            const btnRect = btn.getBoundingClientRect();
            const scopeRect = scope.getBoundingClientRect();
            const target = dynamicAnchors[btnAnchorKeys[i]];

            const currentY = btnRect.top - scopeRect.top;
            return target.y - currentY - 10;
          },

          duration: 0.06,
          ease: "power2.in",
        },
        delay,
      ).to(
        btn,
        {
          opacity: 0,
          scale: 0.6,
          duration: 0.05,
        },
        delay + 0.06,
      );
    });

    function positionIcons() {
      dynamicAnchors = buildDynamicAnchors(); // refresh every resize/refresh

      const items = [
        { icon: "#iconStar1", point: dynamicAnchors.anchor1 },
        { icon: "#iconStar2", point: dynamicAnchors.anchor2 },
        { icon: "#iconStar3", point: dynamicAnchors.anchor3 },
        { icon: "#iconStar4", point: dynamicAnchors.anchor4 },
        { icon: "#iconStar5", point: dynamicAnchors.anchor5 },
        { icon: "#iconStar6", point: dynamicAnchors.anchor6 },
        { icon: "#iconStar7", point: dynamicAnchors.anchor7 },
      ];

      items.forEach((item) => {
        gsap.set(item.icon, {
          x: item.point.x - 2,
          y: item.point.y - 7,
        });
      });
    }

    positionIcons();
    ScrollTrigger.addEventListener("refresh", positionIcons);
    window.addEventListener("resize", positionIcons);

    function showDebugPoint(progress, color = "red") {
      const pt = getAnchorPoint(progress);

      const dot = document.createElement("div");
      dot.style.position = "absolute";
      dot.style.left = pt.x + "px";
      dot.style.top = pt.y + "px";
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "50%";
      dot.style.background = color;
      dot.style.zIndex = "9999";

      scope.appendChild(dot);
    }

    showDebugPoint(0.44, "red");
    showDebugPoint(0.452, "blue");
    showDebugPoint(0.463, "green");
    showDebugPoint(0.49, "yellow");

    // BUTTON scale & fade in
    btnWraps.forEach((wrap, i) => {
      tl.fromTo(
        wrap,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.12,
          ease: "back.out(1.2)",
        },
        0.02 + i * 0.03,
      );
    });

    // appear new icons
    const icons = [
      { el: "#iconStar1", at: swapPoint + 0.04 },
      { el: "#iconStar2", at: swapPoint + 0.05 },
      { el: "#iconStar3", at: swapPoint + 0.06 },
      { el: "#iconStar4", at: swapPoint + 0.07 },
      { el: "#iconStar5", at: swapPoint + 0.15 },
      { el: "#iconStar6", at: swapPoint + 0.18 },
      { el: "#iconStar7", at: swapPoint + 0.2 },
    ];

    icons.forEach((item) => {
      tl.fromTo(
        item.el,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.08,
          ease: "back.out(2)",
        },
        item.at,
      );
    });

    // other icons merge with arrow icon
    const icons1 = ["#iconStar1", "#iconStar2", "#iconStar3", "#iconStar4"];

    function getRelativePosition(target, parent) {
      const t = target.getBoundingClientRect();
      const p = parent.getBoundingClientRect();

      return {
        x: t.left - p.left,
        y: t.top - p.top,
      };
    }

    const mergeAnchor = scope.querySelector("#iconStar4");

    // iconStar2 move to anchor
    tl.addLabel("mergeMove", swapPoint + 0.1);
    tl.addLabel("blast", "mergeMove-=0.001");

    const others = icons1.filter((i) => i !== "#iconStar4");

    const blastItems = [
      {
        wrapper: "#iconStar1",
        shape: "#shape1",
        circle: "#shapeCircle1",
      },
      {
        wrapper: "#iconStar2",
        shape: "#squareShape1",
        circle: "#shapeCircle2",
      },
      {
        wrapper: "#iconStar3",
        shape: "#shape3",
        circle: "#shapeCircle3",
      },
    ];

    blastItems.forEach((item) => {
      gsap.set(item.circle, {
        scale: 0,
        transformOrigin: "50% 50%",
      });

      gsap.set(`${item.wrapper} .piece`, {
        opacity: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      });
    });

    blastItems.forEach((item, i) => {
      const delay = i * 0.001; // slight stagger between icons

      // morph → small circle
      tl.to(
        item.shape,
        {
          morphSVG: item.circle,
          scale: 0.2,
          duration: 0.08,
          ease: "expo.inOut",
        },
        `mergeMove+=${delay}`,
      );

      // small pop
      tl.to(
        item.shape,
        {
          scale: 0.28,
          duration: 0.04,
          ease: "power2.out",
        },
        `mergeMove+=${0.05 + delay}`,
      );

      // hide
      // tl.to(
      //   item.shape,
      //   {
      //     scale: 0,
      //     opacity: 0,
      //     duration: 0.05,
      //     ease: "expo.in",
      //   },
      //   `blast+=${delay}`,
      // );

      // particles appear
      tl.to(
        `${item.wrapper} .piece`,
        {
          opacity: 1,
          scale: 1,
          duration: 0.05,
        },
        `blast+=${delay}`,
      );

      // explode
      tl.fromTo(
        `${item.wrapper} .piece`,
        {
          x: 0,
          y: 0,
        },
        {
          x: "random(-80,80)",
          y: "random(-80,80)",
          rotation: "random(-180,180)",
          opacity: 0,
          scale: "random(0.6,1.2)",
          duration: 0.4,
          ease: "power3.out",
          stagger: 0.015,
        },
        `blast+=${0.02 + delay}`,
      );
    });

    const iconData = others.map((sel) => {
      const el = scope.querySelector(sel);

      return {
        el,
        startX: gsap.getProperty(el, "x"),
        startY: gsap.getProperty(el, "y"),
      };
    });

    const chase = { t: 0 };

    tl.to(
      others,
      {
        opacity: 1,
        duration: 0.01,
        stagger: 0.015,
      },
      "mergeMove",
    )

      .to(
        chase,
        {
          t: 1,
          duration: 0.05,
          ease: "none",
          onUpdate: () => {
            const pos = getRelativePosition(mergeAnchor, scope);

            iconData.forEach((item) => {
              const nx = item.startX + (pos.x - item.startX) * chase.t;
              const ny = item.startY + (pos.y - item.startY) * chase.t;

              gsap.set(item.el, {
                x: nx,
                y: ny,
              });
            });
          },
        },
        "mergeMove+=0.01",
      )

      .set(
        others,
        {
          opacity: 0,
          scale: 0.3,
        },
        "mergeMove+=0.45",
      );

    // ----------------------------------------- \\

    gsap.set("#iconStar4 svg", {
      transformOrigin: "50% 50%",
    });

    gsap.set("#shape4", {
      transformOrigin: "50% 50%",
    });

    gsap.set("#arrowShape1", {
      visibility: "hidden",
    });

    gsap.set("#iconStar4", {
      force3D: true,
      transformOrigin: "50% 50%",
      svgOrigin: "center center",
      willChange: "transform",
      transformPerspective: 1000,
    });

    MorphSVGPlugin.convertToPath(
      "#squareShape1",
      "#shape4",
      "#arrowShape1",
      "#circleShape1",
    );

    // morph
    const morphStart = swapPoint + 0.09;

    // morph the star icon to arrow icon
    tl.to(
      "#shape4",
      {
        morphSVG: {
          shape: "#arrowShape1",
          shapeIndex: "auto",
          type: "rotational",
        },
        duration: 0.09,
        ease: "expo.inOut",
      },
      morphStart,
    );

    // add width, height and rotation to match the arrow icon
    tl.to(
      "#iconStar4 svg",
      {
        attr: { width: 54, height: 54 },
        duration: 0.07,
        rotation: -180,
        ease: "expo.inOut",
      },
      morphStart + 0.01,
    );

    // arrow traveling area...
    const travelAnchors = ["#anchor5", "#anchor8", "#anchorMergePath"];

    // #iconStar4 travel other anchor position
    travelAnchors.forEach((anchor, i) => {
      tl.to(
        "#iconStar4",
        {
          x: () => getRelativePosition(scope.querySelector(anchor), scope).x,
          y: () => getRelativePosition(scope.querySelector(anchor), scope).y,
          duration: 0.05,
          ease: "power2.out",
        },
        "mergeMove+=" + (0.02 + i * 0.05),
      );
    });

    // icons2 move anchor8
    const icons2 = ["#iconStar5", "#iconStar6", "#iconStar7"];

    // arrow icon morph circle
    tl.to(
      "#shape4",
      {
        morphSVG: {
          shape: "#circleShape1",
          shapeIndex: "auto",
          type: "rotational",
        },
        fill: "#ffffff",
        duration: 0.09,
        ease: "expo.inOut",
      },
      "mergeMove+=0.07",
    );

    tl.to(
      "#iconStar4 svg",
      {
        attr: { width: 84, height: 84 },
        duration: 0.07,
        rotation: -180,
        ease: "expo.inOut",
      },
      "<",
    )

      .fromTo(
        "#iconStar4 svg",
        { x: 0, y: 0 },
        {
          x: -47,
          y: -20,
          zIndex: 3,
          duration: 0.07,
          ease: "none",
        },
        "<+=0.01",
      );

    // icon - 5,6,7 animation
    tl.to(
      icons2,
      {
        scale: 0.6,
        filter: "blur(8px) brightness(2)",
        opacity: 0,
        duration: 0.12,
        ease: "power2.out",
        stagger: 0.04,
      },
      "<+=0.02",
    );

    tl.to(
      "#iconStar4 svg",
      {
        x: 0,
        y: 0,
        duration: 0.07,
        ease: "none",
      },
      "<",
    );

    // send behind exactly at 2.92
    // tl.set("#iconStar4", { zIndex: -1 }, ">");

    // ---------------- CINEMATIC SPLIT SEQUENCE ----------------

    // ---------------- MASTER SPLIT FIXED ----------------

    function getScopePos(el) {
      const r = el.getBoundingClientRect();
      const p = scope.getBoundingClientRect();

      return {
        x: r.left - p.left,
        y: r.top - p.top,
      };
    }

    const splitAnchors = ["#anchor9", "#anchor10", "#anchor11", "#anchor12"];
    const splitParticles = ["#splitC1", "#splitC2", "#splitC3", "#splitC4"];
    const particleCenters = [35, 35, 35, 55];

    let splitCenter = { x: 0, y: 0 };

    // ---------------- PRE CALC CENTER ----------------
    tl.add(() => {
      splitCenter = getScopePos(scope.querySelector("#iconStar4"));
    }, ">");

    // ---------------- ICON TRAVEL ----------------
    tl.to(
      "#iconStar4",
      {
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 2.796,
          end: 2.92,
        },
        duration: 0.09,
        ease: "none",
        onComplete: () => {
          splitCenter = getScopePos(scope.querySelector("#iconStar4"));
        },
      },
      ">",
    );

    // ---------------- ISOLATED REVERSIBLE SPLIT TL ----------------
    const splitTL = gsap.timeline();

    // hide impeller naturally reversible
    splitTL.to(
      "#shape4",
      {
        opacity: 0,
        duration: 0.001,
      },
      0,
    );

    // spawn particles at exact center using timeline .set (NOT callback gsap.set)
    splitParticles.forEach((particle, i) => {
      splitTL.set(
        particle,
        {
          opacity: 1,
          scale: 1,
          x: () => splitCenter.x - particleCenters[i],
          y: () => splitCenter.y - particleCenters[i],
        },
        0,
      );
    });

    // split outward
    splitParticles.forEach((particle, i) => {
      splitTL.to(
        particle,
        {
          x: () =>
            getScopePos(scope.querySelector(splitAnchors[i])).x -
            particleCenters[i],
          y: () =>
            getScopePos(scope.querySelector(splitAnchors[i])).y -
            particleCenters[i],
          duration: 0.08,
          ease: "expo.out",
        },
        0,
      );
    });

    // first 3 fly right
    splitTL.to(
      ["#splitC1", "#splitC2", "#splitC3"],
      {
        x: "+=1800",
        opacity: 0,
        duration: 0.12,
        ease: "power4.in",
        stagger: 0.01,
      },
      0.02,
    );

    // last circle fullscreen expand
    splitTL.to(
      "#splitC4",
      {
        scale: 40,
        opacity: 0.7,
        duration: 0.09,
        ease: "expo.in",
      },
      0.05,
    );

    // optional final hide for reverse safety
    splitTL.to(
      "#splitC4",
      {
        opacity: 0,
        duration: 0.01,
      },
      0.17,
    );

    // attach
    tl.add(splitTL, ">");

    // ---------------- END CINEMATIC SPLIT ----------------

    // continue move behind
    // .to(
    //   "#iconStar4",
    //   {
    //     motionPath: {
    //       path: path,
    //       align: path,
    //       alignOrigin: [0.5, 0.5],
    //       start: 2.92,
    //       end: 3,
    //     },
    //     duration: 0.25,
    //     ease: "none",
    //   },
    //   ">",
    // )

    // scale after reaching
    // .to(
    //   "#iconStar4",
    //   {
    //     scale: 38.5,
    //     duration: 0.06,
    //     ease: "expo.out",
    //   },
    //   ">0.01",
    // );

    // tl.set("#iconStar4", { zIndex: 10 }, ">-=0.06")

    // .to(
    //   "#iconStar4",
    //   {
    //     opacity: 0,
    //     duration: 0.08,
    //   },
    //   "<+=0.01",
    // );

    // CONTENT REVEAL
    const animateContent = (el) => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 25%",
          scrub: 1.2,
        },
      });

      tl2
        .fromTo(
          el,
          { opacity: 0, scale: 0.7, y: 60, rotate: 0 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: -6,
            ease: "none",
            duration: 0.5,
          },
        )
        .to(
          el,
          {
            rotate: 0,
            ease: "none",
            duration: 0.3,
          },
          0.4, // second half-1 of scroll
        );
    };

    // content sections
    const content = [
      refs.current.content1,
      refs.current.content2,
      refs.current.content3,
    ];

    // apply to all content sections
    content.forEach((el) => {
      if (!el) return;
      animateContent(el);
    });

    return () => {
      window.removeEventListener("resize", positionIcons);
      ScrollTrigger.removeEventListener("refresh", positionIcons);
    };
  }, [refs]);
}
