| Browser                  | Rendering Engine           | SVG Graphics Engine                     | Notes                                                                           |
| ------------------------ | -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| 🦊 Firefox               | **Gecko**                  | Uses **Cairo** (2D graphics library)    | Cairo handles SVG paths, fills, text, etc.                                      |
| 🌐 Chrome / Edge / Opera | **Blink** (fork of WebKit) | Uses **Skia**                           | Skia is a fast, GPU-accelerated graphics engine (also used in Android, Flutter) |
| 🍎 Safari                | **WebKit**                 | Uses **Core Graphics / Quartz**         | Apple’s native 2D rendering system                                              |
| 🪟 Old IE                | **Trident** / **MSHTML**   | Used GDI+ (legacy Windows graphics API) | Outdated now                                                                    |

---

## OS 2D

| OS         | Graphics Engine                           | GPU API Used    | Notes                                           |
| ---------- | ----------------------------------------- | --------------- | ----------------------------------------------- |
| 🪟 Windows | **Direct2D / DWM**                        | Direct3D        | GPU-accelerated; part of Desktop Window Manager |
| 🍎 macOS   | **Quartz / CoreGraphics / CoreAnimation** | Metal           | Fully GPU-accelerated compositing               |
| 🐧 Linux   | **Cairo / GTK / Qt / Wayland compositor** | OpenGL / Vulkan | Depends on desktop environment                  |

### WebGL = Web-based version of OpenGL ES (for embedded systems)

```txt
JavaScript code (your app)
     ↓
WebGL API (browser's JS binding)
     ↓
ANGLE (Almost Native Graphics Layer Engine) : - Converts WebGL calls into the system’s native GPU API
     ↓
Native GPU API (DirectX / Metal / Vulkan / OpenGL): -ANGLE passes translated GPU commands to the OS’s graphics driver
     ↓
GPU Driver
     ↓
GPU Hardware
     ↓
Frame Buffer → Composited into the web page

```

- WebGL = JavaScript API based on OpenGL ES 2.0/3.0
- WebGPU = modern API closer to Vulkan/Metal/Direct3D 12

---

| OS             | Backend used by Chromium / VS Code | Description              |
| -------------- | ---------------------------------- | ------------------------ |
| 🪟 **Windows** | **DirectX via ANGLE**              | WebGL → Direct3D calls   |
| 🍎 **macOS**   | **Metal via ANGLE**                | WebGL → Metal            |
| 🐧 **Linux**   | **Vulkan or OpenGL**               | Depending on GPU support |

## Browser

| Browser             | Uses OS Native Graphics?                         | Ships/Bundles Its Own Engine? | GPU API(s) Used                    |
| ------------------- | ------------------------------------------------ | ----------------------------- | ---------------------------------- |
| **Safari**          | ✅ Yes (Quartz/CoreGraphics/CoreAnimation/Metal) | ❌ No                         | Metal                              |
| **Chrome**          | ❌ No                                            | ✅ Skia                       | Direct3D / Metal / Vulkan / OpenGL |
| **Firefox**         | ❌ No (used Cairo; now WebRender)                | ✅ WebRender                  | Direct3D / Metal / Vulkan / OpenGL |
| **Edge (Chromium)** | ❌ No                                            | ✅ Skia (same as Chrome)      | Direct3D / Metal / Vulkan          |

## **Comparison Table: Different Distros**

| Distro         | Desktop  | Display Server | Toolkit | Compositor | Graphics    |
| -------------- | -------- | -------------- | ------- | ---------- | ----------- |
| **Ubuntu**     | GNOME    | Wayland        | GTK     | Mutter     | Mesa/OpenGL |
| **Kubuntu**    | KDE      | Wayland/X11    | Qt      | KWin       | Mesa/OpenGL |
| **Linux Mint** | Cinnamon | X11 (mostly)   | GTK     | Muffin     | Mesa/OpenGL |
| **Fedora**     | GNOME    | Wayland        | GTK     | Mutter     | Mesa/OpenGL |
| **Arch**       | Choose!  | Choose!        | Both    | Choose!    | Mesa/OpenGL |
| **Debian**     | Multiple | X11/Wayland    | Both    | Varies     | Mesa/OpenGL |

### Files Rendering

File on disk → binary (e.g. 0x89 0x50 0x4E 0x47 …)

The PNG decoder (in your OS or app) reads it using the PNG file format spec:

Header chunk → width, height, color depth

Data chunks → compressed pixel data (zlib)

Palette (optional)

Decoder decompresses it → raw pixel data (e.g. RGBA for each pixel)

Rendering API (Cairo, Skia, Metal, Direct2D, OpenGL, etc.) uploads those pixels into GPU memory (a texture).

GPU draws that texture to a rectangular area (a quad) on your screen.
