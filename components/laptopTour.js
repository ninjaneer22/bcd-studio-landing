// Scroll-driven 3D laptop. Loaded on demand by LaptopMenus.tsx (never in the first bundle).
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { gsap } from 'gsap';

// stops read their camera from data attributes: data-tex, data-x, data-y, data-wpx, data-yaw, data-pitch
// (x, y and wpx are pixels in the 2400 x 1500 screen textures)
const FR = { ox: 0, oy: 0, w: 2400, h: 1500 };

export function startLaptop(stage, cards, assets) {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STOPS = cards.map((el) => {
    const d = el.dataset;
    return { tex: assets.tex[d.tex], u: (+d.x - FR.ox) / FR.w, v: (+d.y - FR.oy) / FR.h, w: +d.wpx / FR.w, yaw: +d.yaw, pitch: +d.pitch };
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(-1, 2, 1.5);
  scene.add(key);
  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 50);

  const loader = new THREE.TextureLoader();
  const texCache = new Map();
  function getTex(url) {
    if (texCache.has(url)) return texCache.get(url);
    const t = loader.load(url);
    t.colorSpace = THREE.SRGBColorSpace;
    t.flipY = false;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    texCache.set(url, t);
    return t;
  }

  let frame = null, baseMat = null, overMat = null, curTex = null;
  let active = -1, tween = null, fade = null, pending = 0, visible = true, disposed = false;
  const S = { u: 0.5, v: 0.5, w: 1.2, yaw: 0, pitch: 0 };

  function apply() {
    if (!frame || disposed) return;
    const { p00, Rv, Dv, W, R, U, N } = frame;
    const target = p00.clone().addScaledVector(Rv, S.u).addScaledVector(Dv, S.v);
    const fov = THREE.MathUtils.degToRad(camera.fov);
    // on narrow screens zoom in so the screen's height fills the view (the sides are cropped)
    const wEff = Math.min(S.w, Math.max(0.28, (camera.aspect / 1.6) * 1.06));
    const dist = (wEff * W) / (2 * Math.tan(fov / 2) * camera.aspect);
    const yaw = THREE.MathUtils.degToRad(S.yaw), pit = THREE.MathUtils.degToRad(S.pitch);
    const dir = N.clone().multiplyScalar(Math.cos(yaw) * Math.cos(pit)).addScaledVector(R, Math.sin(yaw) * Math.cos(pit)).addScaledVector(U, Math.sin(pit));
    camera.position.copy(target).addScaledVector(dir, dist);
    camera.up.copy(U);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }
  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = w + 'px';
    renderer.domElement.style.height = h + 'px';
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    apply();
  }

  function jump(i, instant) {
    if (!baseMat) { pending = i; return; }
    i = Math.max(0, Math.min(STOPS.length - 1, i));
    if (i === active && !instant) return;
    active = i;
    const s = STOPS[i];
    if (tween) tween.kill();
    if (fade) fade.kill();
    const quick = instant || reduce;
    if (s.tex !== curTex) {
      if (quick) { baseMat.map = getTex(s.tex); baseMat.needsUpdate = true; overMat.opacity = 0; curTex = s.tex; }
      else {
        overMat.map = getTex(s.tex); overMat.needsUpdate = true; overMat.opacity = 0;
        const t = s.tex;
        fade = gsap.to(overMat, { opacity: 1, duration: 0.55, delay: 0.15, ease: 'power1.inOut',
          onComplete: () => { baseMat.map = getTex(t); baseMat.needsUpdate = true; overMat.opacity = 0; curTex = t; } });
      }
    }
    if (quick) { Object.assign(S, { u: s.u, v: s.v, w: s.w, yaw: s.yaw, pitch: s.pitch }); apply(); }
    else tween = gsap.to(S, { u: s.u, v: s.v, w: s.w, yaw: s.yaw, pitch: s.pitch, duration: 0.9, ease: 'power2.inOut', onUpdate: apply });
  }

  new GLTFLoader().load(assets.glb, (gltf) => {
    if (disposed) return;
    const root = gltf.scene;
    scene.add(root);
    root.updateMatrixWorld(true);
    let disp = null;
    root.traverse((o) => { if (o.isMesh && o.name.startsWith('Display_132')) disp = o; });
    // the screen frame from the quad's UVs: right = +u, down = +v
    const g = disp.geometry, pos = g.attributes.position, uv = g.attributes.uv;
    const P = (i) => new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(disp.matrixWorld);
    const pts = [0, 1, 2, 3].map((i) => ({ p: P(i), u: uv.getX(i), v: uv.getY(i) }));
    const p00 = pts.find((a) => a.u < 0.5 && a.v < 0.5).p, p10 = pts.find((a) => a.u > 0.5 && a.v < 0.5).p, p01 = pts.find((a) => a.u < 0.5 && a.v > 0.5).p;
    const Rv = p10.clone().sub(p00), Dv = p01.clone().sub(p00);
    const R = Rv.clone().normalize(), U = Dv.clone().normalize().negate();
    const N = new THREE.Vector3().crossVectors(R, U).normalize();
    frame = { p00, Rv, Dv, W: Rv.length(), R, U, N };
    // screen materials: base + a fading overlay for crossfades
    baseMat = new THREE.MeshBasicMaterial({ toneMapped: false });
    overMat = new THREE.MeshBasicMaterial({ toneMapped: false, transparent: true, opacity: 0, depthWrite: false });
    disp.material = baseMat;
    const over = new THREE.Mesh(disp.geometry, overMat);
    over.matrixAutoUpdate = false;
    over.matrix.copy(disp.matrixWorld).premultiply(new THREE.Matrix4().makeTranslation(N.x * 0.0006, N.y * 0.0006, N.z * 0.0006));
    scene.add(over);
    // a hint of glass: a soft diagonal sheen over the screen
    const gc = document.createElement('canvas'); gc.width = 256; gc.height = 160;
    const gx = gc.getContext('2d');
    const g1 = gx.createLinearGradient(0, 0, 256, 160);
    g1.addColorStop(0, 'rgba(255,255,255,.55)'); g1.addColorStop(0.28, 'rgba(255,255,255,.16)'); g1.addColorStop(0.5, 'rgba(255,255,255,0)'); g1.addColorStop(1, 'rgba(255,255,255,0)');
    gx.fillStyle = g1; gx.fillRect(0, 0, 256, 160);
    const g2 = gx.createLinearGradient(40, 160, 256, 0);
    g2.addColorStop(0, 'rgba(255,255,255,0)'); g2.addColorStop(0.62, 'rgba(255,255,255,.05)'); g2.addColorStop(0.7, 'rgba(255,255,255,0)'); g2.addColorStop(1, 'rgba(255,255,255,0)');
    gx.fillStyle = g2; gx.fillRect(0, 0, 256, 160);
    const gt = new THREE.CanvasTexture(gc); gt.flipY = false;
    const gl = new THREE.Mesh(disp.geometry, new THREE.MeshBasicMaterial({ map: gt, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    gl.matrixAutoUpdate = false;
    gl.matrix.copy(disp.matrixWorld).premultiply(new THREE.Matrix4().makeTranslation(N.x * 0.0012, N.y * 0.0012, N.z * 0.0012));
    gl.renderOrder = 3;
    scene.add(gl);
    // soft contact shadow under the laptop
    const box = new THREE.Box3().setFromObject(root);
    const c = box.getCenter(new THREE.Vector3());
    const cv = document.createElement('canvas'); cv.width = cv.height = 256;
    const x = cv.getContext('2d');
    const gr = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 256, 256);
    const sh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(cv), transparent: true, depthWrite: false }));
    sh.rotation.x = -Math.PI / 2;
    sh.position.set(c.x, box.min.y - 0.002, c.z);
    sh.scale.set((box.max.x - box.min.x) * 1.7, (box.max.z - box.min.z) * 1.7, 1);
    scene.add(sh);
    curTex = STOPS[0].tex;
    baseMat.map = getTex(curTex); baseMat.needsUpdate = true;
    resize();
    jump(pending, true);
    STOPS.forEach((s) => getTex(s.tex));
    stage.classList.add('ready');
  });

  // only draw while the section is on screen
  renderer.setAnimationLoop(() => { if (visible) apply(); });
  const vis = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { rootMargin: '10% 0px' });
  vis.observe(stage);
  // pick the stop whose spacer sits at the middle of the window
  const io = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) jump(cards.indexOf(e.target)); }); }, { rootMargin: '-48% 0px -48% 0px' });
  cards.forEach((s) => io.observe(s));
  window.addEventListener('resize', resize);

  return function dispose() {
    disposed = true;
    renderer.setAnimationLoop(null);
    io.disconnect(); vis.disconnect();
    window.removeEventListener('resize', resize);
    if (tween) tween.kill();
    if (fade) fade.kill();
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); } });
    texCache.forEach((t) => t.dispose());
    pmrem.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  };
}
