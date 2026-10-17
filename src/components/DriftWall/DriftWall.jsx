'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './DriftWall.css';

const DEFAULT_ITEMS = Array.from({ length: 15 }, (_, i) => {
  const ids = [1015, 1025, 1039, 1043, 1044, 1050, 1062, 1069, 1074, 1080, 1084, 106, 110, 133, 164];
  return {
    image: `https://picsum.photos/id/${ids[i % ids.length]}/600/400`,
    title: `Tile ${i + 1}`,
    href: undefined,
  };
});

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const columnFactor = (index, variance) => {
  const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
};

const DriftWall = ({
  items = DEFAULT_ITEMS,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  radius = 14,
  tilt = 16,
  turn = -14,
  roll = 0,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  pauseOnHover = false,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  grayscale = false,
  overlayColor = '#060010',
  className = '',
  style,
}) => {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const trackRefs = useRef([]);
  const rafRef = useRef(null);

  const offsetsRef = useRef([]);
  const velocitiesRef = useRef([]);
  const hoveredColRef = useRef(-1);
  const wallHoveredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const pointerDampedRef = useRef({ x: 0, y: 0 });
  const lastTsRef = useRef(null);

  // Drag detection (so dragging the wall doesn't open a tile)
  const draggedRef = useRef(false);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState(null);
  const activeIdRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  // Lightbox state
  const [preview, setPreview] = useState(null); // { image, title }

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock body scroll while preview is open
  useEffect(() => {
    if (!preview) return undefined;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [preview]);

  // Esc to close preview
  useEffect(() => {
    if (!preview) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setPreview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [preview]);
const columnItems = useMemo(() => {
  const cols = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => cols[i % columns].push(item));
  return cols.map((col) => {
    if (col.length === 0) return items.slice(0, 1);
    // Ensure at least 2 items per column so the loop height is meaningful
    if (col.length === 1) return [...col, ...col];
    return col;
  });
}, [items, columns]);

const columnMeta = useMemo(() => {
  const unit = tileHeight + gap;
  return columnItems.map((col) => {
    const copyHeight = Math.max(unit, col.length * unit);
    // Bigger buffer so the track never runs out mid-viewport
    const copies = Math.max(
      3,
      Math.ceil((containerHeight * 2.5) / copyHeight) + 1
    );
    return { copyHeight, copies };
  });
}, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || 600);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

useEffect(() => {
  offsetsRef.current = columnMeta.map((meta, c) => {
    const prev = offsetsRef.current[c] ?? meta.copyHeight * ((c * 0.37) % 1);
    // wrap into the new copyHeight range so nothing jumps
    return ((prev % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
  });
  velocitiesRef.current = columnItems.map((_, c) => velocitiesRef.current[c] ?? 0);
}, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px, py) => {
      const plane = planeRef.current;
      if (!plane) return;
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth]
  );

  useEffect(() => {
    const animate = (ts) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x +=
        (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y +=
        (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(
        pointerDampedRef.current.x,
        pointerDampedRef.current.y
      );

      if (!reduced) {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const meta = columnMeta[c];
          if (!meta) continue;
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = baseVelocities[c] * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] +=
            (target - velocitiesRef.current[c]) * ease;
          let next =
            (offsetsRef.current[c] ?? 0) + velocitiesRef.current[c] * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) el.style.transform = `translate3d(0, ${-next}px, 0)`;
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c++) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta)
            el.style.transform = `translate3d(0, ${-(
              offsetsRef.current[c] ?? 0
            )}px, 0)`;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [
    baseVelocities,
    columnMeta,
    pauseOnHover,
    parallax,
    reduced,
    applyPlaneTransform,
  ]);

  const activate = useCallback((id, index) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Detect drag
      if (
        pointerDownPosRef.current.x !== 0 ||
        pointerDownPosRef.current.y !== 0
      ) {
        const dx = e.clientX - pointerDownPosRef.current.x;
        const dy = e.clientY - pointerDownPosRef.current.y;
        if (Math.hypot(dx, dy) > 6) draggedRef.current = true;
      }

      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && hit.closest ? hit.closest('[data-tile-id]') : null;
      if (!tile) return;
      const id = tile.dataset.tileId;
      if (id === activeIdRef.current) return;
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced]
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () => ({
      '--dw-tile-w': `${tileWidth}px`,
      '--dw-tile-h': `${tileHeight}px`,
      '--dw-gap': `${gap}px`,
      '--dw-radius': `${radius}px`,
      '--dw-perspective': `${perspective}px`,
      '--dw-lift': `${lift}px`,
      '--dw-dim': dim,
      '--dw-gray': grayscale ? 1 : 0,
      '--dw-overlay': overlayColor,
      '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
      ...style,
    }),
    [
      tileWidth,
      tileHeight,
      gap,
      radius,
      perspective,
      lift,
      dim,
      grayscale,
      overlayColor,
      fade,
      style,
    ]
  );

  const openPreview = useCallback((item) => {
    setPreview({ image: item.image, title: item.title });
  }, []);

  const renderTile = (item, id, colIndex) => {
    const inner = (
      <span className="drift-wall__inner">
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );

    const handleOpen = (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Only primary button / single tap
      if (e.type === 'pointerup' && e.button !== 0) return;

      // Ignore if user was dragging
      if (draggedRef.current) return;

      openPreview(item);
    };

    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onPointerEnter: () => activate(id, colIndex),
      onPointerLeave: release,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
      onPointerUp: handleOpen,
      role: 'button',
      tabIndex: 0,
      'aria-label': item.title ?? 'tile',
    };

    if (item.href) {
      return (
        <a
          key={id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          {...commonProps}
        >
          {inner}
        </a>
      );
    }

    return (
      <div key={id} {...commonProps}>
        {inner}
      </div>
    );
  };

  const rootClass = [
    'drift-wall',
    reduced ? 'drift-wall--reduced' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div
        ref={containerRef}
        className={rootClass}
        style={cssVars}
        onPointerDown={(e) => {
          draggedRef.current = false;
          pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => {
          setTimeout(() => {
            draggedRef.current = false;
            pointerDownPosRef.current = { x: 0, y: 0 };
          }, 0);
        }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => {
          wallHoveredRef.current = true;
        }}
        onPointerLeave={handlePointerLeaveWall}
        role="group"
        aria-label="Drifting wall of tiles"
      >
        <div ref={planeRef} className="drift-wall__plane">
          {columnItems.map((col, c) => {
            const meta = columnMeta[c];
            const copies = Array.from({ length: meta.copies });
            return (
              <div className="drift-wall__col" key={`col-${c}`}>
                <div
                  className="drift-wall__track"
                  ref={(el) => (trackRefs.current[c] = el)}
                >
                  {copies.map((_, copyIndex) =>
                    col.map((item, itemIndex) =>
                      renderTile(
                        item,
                        `${c}-${copyIndex}-${itemIndex}`,
                        c
                      )
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen preview */}
      <AnimatePresence>
        {preview && (
          <motion.div
            key="driftwall-preview"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreview(null)}
            role="dialog"
            aria-modal="true"
            aria-label={preview.title ?? 'Image preview'}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreview(null);
              }}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/70 sm:right-6 sm:top-6"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <motion.img
              src={preview.image}
              alt={preview.title ?? ''}
              className="h-full w-full select-none object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />

            {preview.title && (
              <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-xs tracking-[0.2em] text-white">
                {preview.title}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DriftWall;