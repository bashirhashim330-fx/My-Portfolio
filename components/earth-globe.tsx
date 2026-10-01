'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from './motion'

/**
 * Real-looking 3D Earth drawn with a single WebGL fragment shader (no libraries).
 * Ray-traced sphere + painted Natural Earth texture, sun lighting with a soft terminator,
 * ocean glint, drifting procedural clouds, atmosphere, and a glowing marker on Minna.
 * Drag to spin (horizontal on touch so the page still scrolls); it drifts home when left alone.
 */

const MINNA = { lat: 9.6139, lon: 6.5569 }
const TAU = Math.PI * 2
const LAT = (MINNA.lat * Math.PI) / 180
const LON = (MINNA.lon * Math.PI) / 180
const HOME_YAW = -LON - 0.28
const HOME_PITCH = 0.24
const MARKER: [number, number, number] = [Math.cos(LAT) * Math.sin(LON), Math.sin(LAT), Math.cos(LAT) * Math.cos(LON)]

const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'

const frag = (derivatives: boolean) => `${derivatives ? '#extension GL_OES_standard_derivatives : enable\n' : ''}
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uR;
uniform mat3 uRot;
uniform float uTime;
uniform float uCloudT;
uniform float uLight;
uniform vec3 uMarker;
uniform float uPulse;
uniform float uFade;

float h3(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float noise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(h3(i), h3(i + vec3(1,0,0)), f.x), mix(h3(i + vec3(0,1,0)), h3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i + vec3(0,0,1)), h3(i + vec3(1,0,1)), f.x), mix(h3(i + vec3(0,1,1)), h3(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p){ float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise(p); p = p * 2.03 + 3.1; a *= 0.5; } return s; }

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uR;
  float r = length(p);
  vec3 L = normalize(vec3(-0.62, 0.48, 0.62));
  float aa = 1.6 / uR;

  // atmosphere halo outside the disc
  vec2 dir = r > 0.0 ? p / r : vec2(0.0);
  float sunSide = 0.35 + 0.65 * smoothstep(-0.7, 0.8, dot(dir, normalize(L.xy)));
  float halo = exp(-max(r - 1.0, 0.0) * mix(11.0, 13.0, uLight)) * smoothstep(1.0 - aa, 1.0 + aa, r);
  vec3 haloCol = mix(vec3(0.36, 0.62, 1.0), vec3(0.16, 0.40, 0.86), uLight);
  float haloA = halo * sunSide * mix(0.62, 0.5, uLight);

  vec3 col = vec3(0.0);
  float sphereA = 1.0 - smoothstep(1.0 - aa, 1.0 + aa * 0.5, r);
  if (r < 1.0 + aa) {
    vec3 n = vec3(p, sqrt(max(1.0 - r * r, 0.0)));
    vec3 q = n * uRot; // view -> world
    float lon = atan(q.x, q.z);
    float lat = asin(clamp(q.y, -1.0, 1.0));
    vec2 uv = vec2(lon / 6.2831853 + 0.5, 0.5 - lat / 3.1415927);
    ${derivatives ? `vec2 uv2 = vec2(fract(uv.x + 0.5) - 0.5, uv.y);
    if (fwidth(uv2.x) < fwidth(uv.x) - 0.001) uv = uv2;` : ''}
    vec3 tex = texture2D(uTex, uv).rgb;
    vec3 alb = pow(tex, vec3(2.2));
    float water = smoothstep(0.06, 0.16, tex.b - tex.r);

    // clouds drift slowly in world space
    float ca = uCloudT * 0.012; float cs = sin(ca), cc = cos(ca);
    vec3 cq = vec3(cc * q.x + cs * q.z, q.y, -cs * q.x + cc * q.z);
    float c = fbm(cq * 3.4 + fbm(cq * 1.7 + 4.0) * 1.3 + vec3(0.0, 0.0, uCloudT * 0.004));
    float band = 0.75 + 0.25 * cos(lat * 5.0);
    float cloud = smoothstep(0.47, 0.74, c * band) * 0.8;

    float ndl = dot(n, L);
    float day = smoothstep(-0.18, 0.32, ndl);
    float diff = max(ndl, 0.0);
    float ambient = mix(0.035, 0.11, uLight);
    vec3 lit = alb * (ambient + 1.25 * diff);
    // ocean glint
    vec3 R = reflect(-L, n);
    float spec = pow(max(R.z, 0.0), 70.0) * 1.4 + pow(max(R.z, 0.0), 9.0) * 0.06;
    lit += water * (1.0 - cloud) * spec * vec3(1.0, 0.93, 0.8) * day;
    // cloud layer with a little self-shadow
    vec3 cloudCol = vec3(0.95, 0.97, 1.0) * (ambient * 1.4 + 1.05 * diff);
    lit = mix(lit, cloudCol, cloud);
    // atmosphere scattering at the limb
    float fres = pow(1.0 - n.z, 2.6);
    lit += vec3(0.3, 0.55, 1.0) * fres * (0.12 + 0.95 * day);

    // Minna marker: hot core, soft glow, expanding ring
    float d = distance(n, uMarker);
    vec3 acc = vec3(0.62, 1.0, 0.17);
    float core = exp(-d * d / 0.00028);
    float glow = exp(-d * d / 0.0042) * 0.75 + exp(-d * d / 0.03) * 0.18;
    float t = fract(uTime * 0.55);
    float rr = 0.02 + t * 0.17;
    float ring = exp(-pow((d - rr) / 0.0075, 2.0)) * (1.0 - t) * uPulse;
    float front = smoothstep(0.0, 0.25, uMarker.z);
    lit += front * (acc * (glow * 1.6 + ring * 1.1) + mix(acc, vec3(1.0), 0.6) * core * 2.4);

    col = lit / (1.0 + lit * 0.55); // soft tonemap
    col = pow(col, vec3(1.0 / 2.2));
  }

  // faint stars in dark mode
  float star = 0.0;
  if (uLight < 0.5 && r > 1.05) {
    vec2 cell = floor(gl_FragCoord.xy / max(uR / 140.0, 1.0));
    float s = h3(vec3(cell, 7.0));
    star = step(0.9984, s) * (0.12 + 0.4 * h3(vec3(cell, 3.0))) * (1.0 - uLight * 2.0) * (1.0 - halo);
  }

  float a = sphereA + (1.0 - sphereA) * max(haloA, star);
  vec3 outc = col * sphereA + (1.0 - sphereA) * (haloCol * haloA + vec3(star));
  gl_FragColor = vec4(outc, a) * uFade;
}
`

