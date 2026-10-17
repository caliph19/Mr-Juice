import React from "react";
import Reveal from "../components/Reveal.jsx";
import DriftWall from "../components/DriftWall/DriftWall.jsx";
import mrjc1 from "../images/shopAndproduct/mrjuice1.jpeg";
import mrjc2 from "../images/shopAndproduct/mrjuice2.jpeg";
import mrjc3 from "../images/shopAndproduct/mrjuice3.jpeg";
import mrjc4 from "../images/shopAndproduct/gellary1.jpg";
import mrjc5 from "../images/shopAndproduct/gellary2.jpg";
import mrjc6 from "../images/shopAndproduct/gellary3.jpg";
import mrjc7 from "../images/shopAndproduct/gellary4.jpg";
import mrjc8 from "../images/shopAndproduct/gellary5.jpg";
import mrjc20 from "../images/shopAndproduct/gellary23.jpg";
import mrjc21 from "../images/shopAndproduct/gellary24.jpg";
import mrjc22 from "../images/shopAndproduct/gellary25.jpg";
import mrjc23 from "../images/shopAndproduct/gellary26.png";

import Masonry from "../components/imagegellary/Masonry.jsx";

// Items for DriftWall (uses "image")
const driftItems = [
  { image: mrjc1, title: "Peaks" },
  { image: mrjc2, title: "Pup" },
  { image: mrjc3, title: "Falls" },
];

// Items for Masonry (uses "id" + "img")
const masonryItems = [
  { id: "1", img: mrjc1, title: "Peaks" },
  { id: "2", img: mrjc2, title: "Pup" },
  { id: "3", img: mrjc3, title: "Falls" },
  { id: "4", img: mrjc4, title: "Peaks" },
  { id: "5", img: mrjc5, title: "Pup" },
  { id: "6", img: mrjc6, title: "Falls" },
  { id: "7", img: mrjc7, title: "Peaks" },
  { id: "8", img: mrjc8, title: "Falls" },
    { id: "20", img: mrjc20, title: "Falls" },
  { id: "21", img: mrjc21, title: "Peaks" },
  { id: "22", img: mrjc22, title: "Falls" },
  { id: "23", img: mrjc23, title: "Peaks" },

];

export default function Gallery() {
  return (
    <div className="pt-24 sm:pt-28 lg:pt-32">
      <section className="container-brand pb-6 text-center">
        <Reveal>
          <p className="eyebrow">A taste, visually</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold text-juice-ink sm:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-juice-ink/60">
            A peek at what's blending. Tap any tile for a closer look.
          </p>
        </Reveal>
      </section>

      {/* DriftWall section */}
      {/* <div
        className="h-[70vh] sm:h-[80vh] lg:h-screen"
        style={{ padding: "50px 0px", backgroundColor: "#1b1a1a" }}
      >
        <DriftWall
          items={driftItems}
          columns={5}
          tileWidth={250}
          tileHeight={172}
          gap={18}
          tilt={16}
          turn={0}
          perspective={1200}
          depth={120}
          speed={42}
          direction="up"
          variance={0.45}
          parallax={0.6}
          lift={64}
          fade={0.6}
          dim={0.55}
          overlayColor="#060010"
        />
      </div> */}

      {/* Masonry section — auto height, responsive padding */}
      <div
        className="w-full px-12 sm:px-24 lg:px-40 py-[50px]"
      >
        <Masonry
          items={masonryItems}
          columns="auto"
          columnWidth={240}
          gap={12}
          radius={12}
          animateFrom="bottom"
          stagger={0.05}
          duration={0.6}
          bounce={0.15}
          blurToFocus
          revealOnScroll
          hoverEffect="zoom"
          captions="hover"
          parallax={0.2}
          lightbox
          draggable
        />
      </div>
    </div>
  );
}
