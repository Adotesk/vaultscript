import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0a0a0a;
    --surface: #111111;
    --card: #161616;
    --border: #242424;
    --border2: #1e1e1e;
    --amber: #f59e0b;
    --amber-dim: #7c5106;
    --amber-glow: rgba(245,158,11,0.10);
    --amber-glow2: rgba(245,158,11,0.05);
    --text: #ede8df;
    --muted: #6b6460;
    --muted2: #333;
    --green: #22c55e;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    overflow-x: hidden;
    line-height: 1;
  }

  /* ── NOISE + ORBS ── */
  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 128px;
  }
  .orb {
    position: fixed; pointer-events: none; border-radius: 50%; z-index: 0;
    filter: blur(80px);
  }
  .orb1 { width: 600px; height: 600px; top: -200px; left: 50%; transform: translateX(-50%); background: radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%); }
  .orb2 { width: 400px; height: 400px; bottom: 20%; right: -100px; background: radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%); }

  /* ── NAV ── */
  nav {
    position: sticky; top: 0; z-index: 100;
    padding: 0 40px;
    height: 60px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border2);
    background: rgba(10,10,10,0.85);
    backdrop-filter: blur(16px);
  }
  .nav-logo {
    font-family: 'Bebas Neue'; font-size: 24px; letter-spacing: 0.08em;
    color: var(--text);
  }
  .nav-logo span { color: var(--amber); }
  .nav-links {
    display: flex; gap: 32px; align-items: center;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted);
  }
  .nav-links a { color: var(--muted); text-decoration: none; transition: color 0.15s; cursor: pointer; }
  .nav-links a:hover { color: var(--text); }
  .nav-cta {
    padding: 9px 20px;
    background: var(--amber); border: none; border-radius: 2px;
    font-family: 'DM Mono'; font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase; color: #0a0a0a; font-weight: 500;
    cursor: pointer; transition: opacity 0.15s;
  }
  .nav-cta:hover { opacity: 0.88; }

  /* ── SECTIONS ── */
  section { position: relative; z-index: 1; }

  /* ── HERO ── */
  .hero {
    min-height: 92vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    padding: 80px 24px 100px;
    border-bottom: 1px solid var(--border2);
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--amber-dim);
    background: var(--amber-glow);
    border-radius: 2px; padding: 6px 14px;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--amber); margin-bottom: 40px;
    animation: fadeDown 0.6s ease both;
  }
  .hero-badge::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--amber); box-shadow: 0 0 8px var(--amber);
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1}50%{opacity:0.2} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }

  .hero h1 {
    font-family: 'Bebas Neue'; font-size: clamp(72px, 13vw, 160px);
    letter-spacing: 0.01em; line-height: 0.88;
    color: var(--text);
    animation: fadeDown 0.6s 0.1s ease both;
  }
  .hero h1 em { color: var(--amber); font-style: normal; }

  .hero-sub {
    margin-top: 28px;
    font-family: 'Instrument Serif'; font-style: italic;
    font-size: clamp(16px, 2.5vw, 22px);
    color: var(--muted); line-height: 1.5; max-width: 600px;
    animation: fadeDown 0.6s 0.2s ease both;
  }

  .hero-stats {
    display: flex; gap: 40px; margin-top: 52px; margin-bottom: 52px;
    animation: fadeDown 0.6s 0.3s ease both;
  }
  .stat { text-align: center; }
  .stat-num { font-family: 'Bebas Neue'; font-size: 40px; color: var(--amber); line-height: 1; }
  .stat-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

  .hero-btn {
    display: inline-flex; align-items: center; gap: 10px;
    padding: 20px 44px;
    background: var(--amber); border: none; border-radius: 3px;
    font-family: 'Bebas Neue'; font-size: 20px; letter-spacing: 0.12em;
    color: #0a0a0a; cursor: pointer;
    transition: transform 0.15s, opacity 0.15s;
    animation: fadeDown 0.6s 0.35s ease both;
    text-decoration: none;
  }
  .hero-btn:hover { opacity: 0.9; transform: translateY(-2px); }
  .hero-fine {
    margin-top: 14px; font-size: 10px; color: var(--muted);
    letter-spacing: 0.1em; animation: fadeDown 0.6s 0.4s ease both;
  }

  /* ── TICKER ── */
  .ticker-wrap {
    overflow: hidden; border-top: 1px solid var(--border2); border-bottom: 1px solid var(--border2);
    background: var(--surface); padding: 13px 0;
  }
  .ticker-track {
    display: flex; gap: 0;
    animation: ticker 28s linear infinite;
    white-space: nowrap;
  }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Bebas Neue'; font-size: 13px; letter-spacing: 0.15em;
    color: var(--muted); padding: 0 32px;
  }
  .ticker-dot { color: var(--amber); }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ── SECTION HEADER ── */
  .sec-header {
    text-align: center; padding: 100px 24px 64px;
  }
  .sec-tag {
    display: inline-block;
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--amber); margin-bottom: 16px;
  }
  .sec-header h2 {
    font-family: 'Bebas Neue'; font-size: clamp(44px, 7vw, 80px);
    letter-spacing: 0.02em; line-height: 0.92; color: var(--text);
  }
  .sec-header p {
    margin-top: 20px; font-size: 13px; color: var(--muted);
    max-width: 480px; margin-left: auto; margin-right: auto;
    line-height: 1.7;
    font-family: 'Instrument Serif'; font-style: italic; font-size: 16px;
  }

  /* ── HOW IT WORKS ── */
  .steps {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1px; background: var(--border2);
    border: 1px solid var(--border2); border-radius: 4px;
    max-width: 960px; margin: 0 auto 100px; overflow: hidden;
  }
  .step {
    background: var(--card); padding: 40px 32px;
    position: relative;
  }
  .step-num {
    font-family: 'Bebas Neue'; font-size: 72px; line-height: 1;
    color: var(--muted2); position: absolute; top: 16px; right: 20px;
  }
  .step-icon { font-size: 28px; margin-bottom: 20px; }
  .step h3 {
    font-family: 'Bebas Neue'; font-size: 24px; letter-spacing: 0.05em;
    color: var(--text); margin-bottom: 10px;
  }
  .step p { font-size: 12px; line-height: 1.7; color: var(--muted); }

  /* ── WHAT YOU GET ── */
  .features {
    max-width: 960px; margin: 0 auto 100px; padding: 0 24px;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;
  }
  .feat-card {
    border: 1px solid var(--border); border-radius: 4px;
    background: var(--card); padding: 28px;
    transition: border-color 0.2s;
  }
  .feat-card:hover { border-color: var(--amber-dim); }
  .feat-icon {
    width: 40px; height: 40px; border-radius: 3px;
    background: var(--amber-glow); border: 1px solid var(--amber-dim);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; margin-bottom: 16px;
  }
  .feat-card h4 {
    font-family: 'Bebas Neue'; font-size: 20px; letter-spacing: 0.05em;
    color: var(--text); margin-bottom: 8px;
  }
  .feat-card p { font-size: 11px; line-height: 1.75; color: var(--muted); }

  /* ── PIPELINE ── */
  .pipeline {
    max-width: 800px; margin: 0 auto 100px; padding: 0 24px;
  }
  .pipe-row {
    display: flex; align-items: flex-start; gap: 24px;
    padding: 28px 0; border-bottom: 1px solid var(--border2);
  }
  .pipe-row:last-child { border-bottom: none; }
  .pipe-step-num {
    font-family: 'Bebas Neue'; font-size: 48px; color: var(--amber);
    line-height: 1; flex-shrink: 0; width: 50px; text-align: right;
  }
  .pipe-content h4 {
    font-family: 'Bebas Neue'; font-size: 22px; letter-spacing: 0.04em;
    color: var(--text); margin-bottom: 6px;
  }
  .pipe-content p { font-size: 12px; color: var(--muted); line-height: 1.7; }
  .pipe-tool {
    display: inline-block; margin-top: 8px; padding: 3px 9px;
    border: 1px solid var(--border); border-radius: 2px;
    font-size: 10px; letter-spacing: 0.1em; color: var(--muted);
  }
  .pipe-arrow {
    text-align: center; padding: 4px 0; color: var(--amber-dim);
    font-size: 20px; display: block;
  }

  /* ── PROOF STRIP ── */
  .proof {
    border-top: 1px solid var(--border2); border-bottom: 1px solid var(--border2);
    background: var(--surface); padding: 60px 24px;
    text-align: center; margin-bottom: 100px;
  }
  .proof-grid {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 48px;
    max-width: 800px; margin: 40px auto 0;
  }
  .proof-item { }
  .proof-num { font-family: 'Bebas Neue'; font-size: 52px; color: var(--amber); line-height: 1; }
  .proof-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

  /* ── PRICING ── */
  .pricing {
    max-width: 820px; margin: 0 auto 100px; padding: 0 24px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  @media(max-width:600px) { .pricing { grid-template-columns: 1fr; } }
  .price-card {
    border: 1px solid var(--border); border-radius: 4px;
    background: var(--card); padding: 36px;
    position: relative; overflow: hidden;
  }
  .price-card.featured {
    border-color: var(--amber);
    background: linear-gradient(135deg, #1a1600 0%, var(--card) 60%);
  }
  .price-badge {
    position: absolute; top: 16px; right: 16px;
    padding: 3px 10px; border-radius: 2px;
    background: var(--amber); font-size: 9px;
    letter-spacing: 0.15em; text-transform: uppercase; color: #0a0a0a;
    font-weight: 600;
  }
  .price-plan { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .price-amount {
    font-family: 'Bebas Neue'; font-size: 64px; color: var(--text); line-height: 1;
  }
  .price-amount sup { font-size: 28px; vertical-align: top; padding-top: 10px; color: var(--amber); }
  .price-amount span { font-size: 18px; color: var(--muted); }
  .price-desc { font-size: 11px; color: var(--muted); margin: 12px 0 24px; line-height: 1.6; }
  .price-list { list-style: none; margin-bottom: 32px; }
  .price-list li {
    font-size: 11px; color: var(--muted); padding: 7px 0;
    border-bottom: 1px solid var(--border2);
    display: flex; align-items: center; gap: 8px;
  }
  .price-list li::before { content: '✓'; color: var(--green); flex-shrink: 0; }
  .price-btn {
    width: 100%; padding: 14px;
    font-family: 'Bebas Neue'; font-size: 18px; letter-spacing: 0.1em;
    border: 1px solid var(--border); border-radius: 2px;
    background: transparent; color: var(--muted);
    cursor: pointer; transition: all 0.15s;
  }
  .price-btn:hover { border-color: var(--text); color: var(--text); }
  .price-btn.featured {
    background: var(--amber); border-color: var(--amber); color: #0a0a0a;
  }
  .price-btn.featured:hover { opacity: 0.9; }

  /* ── FAQ ── */
  .faq { max-width: 680px; margin: 0 auto 100px; padding: 0 24px; }
  .faq-item { border-bottom: 1px solid var(--border2); }
  .faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    padding: 22px 0; text-align: left;
    font-family: 'DM Mono'; font-size: 13px; color: var(--text);
    transition: color 0.15s;
  }
  .faq-q:hover { color: var(--amber); }
  .faq-q .arrow { color: var(--muted); transition: transform 0.2s; font-size: 16px; }
  .faq-q.open .arrow { transform: rotate(45deg); color: var(--amber); }
  .faq-a {
    font-size: 12px; color: var(--muted); line-height: 1.8;
    max-height: 0; overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .faq-a.open { max-height: 200px; padding-bottom: 22px; }

  /* ── FINAL CTA ── */
  .final-cta {
    text-align: center; padding: 100px 24px 120px;
    border-top: 1px solid var(--border2);
    background: linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.03) 100%);
  }
  .final-cta h2 {
    font-family: 'Bebas Neue'; font-size: clamp(48px, 9vw, 100px);
    line-height: 0.9; color: var(--text); margin-bottom: 24px;
  }
  .final-cta h2 em { color: var(--amber); font-style: normal; }
  .final-cta p { font-size: 13px; color: var(--muted); margin-bottom: 44px; line-height: 1.7; max-width: 400px; margin-left: auto; margin-right: auto; }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border2); background: var(--surface);
    padding: 28px 40px;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10px; letter-spacing: 0.12em; color: var(--muted2);
    text-transform: uppercase;
  }
  .footer-logo { font-family: 'Bebas Neue'; font-size: 20px; color: var(--muted); letter-spacing: 0.1em; }
  .footer-logo span { color: var(--amber); }

  /* ── DEMO SECTION ── */
  .demo-section { max-width: 860px; margin: 0 auto; padding: 100px 24px; border-bottom: 1px solid var(--border2); }
  .demo-box { border: 1px solid var(--amber-dim); border-radius: 6px; background: var(--card); overflow: hidden; box-shadow: 0 0 60px rgba(245,158,11,0.06); }
  .demo-header { background: var(--surface); border-bottom: 1px solid var(--border2); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
  .demo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); box-shadow: 0 0 8px var(--amber); animation: blink 2s infinite; }
  .demo-dtitle { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); margin-left: 10px; }
  .demo-free-badge { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; padding: 3px 9px; border: 1px solid var(--green); color: var(--green); border-radius: 2px; }
  .demo-body { padding: 28px 24px; }
  .demo-input-row { display: flex; gap: 12px; margin-bottom: 10px; }
  .demo-input { flex: 1; background: var(--surface); border: 1px solid var(--border); border-radius: 3px; color: var(--text); font-family: 'DM Mono'; font-size: 13px; padding: 13px 16px; outline: none; transition: border-color 0.2s; }
  .demo-input::placeholder { color: var(--muted2); }
  .demo-input:focus { border-color: var(--amber-dim); }
  .demo-gen-btn { padding: 13px 24px; background: var(--amber); border: none; border-radius: 3px; font-family: 'Bebas Neue'; font-size: 17px; letter-spacing: 0.1em; color: #0a0a0a; cursor: pointer; transition: opacity 0.15s; white-space: nowrap; flex-shrink: 0; }
  .demo-gen-btn:hover:not(:disabled) { opacity: 0.88; }
  .demo-gen-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .demo-hint { font-size: 10px; color: var(--muted); letter-spacing: 0.05em; margin-bottom: 4px; }
  .demo-hint span { color: var(--amber); cursor: pointer; text-decoration: underline; }
  .demo-status { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--muted); padding: 10px 14px; border: 1px solid var(--border2); border-radius: 2px; background: var(--surface); margin-top: 12px; }
  .demo-status.active { color: var(--amber); border-color: var(--amber-dim); }
  .demo-spinner { width: 11px; height: 11px; border: 2px solid var(--amber-dim); border-top-color: var(--amber); border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; }
  .demo-output { margin-top: 24px; border-top: 1px solid var(--border2); padding-top: 24px; animation: fadeUp 0.4s ease both; }
  .demo-out-label { font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--amber); margin-bottom: 10px; }
  .demo-title-item { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid var(--border2); }
  .demo-title-item:last-child { border-bottom: none; margin-bottom: 16px; }
  .demo-title-n { font-family: 'Bebas Neue'; font-size: 20px; color: var(--amber); flex-shrink: 0; line-height: 1.1; }
  .demo-title-t { font-size: 13px; line-height: 1.5; }
  .demo-hook-box { background: var(--surface); border-left: 2px solid var(--amber); padding: 16px 20px; border-radius: 0 3px 3px 0; font-size: 12px; line-height: 1.8; color: var(--text); }
  .demo-upgrade { margin-top: 24px; padding: 20px 24px; background: linear-gradient(135deg, #1a1400 0%, var(--surface) 100%); border: 1px solid var(--amber-dim); border-radius: 4px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
  .demo-upgrade p { font-size: 12px; color: var(--muted); line-height: 1.6; }
  .demo-upgrade-title { font-family: 'Bebas Neue'; font-size: 18px; letter-spacing: 0.05em; color: var(--text); display: block; margin-bottom: 4px; }
  .demo-upgrade-btn { padding: 12px 24px; background: var(--amber); border: none; border-radius: 2px; font-family: 'Bebas Neue'; font-size: 16px; letter-spacing: 0.1em; color: #0a0a0a; cursor: pointer; white-space: nowrap; transition: opacity 0.15s; flex-shrink: 0; }
  .demo-upgrade-btn:hover { opacity: 0.88; }

  @media(max-width: 640px) {
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero-stats { gap: 24px; }
    .steps { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 8px; text-align: center; }
    .demo-input-row { flex-direction: column; }
    .demo-upgrade { flex-direction: column; }
  }
`;

const TICKER_ITEMS = [
  "3 SEO Title Options", "45-Second Hook", "Full Timestamped Script",
  "B-Roll Cues", "Thumbnail Concept", "YouTube Description",
  "12 SEO Tags", "Shorts Format", "AI-Powered", "No Face Required",
  "3 SEO Title Options", "45-Second Hook", "Full Timestamped Script",
  "B-Roll Cues", "Thumbnail Concept", "YouTube Description",
  "12 SEO Tags", "Shorts Format", "AI-Powered", "No Face Required",
];

const FEATURES = [
  { icon: "🎯", title: "3 Viral Title Options", desc: "Every generation gives you 3 SEO-optimized, curiosity-driven titles — A/B test to find your winner." },
  { icon: "⚡", title: "Gripping Hook Script", desc: "The first 45 seconds make or break retention. VaultScript writes hooks that stop the scroll." },
  { icon: "📋", title: "Full Timestamped Script", desc: "Every section labeled with timestamps so you know exactly where you are in the video at all times." },
  { icon: "🎬", title: "B-Roll Cues Included", desc: "Specific footage suggestions at every timestamp — no more staring at a blank search bar on Pexels." },
  { icon: "🖼️", title: "Thumbnail Concept", desc: "A ready-to-build thumbnail brief with composition, text overlay, and visual direction." },
  { icon: "🔍", title: "SEO-Rich Description", desc: "A 150–200 word YouTube description written and ready to paste. Includes CTA and keyword targeting." },
  { icon: "🏷️", title: "12 SEO Tags", desc: "Algorithm-friendly tags generated for your exact niche so YouTube knows exactly who to show your video to." },
  { icon: "📱", title: "Shorts Mode", desc: "Built for YouTube. Select 30–60 seconds for a punchy script you can repurpose to TikTok and Instagram Reels." },
];

const PIPELINE = [
  { step: "01", title: "Generate Your Script", desc: "Enter your niche, pick your style and tone, hit generate. Full script ready in under 60 seconds.", tool: "VaultScript" },
  { step: "02", title: "Record the Voiceover", desc: "Paste the narration into an AI voice tool. No mic, no studio, no face needed.", tool: "ElevenLabs · Murf AI" },
  { step: "03", title: "Layer the B-Roll", desc: "Drop your audio into a video editor and layer the free stock footage the script told you to find.", tool: "CapCut · DaVinci Resolve" },
  { step: "04", title: "Design the Thumbnail", desc: "Use the thumbnail brief to build a click-worthy graphic in minutes.", tool: "Canva" },
  { step: "05", title: "Paste & Publish", desc: "Your description and tags are already written. Paste and hit upload on YouTube. Repurpose Shorts to TikTok and Reels.", tool: "YouTube Studio · TikTok · Instagram" },
];

const FAQS = [
  { q: "Do I need any video experience?", a: "None at all. VaultScript writes the entire script for you and tells you exactly what footage to find. Beginners publish their first video within a day of signing up." },
  { q: "Will my videos get detected as AI?", a: "The script is a starting point — your voiceover choice, footage, and editing style make each video unique. Thousands of faceless channels use AI tools with no issues." },
  { q: "How many scripts can I generate?", a: "Starter plan includes 15 scripts per month. Pro plan is unlimited. Most creators publish 2–4 videos per week." },
  { q: "What niches work best?", a: "Dark history, abandoned places, true crime, finance & investing, stoicism, AI & tech, motivational — any niche with evergreen curiosity does well with faceless content." },
  { q: "Can I generate YouTube Shorts scripts?", a: "Yes. Select the 30–60 second duration and VaultScript generates a punchy, hook-first short-form script perfect for Shorts, TikTok, and Reels." },
];

const DEMO_SUGGESTIONS = ["abandoned places", "dark history", "stoic philosophy", "AI & the future", "true crime cold cases", "how billionaires think"];
const DEMO_STYLES   = ["Educational", "Listicle", "Documentary", "Story-Time", "Expose / Deep-Dive", "Motivational"];
const DEMO_DURATIONS = ["30–60 sec", "3–5 min", "7–10 min", "12–15 min", "20+ min"];
const DEMO_TONES    = ["Calm & Authoritative", "Hype & Energetic", "Dark & Mysterious", "Conversational"];

const pillBase = { padding:'7px 14px', border:'1px solid #242424', borderRadius:2, fontSize:11, letterSpacing:'0.05em', background:'#161616', color:'#6b6460', cursor:'pointer', fontFamily:"'DM Mono',monospace", transition:'all 0.15s' };
const pillActive = { ...pillBase, background:'rgba(245,158,11,0.10)', borderColor:'#f59e0b', color:'#f59e0b' };

function DemoSection() {
  const [niche, setNiche]         = useState("");
  const [videoStyle, setVideoStyle] = useState("Educational");
  const [duration, setDuration]   = useState("7–10 min");
  const [tone, setTone]           = useState("Calm & Authoritative");
  const [loading, setLoading]     = useState(false);
  const [status, setStatus]       = useState("Configure your video below, then hit generate — it's free.");
  const [result, setResult]       = useState(null);
  const [used, setUsed]           = useState(false);

  async function generate() {
    if (!niche.trim() || used) return;
    setLoading(true); setResult(null);
    const statuses = ["Picking the best angle...", "Writing your titles...", "Crafting the hook...", "Almost ready..."];
    let si = 0;
    setStatus(statuses[0]);
    const ticker = setInterval(() => { si = (si+1) % statuses.length; setStatus(statuses[si]); }, 1800);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 900,
          messages: [{ role: "user", content: `You are a viral faceless YouTube scriptwriter. Generate for:
Niche: "${niche}"
Style: ${videoStyle}
Duration: ${duration}
Tone: ${tone}

Respond ONLY with valid JSON (no markdown, no backticks, no extra text):
{"titles":["SEO-optimized title 1","title 2","title 3"],"hook":"A gripping 40-second spoken opening hook written in a ${tone} tone for a ${videoStyle} video. No intro, no fluff. Start mid-action. 4-6 sentences."}` }],
        }),
      });
      clearInterval(ticker);
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setResult(parsed);
      setUsed(true);
      setStatus("Here's your free preview — upgrade to unlock the full script, b-roll cues, description & tags.");
    } catch(e) {
      clearInterval(ticker);
      setStatus("Error — please try again.");
    } finally { setLoading(false); }
  }

  const controlLabel = { fontSize:9, letterSpacing:'0.25em', textTransform:'uppercase', color:'#6b6460', display:'block', marginBottom:8 };
  const pillRow = { display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 };

  return (
    <section id="demo" className="demo-section">
      <div style={{textAlign:'center', marginBottom:40}}>
        <div className="sec-tag">Try It Free — No Account Needed</div>
        <h2 style={{fontFamily:"'Bebas Neue'", fontSize:'clamp(44px,7vw,72px)', letterSpacing:'0.02em', lineHeight:0.92, color:'var(--text)', marginTop:12}}>
          SEE IT WORK<br/><span style={{color:'#f59e0b'}}>RIGHT NOW.</span>
        </h2>
        <p style={{fontFamily:"'Instrument Serif'", fontStyle:'italic', fontSize:16, color:'#6b6460', marginTop:16, lineHeight:1.6}}>
          Configure your video, generate 3 real titles and a full opening hook — free, no sign-up.
        </p>
      </div>

      <div className="demo-box">
        <div className="demo-header">
          <div style={{display:'flex', alignItems:'center'}}>
            <div className="demo-dot" />
            <span className="demo-dtitle">VaultScript — Live Demo</span>
          </div>
          <span className="demo-free-badge">✓ Free Preview</span>
        </div>

        <div className="demo-body">

          {/* NICHE INPUT */}
          <div style={{marginBottom:20}}>
            <span style={controlLabel}>Niche / Topic *</span>
            <div className="demo-input-row" style={{marginBottom:6}}>
              <input
                className="demo-input"
                value={niche}
                onChange={e => setNiche(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && generate()}
                placeholder="e.g. abandoned places, stoicism, dark history, AI investing..."
                disabled={used}
              />
            </div>
            {!used && !loading && (
              <p className="demo-hint">
                Try: {DEMO_SUGGESTIONS.slice(0,3).map((s,i) => (
                  <span key={i} onClick={() => setNiche(s)}>{s}{i < 2 ? " · " : ""}</span>
                ))}
              </p>
            )}
          </div>

          {/* VIDEO STYLE */}
          <div>
            <span style={controlLabel}>Video Style</span>
            <div style={pillRow}>
              {DEMO_STYLES.map(s => (
                <button key={s} style={videoStyle === s ? pillActive : pillBase}
                  onClick={() => !used && setVideoStyle(s)} disabled={used}>{s}</button>
              ))}
            </div>
          </div>

          {/* DURATION */}
          <div>
            <span style={controlLabel}>Target Duration</span>
            <div style={pillRow}>
              {DEMO_DURATIONS.map(d => (
                <button key={d} style={duration === d ? pillActive : pillBase}
                  onClick={() => !used && setDuration(d)} disabled={used}>{d}</button>
              ))}
            </div>
          </div>

          {/* TONE */}
          <div style={{marginBottom:20}}>
            <span style={controlLabel}>Narration Tone</span>
            <div style={pillRow}>
              {DEMO_TONES.map(t => (
                <button key={t} style={tone === t ? pillActive : pillBase}
                  onClick={() => !used && setTone(t)} disabled={used}>{t}</button>
              ))}
            </div>
          </div>

          {/* GENERATE BUTTON */}
          <button className="demo-gen-btn" onClick={generate} disabled={loading || used || !niche.trim()}
            style={{width:'100%', marginBottom:12}}>
            {loading ? "WRITING..." : used ? "✓ GENERATED" : "⚡ GENERATE FREE PREVIEW"}
          </button>

          {/* STATUS */}
          <div className={`demo-status${loading ? " active" : ""}`}>
            {loading && <div className="demo-spinner" />}
            <span>{status}</span>
          </div>

          {/* OUTPUT */}
          {result && (
            <div className="demo-output">
              <div className="demo-out-label">3 Title Options</div>
              {result.titles?.map((t, i) => (
                <div className="demo-title-item" key={i}>
                  <span className="demo-title-n">{String(i+1).padStart(2,"0")}</span>
                  <span className="demo-title-t">{t}</span>
                </div>
              ))}
              <div className="demo-out-label" style={{marginTop:8}}>Opening Hook (40 Seconds)</div>
              <div className="demo-hook-box">{result.hook}</div>
              <div className="demo-upgrade">
                <p>
                  <span className="demo-upgrade-title">Want the full script?</span>
                  Unlock the complete timestamped script, b-roll cues, thumbnail concept, YouTube description, and 12 SEO tags.
                </p>
                <button className="demo-upgrade-btn" onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>
                  GET FULL ACCESS →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className={`faq-q${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        {q} <span className="arrow">+</span>
      </button>
      <div className={`faq-a${open ? " open" : ""}`}>{a}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="noise" />
      <div className="orb orb1" />
      <div className="orb orb2" />

      {/* NAV */}
      <nav>
        <div className="nav-logo">VAULT<span>SCRIPT</span></div>
        <div className="nav-links">
          <a onClick={() => document.getElementById('demo').scrollIntoView({behavior:'smooth'})}>Try Demo</a>
          <a onClick={() => document.getElementById('how').scrollIntoView({behavior:'smooth'})}>How It Works</a>
          <a onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})}>Features</a>
          <a onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>Pricing</a>
          <a onClick={() => document.getElementById('faq').scrollIntoView({behavior:'smooth'})}>FAQ</a>
        </div>
        <button className="nav-cta" onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>
          Get Access
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">AI-Powered · No Face Required</div>
        <h1>FORGE YOUR<br/><em>FACELESS</em><br/>YOUTUBE CHANNEL</h1>
        <p className="hero-sub">From niche to publish-ready script in under 60 seconds. Titles, hook, full script, b-roll cues, description, and tags — all generated by AI.</p>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">60s</div><div className="stat-label">Script Generation</div></div>
          <div className="stat"><div className="stat-num">2hr</div><div className="stat-label">First Video Live</div></div>
          <div className="stat"><div className="stat-num">8x</div><div className="stat-label">Outputs Per Script</div></div>
        </div>
        <a className="hero-btn" onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>
          ⚡ START FORGING SCRIPTS
        </a>
        <p className="hero-fine">No contract · Cancel anytime · Instant access</p>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          {TICKER_ITEMS.map((item, i) => (
            <span className="ticker-item" key={i}>
              {item} <span className="ticker-dot">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* DEMO */}
      <DemoSection />

      {/* HOW IT WORKS */}
      <section id="how">
        <div className="sec-header">
          <div className="sec-tag">Simple 3-Step Process</div>
          <h2>TYPE IT IN.<br/>WE WRITE IT.</h2>
          <p>Enter your niche, choose your style, and let VaultScript do the rest.</p>
        </div>
        <div className="steps" style={{margin:'0 auto 100px',maxWidth:960,padding:'0 24px'}}>
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-icon">✏️</div>
            <h3>Enter Your Niche</h3>
            <p>Type your topic, pick a video style (educational, listicle, documentary...), set your duration, and choose a tone.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-icon">⚡</div>
            <h3>AI Writes Everything</h3>
            <p>VaultScript generates titles, your hook, a full timestamped script with b-roll cues, a thumbnail idea, description, and tags.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-icon">🚀</div>
            <h3>Record, Edit & Upload</h3>
            <p>Add an AI voiceover, layer free stock footage using the b-roll cues, paste the description and publish.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="sec-header">
          <div className="sec-tag">Every Generation Includes</div>
          <h2>8 OUTPUTS.<br/>ONE CLICK.</h2>
          <p>Everything you need to go from idea to published video without writing a single word yourself.</p>
        </div>
        <div className="features">
          {FEATURES.map((f, i) => (
            <div className="feat-card" key={i}>
              <div className="feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <div className="proof">
        <div className="sec-tag">The Numbers</div>
        <div className="proof-grid">
          <div className="proof-item"><div className="proof-num">60s</div><div className="proof-label">Average generation time</div></div>
          <div className="proof-item"><div className="proof-num">8</div><div className="proof-label">Outputs per script</div></div>
          <div className="proof-item"><div className="proof-num">2hr</div><div className="proof-label">From script to published video</div></div>
          <div className="proof-item"><div className="proof-num">∞</div><div className="proof-label">Niches supported</div></div>
        </div>
      </div>

      {/* FULL PIPELINE */}
      <section>
        <div className="sec-header">
          <div className="sec-tag">Complete Creator Workflow</div>
          <h2>SCRIPT TO<br/>PUBLISHED<br/>IN 5 STEPS</h2>
          <p>VaultScript is step one. Here's the full zero-to-upload pipeline most successful faceless channels use.</p>
        </div>
        <div className="pipeline">
          {PIPELINE.map((p, i) => (
            <div className="pipe-row" key={i}>
              <div className="pipe-step-num">{p.step}</div>
              <div className="pipe-content">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <span className="pipe-tool">{p.tool}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="sec-header">
          <div className="sec-tag">Simple Pricing</div>
          <h2>ONE VIDEO PAYS<br/>FOR THE MONTH.</h2>
          <p>A single monetised video covers your subscription. Everything after that is profit.</p>
        </div>
        <div className="pricing">
          <div className="price-card">
            <div className="price-plan">Starter</div>
            <div className="price-amount"><sup>$</sup>19<span>/mo</span></div>
            <div className="price-desc">Perfect for creators just getting started with faceless content.</div>
            <ul className="price-list">
              <li>15 script generations / month</li>
              <li>All 8 outputs included</li>
              <li>All video styles & tones</li>
              <li>Shorts (30–60 sec) mode</li>
              <li>Copy-paste ready outputs</li>
            </ul>
            <button className="price-btn">Get Starter</button>
          </div>
          <div className="price-card featured">
            <div className="price-badge">Most Popular</div>
            <div className="price-plan">Pro</div>
            <div className="price-amount"><sup>$</sup>49<span>/mo</span></div>
            <div className="price-desc">Unlimited scripts for serious creators publishing multiple times a week.</div>
            <ul className="price-list">
              <li>Unlimited script generations</li>
              <li>All 8 outputs included</li>
              <li>All video styles & tones</li>
              <li>Shorts (30–60 sec) mode</li>
              <li>Copy-paste ready outputs</li>
              <li>Priority generation speed</li>
              <li>New features first</li>
            </ul>
            <button className="price-btn featured">Get Pro Access</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="sec-header">
          <div className="sec-tag">Common Questions</div>
          <h2>FAQ</h2>
        </div>
        <div className="faq">
          {FAQS.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <h2>YOUR FIRST<br/>VIDEO IS<br/><em>60 SECONDS</em> AWAY.</h2>
        <p>Join creators building passive income with faceless YouTube channels. No experience needed.</p>
        <a className="hero-btn" onClick={() => document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>
          ⚡ START FORGING SCRIPTS
        </a>
        <p className="hero-fine" style={{marginTop:16}}>No contract · Cancel anytime · Instant access</p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">VAULT<span>SCRIPT</span></div>
        <span>© 2026 VaultScript · All rights reserved</span>
      </footer>
    </>
  );
}