function rotation(yaw: number, pitch: number) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch)
  // view = Rx(pitch) * Ry(yaw); rows
  const m = [
    [cy, 0, sy],
    [-sp * -sy, cp, -sp * cy],
    [cp * -sy, sp, cp * cy],
  ]
  return m
}

const wrap = (a: number) => a - TAU * Math.round(a / TAU)

export function EarthGlobe({ src, label }: { src: string; label: string }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tagRef = useRef<HTMLSpanElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const stage = stageRef.current, canvas = canvasRef.current, tag = tagRef.current
    if (!stage || !canvas || !tag) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: true, alpha: true, powerPreference: 'low-power' })
    if (!gl) { setFailed(true); return }
    const deriv = !!gl.getExtension('OES_standard_derivatives')
    const sh = (type: number, code: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, code); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
      return s
    }
    let prog: WebGLProgram
    try {
      prog = gl.createProgram()!
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag(deriv)))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
    } catch (err) { console.warn('globe', err); setFailed(true); return }
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n: string) => gl.getUniformLocation(prog, n)
    const u = { res: U('uRes'), r: U('uR'), rot: U('uRot'), time: U('uTime'), cloud: U('uCloudT'), light: U('uLight'), marker: U('uMarker'), pulse: U('uPulse'), fade: U('uFade'), tex: U('uTex') }
    gl.uniform1i(u.tex, 0)

    const reduced = prefersReducedMotion()
    let ready = false
    const tex = gl.createTexture()
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const an = gl.getExtension('EXT_texture_filter_anisotropic')
      if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(4, gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)))
      ready = true
      kick()
    }
    img.onerror = () => setFailed(true)
    img.src = src

    // ---- state ----
    let w = 0, h = 0, R = 0, dpr = 1
    let yaw = reduced ? HOME_YAW : HOME_YAW - 2.6
    let pitch = reduced ? HOME_PITCH : HOME_PITCH + 0.5
    let vYaw = 0, vPitch = 0
    let mode: 'wait' | 'intro' | 'drag' | 'coast' | 'home' = reduced ? 'home' : 'wait'
    let introStart = 0, lastInput = -1e9, fade = 0
    let light = document.documentElement.dataset.theme === 'light' ? 1 : 0
    let visible = false, raf = 0, last = 0, clock = 0
    const fromYaw = yaw, fromPitch = pitch

    const resize = () => {
      const rect = stage.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      R = Math.min(w, h) * 0.42
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      kick()
    }

    const frame = (now: number) => {
      raf = 0
      const dt = Math.min((now - (last || now)) / 1000, 0.05)
      last = now
      clock += dt
      const sec = now / 1000
      if (mode === 'intro') {
        const k = Math.min((now - introStart) / 2600, 1)
        const e = 1 - Math.pow(1 - k, 4)
        yaw = fromYaw + (HOME_YAW - fromYaw) * e
        pitch = fromPitch + (HOME_PITCH - fromPitch) * e
        if (k >= 1) { mode = 'home'; clock = 0 }
      } else if (mode === 'coast') {
        yaw += vYaw * dt; pitch += vPitch * dt
        const decay = Math.exp(-dt * 2.2)
        vYaw *= decay; vPitch *= decay
        if (now - lastInput > 2600) { mode = 'home'; yaw = HOME_YAW + wrap(yaw - HOME_YAW); clock = 0 }
      } else if (mode === 'home') {
        const sway = reduced ? 0 : Math.sin(clock * 0.2) * 0.2 * Math.min(clock / 6, 1)
        const k = 1 - Math.exp(-dt * 1.5)
        yaw += (HOME_YAW + sway - yaw) * k
        pitch += (HOME_PITCH - pitch) * k
      }
      pitch = Math.max(-1, Math.min(1, pitch))
      const targetLight = document.documentElement.dataset.theme === 'light' ? 1 : 0
      light += (targetLight - light) * Math.min(1, dt * 6)
      if (ready) fade = Math.min(1, fade + dt * 1.6)

      const m = rotation(yaw, pitch)
      const mk = m.map(row => row[0] * MARKER[0] + row[1] * MARKER[1] + row[2] * MARKER[2])
      // column-major for GL: uniformMatrix3fv expects columns; pass transpose so shader's (n * uRot) = R^T n
      gl.uniformMatrix3fv(u.rot, false, [m[0][0], m[1][0], m[2][0], m[0][1], m[1][1], m[2][1], m[0][2], m[1][2], m[2][2]])
      gl.uniform2f(u.res, canvas.width, canvas.height)
      gl.uniform1f(u.r, R * dpr)
      gl.uniform1f(u.time, reduced ? 0.35 : sec)
      gl.uniform1f(u.cloud, reduced ? 40 : sec + 40)
      gl.uniform1f(u.light, light)
      gl.uniform3f(u.marker, mk[0], mk[1], mk[2])
      gl.uniform1f(u.pulse, reduced ? 0 : 1)
      gl.uniform1f(u.fade, fade)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      if (ready) gl.drawArrays(gl.TRIANGLES, 0, 3)

      const vis = Math.max(0, Math.min(1, (mk[2] - 0.12) / 0.3)) * fade
      tag.style.opacity = vis.toFixed(3)
      tag.style.transform = `translate3d(${(w / 2 + mk[0] * R).toFixed(1)}px, ${(h / 2 - mk[1] * R).toFixed(1)}px, 0)`

      const settling = Math.abs(targetLight - light) > 0.002 || fade < 1
      if (visible && (!reduced || mode === 'drag' || mode === 'coast' || settling || Math.abs(wrap(HOME_YAW - yaw)) > 0.001 || Math.abs(HOME_PITCH - pitch) > 0.001)) kick()
    }
    const kick = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame) }

    // ---- input ----
    let px = 0, py = 0, pt = 0, pid = -1, touch = false
    const down = (e: PointerEvent) => {
      if (pid !== -1) return
      pid = e.pointerId; touch = e.pointerType === 'touch'
      px = e.clientX; py = e.clientY; pt = performance.now()
      vYaw = vPitch = 0; mode = 'drag'; lastInput = pt
      stage.classList.add('is-grabbing')
      try { canvas.setPointerCapture(pid) } catch {}
      kick()
    }
    const move = (e: PointerEvent) => {
      if (e.pointerId !== pid) return
      const now = performance.now(), dt = Math.max((now - pt) / 1000, 0.001)
      const dx = (e.clientX - px) / R, dy = touch ? 0 : (e.clientY - py) / R
      yaw += dx; pitch += dy
      vYaw = vYaw * 0.6 + (dx / dt) * 0.4; vPitch = vPitch * 0.6 + (dy / dt) * 0.4
      px = e.clientX; py = e.clientY; pt = now; lastInput = now
      kick()
    }
    const up = (e: PointerEvent) => {
      if (e.pointerId !== pid) return
      pid = -1; mode = 'coast'; lastInput = performance.now()
      if (performance.now() - pt > 90) { vYaw = 0; vPitch = 0 }
      vYaw = Math.max(-9, Math.min(9, vYaw)); vPitch = Math.max(-4, Math.min(4, vPitch))
      stage.classList.remove('is-grabbing')
      kick()
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && mode === 'wait') { mode = 'intro'; introStart = performance.now() + 150 }
      if (visible) { last = 0; kick() }
    }, { threshold: 0.15 })
    io.observe(stage)
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    const onVis = () => { last = 0; kick() }
    document.addEventListener('visibilitychange', onVis)
    const themeObs = new MutationObserver(kick)
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const onLost = (e: Event) => { e.preventDefault(); setFailed(true) }
    canvas.addEventListener('webglcontextlost', onLost)
    resize()

    return () => {
      cancelAnimationFrame(raf); visible = false
      io.disconnect(); ro.disconnect(); themeObs.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      canvas.removeEventListener('webglcontextlost', onLost)
      img.onload = null
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [src])

  return (
    <div ref={stageRef} className={`globe-stage${failed ? ' is-fallback' : ''}`} role="img" aria-label={`Globe showing ${label}`}>
      {!failed && <canvas ref={canvasRef} className="globe-canvas" aria-hidden="true" />}
      <span ref={tagRef} className="globe-tag" aria-hidden="true"><span>{label}</span></span>
    </div>
  )
}
