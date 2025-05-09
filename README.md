# 🌌 Wormhole Tunnel

> A stylized 3D tunnel flythrough built with Three.js, showcasing spline-based camera motion, custom geometry, and bloom effects.

---

## 🖼 Preview

![App Preview](media/wormhole-demo.gif)

---

## ⚙️ Getting Started

This demo runs in modern browsers without a build system.

```bash
# 1. Clone the repo
git clone https://github.com/suzubu/wormhole-demo.git

# 2. Open in browser (no build needed)
open index.html  # or use VSCode Live Server
```

> Built with:  
> - [Three.js](https://threejs.org/)  
> - [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)  
> - [Postprocessing Bloom](https://threejs.org/examples/#webgl_postprocessing_unreal_bloom)

---

## ✨ Features

- 🌀 Custom Catmull-Rom spline defines the 3D tunnel path
- 🚀 Smooth camera flythrough animated along the curve
- 📦 Procedurally distributed boxes and colored outlines
- 🌠 Bloom pass adds luminous glow to edges and curves
- ⚙️ Zero build tools — fully browser-native with ES module imports

---

## 💡 Dev Notes

- Spline data is manually constructed and passed into `CatmullRomCurve3`
- Geometry includes `TubeGeometry` + `EdgesGeometry` for a stylized tunnel
- Boxes use HSL random coloring and wireframe edges for contrast
- Uses only vanilla JS and native Three.js modules via CDN

---

## 📚 Inspiration / Credits

Inspired by:
- The iconic warp tunnel effect used in sci-fi visualizations
- Classic `TubeGeometry` and shader-driven Three.js playgrounds

---

## 🧪 Known Issues

- ❌ No user interface for controlling speed or tunnel shape
- 🔍 Scene performance could drop on low-end mobile devices

---

## 🔭 Roadmap / TODO

- [ ] Add dynamic spline control via GUI
- [ ] Introduce shader-driven glow to tube material
- [ ] Add start/end warp transitions

---

## 📂 Folder Structure

```bash
wormhole-demo/
├── index.html             # Entry HTML file w/ importmap
├── index.js               # Main logic and animation loop
├── spline.js              # Catmull-Rom spline data
├── media/
│   └── preview.gif        # Optional demo preview
└── README.md
```

---

## 📜 License

MIT — use it, remix it, fly through it ✨

---

## 🙋‍♀️ Author

Made with ☕ + 🎧 by [suzubu](https://github.com/suzubu)
Enjoy the ride through the wormhole!
