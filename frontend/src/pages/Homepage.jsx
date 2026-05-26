import { Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, Links } from "react-router-dom";


const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --red: #dc2626;
      --red-dark: #991b1b;
      --red-glow: rgba(220,38,38,0.15);
      --gold: #d97706;
      --bg: #060810;
      --bg2: #0c1018;
      --surface: rgba(255,255,255,0.04);
      --border: rgba(255,255,255,0.08);
      --text: #f1f5f9;
      --muted: #64748b;
      --font-display: 'Bebas Neue', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'DM Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      overflow-x: hidden;
    }

    /* scrollbar */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--red); border-radius: 2px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    @keyframes ticker {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-10px); }
    }
    @keyframes scan {
      0%   { top: 0%; }
      100% { top: 100%; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; } 50% { opacity: 0; }
    }
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to   { transform: translateX(0);     opacity: 1; }
    }
    @keyframes countUp {
      from { opacity: 0; transform: scale(0.8); }
      to   { opacity: 1; transform: scale(1); }
    }

    .fade-up   { animation: fadeUp 0.7s ease both; }
    .fade-up-1 { animation: fadeUp 0.7s 0.1s ease both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.25s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.4s ease both; }
    .fade-up-4 { animation: fadeUp 0.7s 0.55s ease both; }

    .hero-bg {
      background:
        radial-gradient(ellipse 80% 50% at 50% -10%, rgba(220,38,38,0.18) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 80% 60%, rgba(220,38,38,0.06) 0%, transparent 60%),
        linear-gradient(180deg, #060810 0%, #080c18 100%);
    }

    .grid-overlay {
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    .card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      border-color: rgba(220,38,38,0.4);
      box-shadow: 0 20px 60px rgba(220,38,38,0.1);
    }

    .btn-primary {
      position: relative;
      overflow: hidden;
      background: var(--red);
      color: white;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.04em;
      padding: 13px 28px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
    }
    .btn-primary:hover { background: #b91c1c; transform: translateY(-1px); }

    .btn-outline {
      background: transparent;
      color: var(--text);
      font-family: var(--font-body);
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.04em;
      padding: 12px 28px;
      border: 1px solid var(--border);
      border-radius: 6px;
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
    }
    .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: white; transform: translateY(-1px); }

    .stat-card {
      animation: countUp 0.6s ease both;
    }

    .floating { animation: float 4s ease-in-out infinite; }

    .scan-line {
      position: absolute;
      left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent);
      animation: scan 3s linear infinite;
      pointer-events: none;
    }
  `}</style>
);


const ShieldIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const BellIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const EyeIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const MapIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);
const LockIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const ClockIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const UsersIcon = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ChevronRight = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const MenuIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const XIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const CheckIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const ArrowRight = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 24px",
      background: scrolled ? "rgba(6,8,16,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

 
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Eye size={18} color="#dc2626" />
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.04em", color: "white" }}>WATCH</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "0.04em", color: "var(--red)" }}>DOGS</span>
          </div>
        </div>

        

     
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link to='/login'> <button className="btn-outline" style={{ padding: "9px 20px", fontSize: 13 }}>Log In</button></Link>

            <Link to='/signup'> <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 13 }}>Sign Up</button></Link>
         
         
          
         
        </div>
      </div>

     
      

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};


const Ticker = () => {
  const items = [
    " Report problems or crimes of your areas",
    " Watch what's happening in the country",
    " Simple AI integration for your convenience",
    " Manage your report logs",
   
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{
      background: "rgba(220,38,38,0.1)", borderBottom: "1px solid rgba(220,38,38,0.2)",
      overflow: "hidden", whiteSpace: "nowrap", marginTop: 68
    }}>
      <div style={{ display: "flex", gap: 60, padding: "9px 0", animation: "ticker 40s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>{item}</span>
        ))}
      </div>
    </div>
  );
};


const Hero = () => (
  <section id="home" className="hero-bg grid-overlay" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

    
    <div style={{
      position: "absolute", inset: 0, zIndex: 0,
      backgroundImage: "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1600&auto=format&fit=crop&q=60')",
      backgroundSize: "cover", backgroundPosition: "center",
      opacity: 0.12,
    }} />

  
    <div style={{ position: "absolute", left: 0, top: "20%", bottom: "20%", width: 3, background: "linear-gradient(180deg, transparent, var(--red), transparent)", zIndex: 1 }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 2, width: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

     
        <div>
      
         

          <h1 className="fade-up-1" style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(52px, 6vw, 88px)",
            lineHeight: 0.95, letterSpacing: "0.02em", color: "white", marginBottom: 24
          }}>
            REPORT.<br />
            <span style={{ color: "var(--red)" }}>PROTECT.</span><br />
            PREVENT.
          </h1>

          <p className="fade-up-2" style={{
            fontFamily: "var(--font-body)", fontSize: 17, lineHeight: 1.7,
            color: "var(--muted)", maxWidth: 460, marginBottom: 36
          }}>
            WatchDogs empowers every citizen to report crimes safely and anonymously. Your information helps law enforcement act faster and keeps your community safer.
          </p>

          <div className="fade-up-3" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <Link to='/login'>
            <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, padding: "14px 32px" }}>
              Report a Crime <ArrowRight />
            </button>
            </Link>
            
            <Link to='/signup'>
            <button className="btn-outline" style={{ fontSize: 15, padding: "14px 32px" }}>
              Create Account
            </button>
            </Link>
            
          </div>

        
          <div className="fade-up-4" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {[
              { label: "Anonymous", icon: <LockIcon /> },
              { label: "24/7 Active", icon: <ClockIcon /> },
              { label: "Verified Cases", icon: <CheckIcon /> },
            ].map(({ label, icon }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ color: "var(--red)" }}>{icon}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

   
        <div className="floating" style={{ position: "relative" }}>
          <div style={{
            borderRadius: 16, overflow: "hidden", position: "relative",
            border: "1px solid var(--border)", boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(220,38,38,0.08)"
          }}>
            <img
              src="https://images.unsplash.com/photo-1580847097346-72d80f164702?w=700&auto=format&fit=crop&q=80"
              alt="Police officer"
              style={{ width: "100%", height: 420, objectFit: "cover", display: "block", opacity: 0.85 }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(6,8,16,0.9) 100%)" }} />
            <div className="scan-line" />

       
          </div>

         
        </div>
      </div>
    </div>

    <style>{`
      @media (max-width: 768px) {
        #home > div > div { grid-template-columns: 1fr !important; }
        #home > div > div > div:last-child { display: none; }
      }
    `}</style>
  </section>
);





const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Create an Account", desc: "Sign up for free in under 2 minutes. Your personal details are encrypted and never shared with third parties." },
    { num: "02", title: "Submit Your Report", desc: "Fill out a simple, guided form. Attach photos or videos if available. Reports can be fully anonymous." },
    { num: "03", title: "We Route It", desc: "Your report is instantly verified and published in the website." },
    { num: "04", title: "Track Progress", desc: "Update the progress if its pending/investigating/resolved or ignored" },
  ];
  return (
    <section id="how-it-works" style={{ background: "var(--bg)", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.15em", display: "block", marginBottom: 12 }}>THE PROCESS</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", color: "white", letterSpacing: "0.02em" }}>HOW IT WORKS</h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--muted)", maxWidth: 500, margin: "16px auto 0" }}>
            From report to resolution — a streamlined process built for speed and safety.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, position: "relative" }}>
     
          <div style={{ position: "absolute", top: 32, left: "12.5%", right: "12.5%", height: 1, background: "linear-gradient(90deg, transparent, var(--border), var(--border), transparent)", zIndex: 0 }} />

          {steps.map((step, i) => (
            <div key={i} style={{
              padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1,
              borderRight: i < 3 ? "1px solid var(--border)" : "none"
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%", margin: "0 auto 24px",
                background: i === 0 ? "var(--red)" : "var(--surface)",
                border: `1px solid ${i === 0 ? "var(--red)" : "var(--border)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "white", letterSpacing: "0.04em" }}>{step.num}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "white", marginBottom: 12 }}>{step.title}</h3>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          #how-it-works > div > div:last-child { grid-template-columns: 1fr !important; }
          #how-it-works > div > div:last-child > div { border-right: none !important; border-bottom: 1px solid var(--border); padding: 24px 0 !important; }
        }
      `}</style>
    </section>
  );
};



const CTABanner = () => (
  <section style={{ background: "var(--bg)", padding: "80px 24px", borderTop: "1px solid var(--border)" }}>
    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        background: "linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(220,38,38,0.04) 100%)",
        border: "1px solid rgba(220,38,38,0.2)", borderRadius: 20, padding: "64px 40px"
      }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Eye size={26} color="#dc2626" />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", color: "white", letterSpacing: "0.02em", marginBottom: 16 }}>
          YOUR COUNTRY NEEDS YOU.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--muted)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Join other citizens already making their communities safer. Sign up in 2 minutes — it's free, forever.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to='/signup'>
          <button className="btn-primary" style={{ fontSize: 15, padding: "14px 36px" }}>Create Free Account</button>
          </Link>
          
         
        </div>
      </div>
    </div>
  </section>
);


const Footer = () => (
  <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "48px 24px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48 }}>
     
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Eye  size={16} color="#dc2626" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "white" }}>WATCH<span style={{ color: "var(--red)" }}>DOGS</span></span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", lineHeight: 1.7, maxWidth: 260 }}>
            Empowering communities to fight crime through safe, anonymous, and effective reporting.
          </p>
        </div>

        {[
          { title: "Platform", links: ["Report a Crime", "Crime Map", "Community Watch", "Mobile App"] },
          { title: "Company", links: ["About Us", "Partners", "Press", "Careers"] },
          { title: "Legal", links: ["Privacy Policy", "Terms of Use", "Security", "Cookie Policy"] },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 600, color: "white", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</h4>
            {col.links.map(link => (
              <a key={link} href="#" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: 13, color: "var(--muted)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "white"}
                onMouseLeave={e => e.target.style.color = "var(--muted)"}
              >{link}</a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>© 2026 WatchDogs Inc. All rights reserved.</span>
       
      </div>
    </div>
    <style>{`
      @media(max-width:768px){
        footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
      }
    `}</style>
  </footer>
);


export default function Homepage() {
  return (
    <>
      <FontLoader />
      <Navbar />
      <Ticker />
      <Hero />
   
      <HowItWorks />
   
    
 
      <CTABanner />
      <Footer />
    </>
  );
}
