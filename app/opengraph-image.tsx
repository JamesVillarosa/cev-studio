import { ImageResponse } from "next/og";

export const alt = "cev.studio — Independent design & build studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dark + lime social card, generated to match the site's brand.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1d1d1d",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* lime light source */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(closest-side, rgba(179,230,17,0.30), rgba(179,230,17,0.06) 55%, transparent 78%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9c9c94",
          }}
        >
          <span style={{ color: "#b3e611", marginRight: 14, fontSize: 30 }}>
            .
          </span>
          Independent design &amp; build studio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-end", fontSize: 150, fontWeight: 800 }}>
            <span style={{ color: "#b3e611" }}>cev</span>
            <span style={{ color: "#b3e611" }}>.</span>
            <span style={{ color: "#f4f4ef" }}>studio</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#9c9c94", maxWidth: 820 }}>
            Brand identity, web, mobile &amp; 3D — designed and built in-house.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#6a6a62" }}>
          <span>Web Development</span>
          <span style={{ color: "#b3e611" }}>·</span>
          <span>Mobile Apps</span>
          <span style={{ color: "#b3e611" }}>·</span>
          <span>Brand Identity</span>
          <span style={{ color: "#b3e611" }}>·</span>
          <span>3D Modelling</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
