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

    const tl = gsap.timeline({
      scrollTrigger: {
        id: "mainLine",
        trigger: scope,
        start: "top center",
        end: "+=3400",
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

    // BTN DROP
    const anchors = [
      "#anchor1",
      "#anchor2",
      "#anchor3",
      "#anchor4",
      "#anchor1",
      "#anchor3",
    ];

    refs.current.buttons.forEach((btn, i) => {
      const anchor = scope.querySelector(anchors[i]);
      if (!btn || !anchor) return;

      const delay = swapPoint + i * 0.002;

      tl.to(
        btn,
        {
          x: () =>
            anchor.getBoundingClientRect().left -
            btn.getBoundingClientRect().left -
            12,

          y: () =>
            anchor.getBoundingClientRect().top -
            btn.getBoundingClientRect().top -
            10,

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

    // ICONS FALL IN ALONG PATH
    function positionIcons() {
      const items = [
        { icon: "#iconStar1", anchor: "#anchor1" },
        { icon: "#iconStar2", anchor: "#anchor2" },
        { icon: "#iconStar3", anchor: "#anchor3" },
        { icon: "#iconStar4", anchor: "#anchor4" },
        { icon: "#iconStar5", anchor: "#anchor5" },
        { icon: "#iconStar6", anchor: "#anchor6" },
        { icon: "#iconStar7", anchor: "#anchor7" },
      ];

      const parentRect = scope.getBoundingClientRect();

      items.forEach((item) => {
        const anchor = scope.querySelector(item.anchor);
        const icon = scope.querySelector(item.icon);

        if (!anchor || !icon) return;

        const rect = anchor.getBoundingClientRect();

        gsap.set(icon, {
          x: rect.left - parentRect.left - 2,
          y: rect.top - parentRect.top - 7,
        });
      });
    }

    positionIcons();

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

    ScrollTrigger.addEventListener("refresh", positionIcons);
    window.addEventListener("resize", positionIcons);

    // MERGE ICONSTAR1 -> ICONSTAR4

    function getRelativePosition(target, parent) {
      const t = target.getBoundingClientRect();
      const p = parent.getBoundingClientRect();

      return {
        x: t.left - p.left,
        y: t.top - p.top,
      };
    }

    tl.addLabel("mergeMove", swapPoint + 0.08);

    const mergeAnchor = scope.querySelector("#iconStar4");
    const morphWrapper = scope.querySelector("#iconStar1");

    // all groups center transform
    gsap.set(["#group1", "#group2", "#group3"], {
      transformOrigin: "50% 50%",
    });

    // scattered initial
    gsap.set("#group1", { x: -78, y: -55, rotation: -35 });
    gsap.set("#group2", { x: 82, y: -52, rotation: 28 });
    gsap.set("#group3", { x: -82, y: 72, rotation: -18 });

    // wrapper init
    gsap.set(morphWrapper, {
      transformOrigin: "50% 50%",
    });

    // STEP 1 — GROUPS COME TO CENTER + MORPH
    ["#group1", "#group2", "#group3"].forEach((grp, i) => {
      tl.to(
        grp,
        {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.18,
          ease: "expo.inOut",
        },
        "mergeMove",
      );
    });

    tl.to(
      "#shape1",
      {
        morphSVG: { shape: "#slice1", shapeIndex: "auto" },
        fill: "#ffffff",
        duration: 0.15,
        ease: "expo.inOut",
      },
      "mergeMove-=0.06",
    )
      .to(
        "#shape2",
        {
          morphSVG: { shape: "#slice2", shapeIndex: "auto" },
          fill: "#ffffff",
          duration: 0.12,
          ease: "expo.inOut",
        },
        "mergeMove-=0.04",
      )
      .to(
        "#shape3",
        {
          morphSVG: { shape: "#slice3", shapeIndex: "auto" },
          fill: "#ffffff",
          duration: 0.12,
          ease: "expo.inOut",
        },
        "mergeMove-=0.05",
      );

    // tiny compress when full circle formed
    tl.to(
      morphWrapper,
      {
        scale: 0.88,
        duration: 0.03,
        ease: "power1.out",
      },
      ">",
    ).to(
      morphWrapper,
      {
        scale: 1,
        duration: 0.03,
        ease: "power1.inOut",
      },
      ">",
    );

    // STEP 2 — WHOLE WRAPPER FLY TO ICONSTAR4
    const moveProxy = { t: 0 };

    const startX = gsap.getProperty(morphWrapper, "x");
    const startY = gsap.getProperty(morphWrapper, "y");

    const setX = gsap.quickSetter(morphWrapper, "x", "px");
    const setY = gsap.quickSetter(morphWrapper, "y", "px");

    tl.to(
      moveProxy,
      {
        t: 1,
        duration: 0.06,
        ease: "power2.inOut",
        onUpdate: () => {
          const pos = getRelativePosition(mergeAnchor, scope);

          const nx = startX + (pos.x - startX) * moveProxy.t;
          const ny = startY + (pos.y - startY) * moveProxy.t;

          setX(nx);
          setY(ny);
        },
      },
      ">-=0.08",
    )

      .to(
        morphWrapper,
        {
          opacity: 0,
          scale: 0.3,
          duration: 0.05,
          ease: "power1.in",
        },
        ">",
      );

    // shrink while reaching
    tl.to(
      morphWrapper,
      {
        scale: 0.45,
        duration: 0.06,
        ease: "power2.inOut",
      },
      "mergeMove+=0.23",
    );

    // STEP 3 — HIDE EXACTLY AFTER REACH
    tl.to(
      morphWrapper,
      {
        opacity: 0,
        duration: 0.04,
        ease: "none",
      },
      ">+=0.16",
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
    const finalAnchor = scope.querySelector("#anchor8");

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

    // continue travel
    tl.to(
      "#iconStar4",
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
          start: 2.796,
          end: 2.92,
        },
        duration: 0.09,
        ease: "none",
      },
      ">+=0.02",
    );

    // send behind exactly at 2.92
    tl.set("#iconStar4", { zIndex: -1 }, ">")

      // continue move behind
      .to(
        "#iconStar4",
        {
          motionPath: {
            path: path,
            align: path,
            alignOrigin: [0.5, 0.5],
            start: 2.92,
            end: 3,
          },
          duration: 0.05,
          ease: "none",
        },
        ">",
      )

      // scale after reaching
      .to(
        "#iconStar4",
        {
          scale: 38.5,
          duration: 0.06,
          ease: "expo.out",
        },
        ">0.01",
      );

    tl.set("#iconStar4", { zIndex: 10 }, ">-=0.06")

      .to(
        "#iconStar4",
        {
          opacity: 0,
          duration: 0.08,
        },
        "<+=0.01",
      );

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
