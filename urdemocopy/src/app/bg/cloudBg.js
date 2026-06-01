"use client";

import React, { useEffect, useRef } from "react";

const CloudBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL 2 is not supported in this browser.");
      return;
    }

    const vertexShaderSource = `#version 300 es
      in vec4 position;
      void main() { gl_Position = position; }
    `;

    const fragmentShaderSource = `#version 300 es
      precision highp float;

      uniform float iTime;
      uniform vec2 iResolution;
      out vec4 fragColor;

      // --- 3D Simplex noise ---
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
      float snoise3(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i = floor(v + dot(v,C.yyy));
        vec3 x0 = v - i + dot(i,C.xxx);

        vec3 g = step(x0.yzx,x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod(i,289.0);
        vec4 p = permute( permute( permute(
                     i.z + vec4(0.0,i1.z,i2.z,1.0))
                   + i.y + vec4(0.0,i1.y,i2.y,1.0))
                   + i.x + vec4(0.0,i1.x,i2.x,1.0));

        float n_ = 1.0/7.0;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p*ns.z*ns.z);
        vec4 x_ = floor(j*ns.z);
        vec4 y_ = floor(j - 7.0*x_);

        vec4 x = x_*ns.x + ns.yyyy;
        vec4 y = y_*ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy,y.xy);
        vec4 b1 = vec4(x.zw,y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h,vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
        m = m*m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      // --- FBM ---
      float fbm3(vec2 uv, float t){
        float total = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for(int i=0;i<7;i++){
          vec3 p = vec3(uv*frequency, t*0.08);
          total += snoise3(p) * amplitude;
          frequency *= 2.0;
          amplitude *= 0.5;
        }
        return total*0.5 + 0.5;
      }

      void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec2 uv = fragCoord / iResolution.xy;
        uv = uv*2.0 - 1.0;
        uv.x *= iResolution.x / iResolution.y;

        uv *= 1.2;

        // Slowed down the wind speed slightly
        uv += vec2(iTime*0.02, iTime*0.01);
        float n = fbm3(uv, iTime * 0.04);
        
        // --- VISIBILITY FIXES ---
        // Thresholds reduced so the clouds form earlier and are much thicker
        float cloud = smoothstep(0.25, 0.75, n); 
        float edgeHighlight = smoothstep(0.45, 0.85, n);
        
        // Pure Black Sky
        vec3 skyColor = vec3(0.0, 0.0, 0.0);
        
        // Colors slightly brightened to ensure they don't blend into the black sky completely
        vec3 cloudBase = vec3(0.08, 0.08, 0.09);      // Dark grey base (visible against black)
        vec3 cloudHighlight = vec3(0.40, 0.40, 0.40); // Smoky mid-grey for textures
        
        // Mix the colors
        vec3 dynamicCloudColor = mix(cloudBase, cloudHighlight, edgeHighlight);
        vec3 col = mix(skyColor, dynamicCloudColor, cloud);

        fragColor = vec4(col, 1.0);
      }
    `;

    function compileShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource,
    );
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource,
    );
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let animationFrameId;

    const render = (time) => {
      const t = time * 0.004;
      gl.uniform1f(iTimeLoc, t);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
        backgroundColor: "#000",
      }}
    />
  );
};

export default CloudBackground;
