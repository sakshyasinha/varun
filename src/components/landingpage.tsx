import React from "react";
import { 
  Shield, Waves, Globe, Users, AlertTriangle, 
  Eye, MessageSquare, ArrowRight, BarChart3, ChevronRight
} from "lucide-react";
import heroImage from "../assets/hero-ocean.jpg";
import logoImg from "../assets/ac1af033383c8cea581deb0dcac634d3a8372b10.png";

const LandingPage = ({ onLaunchDashboard }: { onLaunchDashboard?: () => void }) => {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(to bottom, #0f172a, #1e293b)" }}>
      {/* NAVBAR */}
      <nav style={{
        position: "relative",
        zIndex: 50,
        background: "rgba(31,41,55,0.9)",
        backdropFilter: "blur(6px)",
        borderBottom: "1px solid rgba(55,65,81,0.5)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2rem",
              height: "2rem",
              background: "linear-gradient(to right, #22d3ee, #3b82f6)",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
              <img src={logoImg} alt="Logo" style={{ width: "1.5rem", height: "1.5rem", borderRadius: "0.25rem" }} />
            </div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "bold", color: "white" }}>Varun</h1>
          </div>

          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="#features" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, textDecoration: "none" }}>Features</a>
            <a href="#platform" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500, textDecoration: "none" }}>Platform</a>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer"
              }}
              onClick={onLaunchDashboard}
            >
              REPORT
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom right, rgba(30,58,138,0.8), rgba(17,94,89,0.8))"
        }} />

        <div style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "1.5rem",
            lineHeight: 1.2
          }}>
            Integrated<br />
            Platform for<br />
            <span style={{
              background: "linear-gradient(to right, #67e8f9, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Ocean Hazard<br />Reporting
            </span>
          </h1>
          <p style={{
            fontSize: "1.25rem",
            color: "rgba(255,255,255,0.9)",
            maxWidth: "700px",
            marginBottom: "3rem",
            lineHeight: 1.6
          }}>
            Empowering coastal communities with real-time crowdsourced reporting and AI-powered analytics
            for comprehensive ocean hazard monitoring and disaster management.
          </p>
          <button
            onClick={onLaunchDashboard}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.3)",
              padding: "1rem 3rem",
              borderRadius: "9999px",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "white",
              backdropFilter: "blur(6px)",
              cursor: "pointer"
            }}
          >
            LAUNCH DEMO
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{
        padding: "5rem 1.5rem",
        background: "linear-gradient(to bottom right, #111827, #1f2937, #111827)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gap: "2rem", gridTemplateColumns: "1fr 2fr" }}>
          {/* BIG FEATURE CARD */}
          <div style={{
            background: "linear-gradient(to bottom right, #06b6d4, #3b82f6)",
            borderRadius: "1rem",
            padding: "2rem",
            color: "white",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Real-time Ocean Monitoring</h2>
            <p style={{ lineHeight: 1.6 }}>
              Continuously tracks ocean conditions and hazards using sensors, satellites,
              and crowdsourced data. Provides alerts to protect coastal communities.
            </p>
          </div>

          {/* GRID OF SMALLER FEATURES */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem"
          }}>
            {[
              { icon: <MessageSquare />, title: "Social Media Analytics", desc: "AI-powered NLP detects trends and incidents." },
              { icon: <Users />, title: "Crowdsourced Reporting", desc: "Citizens report real-time hazards with media." },
              { icon: <Shield />, title: "Data Verification", desc: "Filters misinformation with multi-layer checks." },
              { icon: <Eye />, title: "Real-time Dashboard", desc: "Unified command center for disaster response." },
              { icon: <Globe />, title: "Geospatial Intelligence", desc: "Mapping & geographic analysis of hazards." },
              { icon: <AlertTriangle />, title: "Early Warning System", desc: "Faster, more targeted emergency responses." },
            ].map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "0.75rem",
                padding: "1.5rem",
                color: "white",
                textAlign: "left",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "0.75rem" }}>
                  {f.icon}
                  <h3 style={{ fontWeight: "bold", marginLeft: "0.75rem" }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.9)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(6px)",
        padding: "2rem 1.5rem",
        color: "white"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2rem",
              height: "2rem",
              background: "linear-gradient(to right, #06b6d4, #3b82f6)",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <img src={logoImg} alt="Logo" style={{ width: "1.5rem", height: "1.5rem", borderRadius: "0.25rem" }} />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>Varun</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
            © 2025 Varun. Supporting INCOIS and coastal communities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
