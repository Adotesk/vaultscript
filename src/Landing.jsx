import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060608;
    --surface: #0d0d10;
    --card: #111116;
    --card2: #16161c;
    --border: #1e1e26;
    --border2: #252530;
    --blue: #5b7cfa;
    --blue-dim: rgba(91,124,250,0.12);
    --blue-glow: rgba(91,124,250,0.07);
    --blue-border: rgba(91,124,250,0.28);
    --text: #ececf1;
    --text2: #9090a8;
    --muted: #50505f;
    --muted2: #252530;
    --green: #34d399;
    --red: #f87171;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
  }

  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(91,124,250,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91,124,250,0.025) 1px, transparent 1px);
    background-size: 52px 52px;
  }
  .glow-top {
    position: fixed; top: -400px; left: 50%; transform: translateX(-50%);
    width: 1000px; height: 800px; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at center, rgba(91,124,250,0.07) 0%, transparent 65%);
  }

  /* ── NAV ── */
  nav {
    position: sticky; top: 0; z-index: 100;
    height: 62px; padding: 0 40px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
    background: rgba(6,6,8,0.85); backdrop-filter: blur(20px);
  }
  .nav-logo {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: 18px; letter-spacing: -0.03em; color: var(--text);
  }
  .nav-logo span { color: var(--blue); }
  .nav-links {
    display: flex; align-items: center; gap: 28px;
    font-family: 'Plus Jakarta Sans'; font-size: 13px; font-weight: 500; color: var(--text2);
  }
  .nav-links a { color: var(--text2); text-decoration: none; cursor: pointer; transition: color 0.15s; }
  .nav-links a:hover { color: var(--text); }
  .nav-btn {
    padding: 8px 18px; background: var(--blue); border: none; border-radius: 8px;
    font-family: 'Plus Jakarta Sans'; font-size: 13px; font-weight: 700;
    color: #fff; cursor: pointer; transition: opacity 0.15s, transform 0.15s;
    box-shadow: 0 2px 12px rgba(91,124,250,0.3);
  }
  .nav-btn:hover { opacity: 0.88; transform: translateY(-1px); }

  /* ── WRAP ── */
  .wrap { position: relative; z-index: 1; }
  .container { max-width: 980px; margin: 0 auto; padding: 0 24px; }

  /* ── HERO ── */
  .hero {
    text-align: center; padding: 100px 24px 110px;
    max-width: 820px; margin: 0 auto;
    border-bottom: 1px solid var(--border);
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--blue-dim); border: 1px solid var(--blue-border);
    border-radius: 100px; padding: 6px 16px;
    font-family: 'Plus Jakarta Sans'; font-size: 12px; font-weight: 600; color: var(--blue);
    margin-bottom: 36px; animation: fadeDown 0.5s ease both;
  }
  .hero-badge::before {
    content: ''; width: 5px; height: 5px; border-radius: 50%;
    background: var(--blue); box-shadow: 0 0 6px var(--blue);
    animation: blink 2.5s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .hero h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 800; font-size: clamp(40px, 7vw, 76px);
    letter-spacing: -0.04em; line-height: 1.04; color: var(--text);
    animation: fadeDown 0.5s 0.08s ease both;
  }
  .hero h1 em { font-style: normal; color: var(--blue); }
  .hero-sub {
    margin-top: 22px; font-size: clamp(15px, 2vw, 18px); font-weight: 400;
    color: var(--text2); line-height: 1.65; max-width: 560px; margin-left: auto; margin-right: auto;
    animation: fadeDown 0.5s 0.14s ease both;
  }

  .hero-stats {
    display: flex; justify-content: center; gap: 48px;
    margin: 48px auto; animation: fadeDown 0.5s 0.2s ease both;
  }
  .stat { text-align: center; }
  .stat-n {
    font-family: 'Plus Jakarta Sans'; font-weight: 800;
    font-size: 36px; letter-spacing: -0.04em; color: var(--text); line-height: 1;
  }
  .stat-n span { color: var(--blue); }
  .stat-l { font-size: 12px; font-weight: 500; color: var(--muted); margin-top: 4px; font-family: 'Plus Jakarta Sans'; }

  .hero-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 36px; background: var(--blue); border: none; border-radius: 12px;
    font-family: 'Plus Jakarta Sans'; font-size: 15px; font-weight: 700;
    color: #fff; cursor: pointer; text-decoration: none;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 24px rgba(91,124,250,0.35);
    animation: fadeDown 0.5s 0.24s ease both;
  }
  .hero-cta:hover { opacity: 0.9; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(91,124,250,0.45); }
  .hero-fine { margin-top: 14px; font-size: 12px; color: var(--muted); animation: fadeDown 0.5s 0.28s ease both; font-family: 'Plus Jakarta Sans'; }

  /* ── TICKER ── */
  .ticker { overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--surface); padding: 12px 0; }
  .ticker-track { display: flex; animation: ticker 30s linear infinite; white-space: nowrap; }
  .ticker-item {
    display: inline-flex; align-items: center; gap: 10px;
    font-family: 'Plus Jakarta Sans'; font-size: 12px; font-weight: 600;
    color: var(--text2); padding: 0 28px; letter-spacing: 0.02em;
  }
  .ticker-dot { color: var(--blue); font-size: 8px; }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ── SEC HEADER ── */
  .sec-head { text-align: center; padding: 96px 24px 60px; }
  .sec-tag {
    display: inline-block; font-family: 'Plus Jakarta Sans'; font-size: 11px;
    font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--blue); margin-bottom: 16px;
  }
  .sec-head h2 {
    font-family: 'Plus Jakarta Sans'; font-weight: 800;
    font-size: clamp(32px, 5vw, 52px); letter-spacing: -0.04em;
    line-height: 1.08; color: var(--text);
  }
  .sec-head h2 em { font-style: normal; color: var(--blue); }
  .sec-head p {
    margin-top: 16px; font-size: 15px; color: var(--text2); line-height: 1.65;
    max-width: 460px; margin-left: auto; margin-right: auto;
  }

  /* ── STEPS ── */
  .steps-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--border2); border-radius: 16px;
    overflow: hidden; gap: 1px; background: var(--border2);
    max-width: 980px; margin: 0 auto 96px;
  }
  @media(max-width:640px) { .steps-grid { grid-template-columns: 1fr; } }
  .step-card { background: var(--card); padding: 36px 28px; position: relative; }
  .step-num {
    font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 11px;
    letter-spacing: 0.1em; color: var(--blue); margin-bottom: 20px;
    background: var(--blue-dim); border: 1px solid var(--blue-border);
    display: inline-block; padding: 3px 9px; border-radius: 6px;
  }
  .step-icon { font-size: 24px; margin-bottom: 14px; }
  .step-card h3 {
    font-family: 'Plus Jakarta Sans'; font-weight: 700; font-size: 16px;
    letter-spacing: -0.02em; color: var(--text); margin-bottom: 8px;
  }
  .step-card p { font-size: 13px; color: var(--text2); line-height: 1.7; }

  /* ── FEATURES ── */
  .feat-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px; max-width: 980px; margin: 0 auto 96px; padding: 0 24px;
  }
  .feat-card {
    background: var(--card); border: 1px solid var(--border2);
    border-radius: 14px; padding: 24px;
    transition: border-color 0.2s, transform 0.2s;
  }
  .feat-card:hover { border-color: var(--blue-border); transform: translateY(-2px); }
  .feat-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: var(--blue-dim); border: 1px solid var(--blue-border);
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; margin-bottom: 14px;
  }
  .feat-card h4 {
    font-family: 'Plus Jakarta Sans'; font-weight: 700; font-size: 14px;
    letter-spacing: -0.02em; color: var(--text); margin-bottom: 6px;
  }
  .feat-card p { font-size: 13px; color: var(--text2); line-height: 1.7; }

  /* ── PROOF ── */
  .proof {
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    background: var(--surface); padding: 64px 24px; text-align: center; margin-bottom: 96px;
  }
  .proof-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 56px; max-width: 700px; margin: 0 auto; }
  .proof-n { font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 44px; letter-spacing: -0.04em; color: var(--text); line-height: 1; }
  .proof-n span { color: var(--blue); }
  .proof-l { font-size: 12px; font-weight: 500; color: var(--muted); margin-top: 4px; font-family: 'Plus Jakarta Sans'; }

  /* ── PIPELINE ── */
  .pipeline { max-width: 680px; margin: 0 auto 96px; padding: 0 24px; }
  .pipe-item { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--border); }
  .pipe-item:last-child { border-bottom: none; }
  .pipe-n {
    font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 13px;
    color: var(--blue); flex-shrink: 0; width: 28px;
    background: var(--blue-dim); border: 1px solid var(--blue-border);
    height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    letter-spacing: 0.02em;
  }
  .pipe-body h4 { font-family: 'Plus Jakarta Sans'; font-weight: 700; font-size: 15px; letter-spacing: -0.02em; color: var(--text); margin-bottom: 5px; }
  .pipe-body p { font-size: 13px; color: var(--text2); line-height: 1.65; }
  .pipe-tool {
    display: inline-block; margin-top: 8px; padding: 3px 10px;
    border: 1px solid var(--border2); border-radius: 6px;
    font-size: 11px; font-weight: 600; color: var(--text2);
    font-family: 'Plus Jakarta Sans';
  }

  /* ── DEMO ── */
  .demo-section { max-width: 820px; margin: 0 auto; padding: 0 24px 96px; }
  .demo-box {
    border: 1px solid var(--blue-border); border-radius: 16px;
    background: var(--card); overflow: hidden;
    box-shadow: 0 0 80px rgba(91,124,250,0.06);
  }
  .demo-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 20px; border-bottom: 1px solid var(--border);
    background: var(--card2);
  }
  .demo-head-l { display: flex; align-items: center; gap: 8px; }
  .demo-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 6px var(--blue); animation: blink 2.5s infinite; }
  .demo-title { font-family: 'Plus Jakarta Sans'; font-size: 12px; font-weight: 700; color: var(--text2); letter-spacing: 0.02em; }
  .demo-badge {
    padding: 4px 10px; border: 1px solid rgba(52,211,153,0.35);
    border-radius: 100px; font-size: 11px; font-weight: 600; color: var(--green);
    font-family: 'Plus Jakarta Sans';
  }
  .demo-body { padding: 24px; }

  .d-label { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text2); display: block; margin-bottom: 8px; font-family: 'Plus Jakarta Sans'; }
  .d-field { margin-bottom: 20px; }
  .d-input {
    width: 100%; background: var(--surface); border: 1px solid var(--border2);
    border-radius: 10px; color: var(--text); font-family: 'Inter'; font-size: 14px;
    padding: 12px 16px; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .d-input::placeholder { color: var(--muted); }
  .d-input:focus { border-color: var(--blue-border); box-shadow: 0 0 0 3px var(--blue-glow); }

  .d-pills { display: flex; flex-wrap: wrap; gap: 7px; }
  .d-pill {
    padding: 7px 14px; border: 1px solid var(--border2); border-radius: 100px;
    font-size: 13px; font-weight: 500; background: var(--surface); color: var(--text2);
    cursor: pointer; transition: all 0.15s; font-family: 'Plus Jakarta Sans'; line-height: 1;
  }
  .d-pill:hover { border-color: var(--blue-border); color: var(--text); }
  .d-pill.on { background: var(--blue-dim); border-color: var(--blue-border); color: var(--blue); }
  .d-pill:disabled { opacity: 0.5; cursor: not-allowed; }

  .d-hint { font-size: 12px; color: var(--muted); margin-top: 6px; font-family: 'Plus Jakarta Sans'; }
  .d-hint span { color: var(--blue); cursor: pointer; text-decoration: underline; }

  .d-btn {
    width: 100%; padding: 14px; background: var(--blue); border: none; border-radius: 10px;
    font-family: 'Plus Jakarta Sans'; font-size: 15px; font-weight: 700;
    color: #fff; cursor: pointer; margin-top: 4px; margin-bottom: 10px;
    transition: opacity 0.15s, box-shadow 0.15s;
    box-shadow: 0 4px 20px rgba(91,124,250,0.3);
  }
  .d-btn:hover:not(:disabled) { opacity: 0.9; box-shadow: 0 6px 28px rgba(91,124,250,0.4); }
  .d-btn:disabled { opacity: 0.3; cursor: not-allowed; box-shadow: none; }

  .d-status {
    display: flex; align-items: center; gap: 8px; padding: 10px 13px;
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 9px; font-size: 13px; color: var(--muted); min-height: 40px;
  }
  .d-status.on { border-color: var(--blue-border); color: var(--blue); }
  .d-spin {
    width: 12px; height: 12px; border-radius: 50%;
    border: 2px solid var(--blue-dim); border-top-color: var(--blue);
    animation: spin 0.65s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to{transform:rotate(360deg)} }

  .d-output { margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); animation: fadeUp 0.35s ease both; }
  .d-out-label { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--blue); margin-bottom: 10px; font-family: 'Plus Jakarta Sans'; display: block; }
  .d-title-row { display: flex; gap: 12px; align-items: flex-start; padding: 9px 0; border-bottom: 1px solid var(--border); }
  .d-title-row:last-child { border-bottom: none; }
  .d-title-n { font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 11px; color: var(--blue); flex-shrink: 0; padding-top: 3px; }
  .d-title-t { font-size: 14px; line-height: 1.55; font-weight: 500; }
  .d-hook { background: var(--surface); border-left: 2px solid var(--blue-border); padding: 14px 18px; border-radius: 0 10px 10px 0; font-size: 13px; line-height: 1.8; color: var(--text); }

  .d-upgrade {
    margin-top: 20px; padding: 20px; background: var(--card2);
    border: 1px solid var(--blue-border); border-radius: 12px;
    display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
  }
  .d-upgrade-text strong { font-family: 'Plus Jakarta Sans'; font-weight: 700; font-size: 15px; letter-spacing: -0.02em; color: var(--text); display: block; margin-bottom: 4px; }
  .d-upgrade-text p { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .d-upgrade-btn {
    padding: 11px 22px; background: var(--blue); border: none; border-radius: 9px;
    font-family: 'Plus Jakarta Sans'; font-size: 14px; font-weight: 700; color: #fff;
    cursor: pointer; white-space: nowrap; transition: opacity 0.15s;
    box-shadow: 0 3px 12px rgba(91,124,250,0.3); flex-shrink: 0;
  }
  .d-upgrade-btn:hover { opacity: 0.88; }

  /* ── PRICING ── */
  .pricing-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 12px; max-width: 760px; margin: 0 auto 96px; padding: 0 24px;
  }
  @media(max-width:580px) { .pricing-grid { grid-template-columns: 1fr; } }
  .price-card {
    background: var(--card); border: 1px solid var(--border2);
    border-radius: 16px; padding: 32px; position: relative;
    transition: border-color 0.2s;
  }
  .price-card:hover { border-color: var(--blue-border); }
  .price-card.featured { border-color: var(--blue-border); background: linear-gradient(135deg, rgba(91,124,250,0.05) 0%, var(--card) 60%); }
  .price-badge {
    position: absolute; top: 18px; right: 18px;
    padding: 4px 10px; background: var(--blue); border-radius: 100px;
    font-family: 'Plus Jakarta Sans'; font-size: 10px; font-weight: 700; color: #fff; letter-spacing: 0.06em;
  }
  .price-plan { font-family: 'Plus Jakarta Sans'; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text2); margin-bottom: 16px; }
  .price-amt { font-family: 'Plus Jakarta Sans'; font-weight: 800; font-size: 52px; letter-spacing: -0.04em; color: var(--text); line-height: 1; }
  .price-amt sup { font-size: 24px; vertical-align: top; padding-top: 10px; color: var(--blue); }
  .price-amt span { font-size: 16px; color: var(--muted); font-weight: 500; }
  .price-desc { font-size: 13px; color: var(--text2); margin: 12px 0 22px; line-height: 1.6; }
  .price-list { list-style: none; margin-bottom: 28px; }
  .price-list li {
    font-size: 13px; color: var(--text2); padding: 7px 0;
    border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px;
    font-family: 'Plus Jakarta Sans'; font-weight: 500;
  }
  .price-list li::before { content: '✓'; color: var(--green); flex-shrink: 0; font-size: 12px; }
  .price-btn {
    width: 100%; padding: 13px; border-radius: 10px;
    font-family: 'Plus Jakarta Sans'; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: all 0.15s;
    border: 1px solid var(--border2); background: transparent; color: var(--text2);
  }
  .price-btn:hover { border-color: var(--blue-border); color: var(--text); }
  .price-btn.featured {
    background: var(--blue); border-color: var(--blue); color: #fff;
    box-shadow: 0 4px 16px rgba(91,124,250,0.3);
  }
  .price-btn.featured:hover { opacity: 0.9; }

  /* ── FAQ ── */
  .faq { max-width: 620px; margin: 0 auto 96px; padding: 0 24px; }
  .faq-item { border-bottom: 1px solid var(--border); }
  .faq-q {
    width: 100%; background: none; border: none; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 0; text-align: left;
    font-family: 'Plus Jakarta Sans'; font-size: 14px; font-weight: 600;
    color: var(--text); transition: color 0.15s;
  }
  .faq-q:hover { color: var(--blue); }
  .faq-arrow { color: var(--muted); transition: transform 0.2s; font-size: 18px; flex-shrink: 0; margin-left: 16px; }
  .faq-q.open .faq-arrow { transform: rotate(45deg); color: var(--blue); }
  .faq-a {
    font-size: 13px; color: var(--text2); line-height: 1.8;
    max-height: 0; overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }
  .faq-a.open { max-height: 200px; padding-bottom: 20px; }

  /* ── FINAL CTA ── */
  .final-cta {
    text-align: center; padding: 100px 24px 120px;
    border-top: 1px solid var(--border);
    background: linear-gradient(180deg, transparent 0%, rgba(91,124,250,0.03) 100%);
  }
  .final-cta h2 {
    font-family: 'Plus Jakarta Sans'; font-weight: 800;
    font-size: clamp(36px, 6vw, 64px); letter-spacing: -0.04em;
    line-height: 1.06; color: var(--text); margin-bottom: 20px;
  }
  .final-cta h2 em { font-style: normal; color: var(--blue); }
  .final-cta p { font-size: 15px; color: var(--text2); margin-bottom: 40px; line-height: 1.65; max-width: 380px; margin-left: auto; margin-right: auto; }

  /* ── FOOTER ── */
  footer {
    border-top: 1px solid var(--border); background: var(--surface);
    padding: 24px 40px;
    display: flex; justify-content: space-between; align-items: center;
    font-family: 'Plus Jakarta Sans'; font-size: 12px; font-weight: 500; color: var(--muted);
  }
  .footer-logo { font-weight: 800; font-size: 15px; letter-spacing: -0.02em; color: var(--text2); }
  .footer-logo span { color: var(--blue); }

  @media(max-width:640px) {
    nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero-stats { gap: 28px; flex-wrap: wrap; }
    footer { flex-direction: column; gap: 8px; text-align: center; }
    .d-upgrade { flex-direction: column; }
  }
`;

const TICKER_ITEMS = [
  "3 SEO Title Options","45-Second Hook","Full Timestamped Script","B-Roll Cues",
  "Thumbnail Concept","YouTube Description","12 SEO Tags","Shorts Mode","No Face Required",
  "3 SEO Title Options","45-Second Hook","Full Timestamped Script","B-Roll Cues",
  "Thumbnail Concept","YouTube Description","12 SEO Tags","Shorts Mode","No Face Required",
];

const FEATURES = [
  { icon:"🎯", title:"3 Viral Title Options", desc:"Every generation gives you 3 SEO-optimized, curiosity-driven titles to A/B test." },
  { icon:"⚡", title:"Gripping Hook Script", desc:"The first 45 seconds make or break retention. VaultScript writes hooks that stop the scroll." },
  { icon:"📋", title:"Timestamped Script", desc:"Every section labeled with timestamps so you always know where you are in the video." },
  { icon:"🎬", title:"B-Roll Cues", desc:"Specific footage suggestions at every timestamp — no more staring at a blank Pexels search." },
  { icon:"🖼️", title:"Thumbnail Concept", desc:"A ready-to-build thumbnail brief with composition, text overlay, and visual direction." },
  { icon:"🔍", title:"SEO Description", desc:"A 150–200 word YouTube description written and ready to paste. CTA and keywords included." },
  { icon:"🏷️", title:"12 SEO Tags", desc:"Algorithm-friendly tags so YouTube knows exactly who to show your video to." },
  { icon:"📱", title:"Shorts Mode", desc:"Built for YouTube. Select 30–60 sec for a punchy script you can repurpose to TikTok and Reels." },
];

const PIPELINE = [
  { n:"01", title:"Generate Your Script", desc:"Enter your niche, pick style and tone, hit generate. Full script ready in under 60 seconds.", tool:"VaultScript" },
  { n:"02", title:"Record the Voiceover", desc:"Paste the narration into an AI voice tool. No mic, no studio, no face needed.", tool:"ElevenLabs · Murf AI" },
  { n:"03", title:"Layer the B-Roll", desc:"Drop audio into a video editor and layer the free stock footage the script told you to find.", tool:"CapCut · DaVinci Resolve" },
  { n:"04", title:"Design the Thumbnail", desc:"Use the thumbnail brief to build a click-worthy graphic in minutes.", tool:"Canva" },
  { n:"05", title:"Paste & Publish", desc:"Your description and tags are already written. Paste and upload on YouTube. Repurpose Shorts to TikTok and Reels.", tool:"YouTube Studio · TikTok · Instagram" },
];

const FAQS = [
  { q:"Do I need any video experience?", a:"None at all. VaultScript writes the entire script and tells you exactly what footage to find. Beginners publish their first video within a day of signing up." },
  { q:"Will my videos get detected as AI?", a:"The script is a starting point — your voiceover, footage, and editing style make each video unique. Thousands of faceless channels use AI tools with no issues." },
  { q:"How many scripts can I generate?", a:"Starter plan includes 15 scripts per month. Pro plan is unlimited. Most creators publish 2–4 videos per week." },
  { q:"What niches work best?", a:"Dark history, abandoned places, true crime, finance & investing, stoicism, AI & tech, motivational — any niche with evergreen curiosity does well." },
  { q:"Can I generate YouTube Shorts scripts?", a:"Yes. Select 30–60 second duration and VaultScript generates a punchy, hook-first short-form script perfect for Shorts, TikTok, and Reels." },
];

const DEMO_STYLES   = ["Educational","Listicle","Documentary","Story-Time","Exposé / Deep-Dive","Motivational"];
const DEMO_DURATIONS = ["30–60 sec","3–5 min","7–10 min","12–15 min","20+ min"];
const DEMO_TONES    = ["Calm & Authoritative","Hype & Energetic","Dark & Mysterious","Conversational"];
const SUGGESTIONS   = ["abandoned places","dark history","stoic philosophy","AI & the future","true crime"];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className={`faq-q${open?" open":""}`} onClick={() => setOpen(!open)}>
        {q}<span className="faq-arrow">+</span>
      </button>
      <div className={`faq-a${open?" open":""}`}>{a}</div>
    </div>
  );
}

function DemoSection() {
  const [niche, setNiche]         = useState("");
  const [style, setStyle]         = useState("Educational");
  const [duration, setDuration]   = useState("7–10 min");
  const [tone, setTone]           = useState("Calm & Authoritative");
  const [loading, setLoading]     = useState(false);
  const [status, setStatus]       = useState("Configure your video below, then hit generate — it's free.");
  const [result, setResult]       = useState(null);
  const [used, setUsed]           = useState(false);

  async function generate() {
    if (!niche.trim() || used) return;
    setLoading(true); setResult(null);
    const statuses = ["Picking the best angle...","Writing your titles...","Crafting the hook...","Almost ready..."];
    let si = 0; setStatus(statuses[0]);
    const ticker = setInterval(() => { si=(si+1)%statuses.length; setStatus(statuses[si]); }, 1800);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 900,
          messages: [{ role: "user", content: `You are a viral faceless YouTube scriptwriter. Generate for:
Niche: "${niche}", Style: ${style}, Duration: ${duration}, Tone: ${tone}
Respond ONLY with valid JSON (no markdown, no backticks):
{"titles":["SEO title 1","SEO title 2","SEO title 3"],"hook":"A gripping 40-second spoken hook in a ${tone} tone for a ${style} video. No intro, no fluff. Start mid-action. 4-6 sentences."}` }],
        }),
      });
      clearInterval(ticker);
      const data = await res.json();
      const raw = data.content?.map(b=>b.text||"").join("")||"";
      const parsed = JSON.parse(raw.replace(/```json|```/g,"").trim());
      setResult(parsed); setUsed(true);
      setStatus("Here's your free preview — upgrade to unlock the full script, b-roll cues, description & tags.");
    } catch(e) {
      clearInterval(ticker);
      setStatus("Error — please try again.");
    } finally { setLoading(false); }
  }

  return (
    <section id="demo">
      <div className="sec-head">
        <div className="sec-tag">Try It Free</div>
        <h2>See it work <em>right now.</em></h2>
        <p>Configure your video and generate 3 real titles and a full opening hook — free, no sign-up required.</p>
      </div>
      <div className="demo-section">
        <div className="demo-box">
          <div className="demo-head">
            <div className="demo-head-l">
              <div className="demo-dot" />
              <span className="demo-title">VaultScript — Live Demo</span>
            </div>
            <span className="demo-badge">✓ Free Preview</span>
          </div>
          <div className="demo-body">
            <div className="d-field">
              <label className="d-label">Niche / Topic</label>
              <input className="d-input" value={niche} onChange={e=>setNiche(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&generate()}
                placeholder="e.g. abandoned places, stoicism, dark history, AI investing..."
                disabled={used} />
              {!used && !loading && (
                <p className="d-hint">Try: {SUGGESTIONS.slice(0,3).map((s,i)=>(
                  <span key={i} onClick={()=>setNiche(s)}>{s}{i<2?" · ":""}</span>
                ))}</p>
              )}
            </div>

            <div className="d-field">
              <label className="d-label">Video Style</label>
              <div className="d-pills">
                {DEMO_STYLES.map(s=>(
                  <button key={s} className={`d-pill${style===s?" on":""}`}
                    onClick={()=>!used&&setStyle(s)} disabled={used}>{s}</button>
                ))}
              </div>
            </div>

            <div className="d-field">
              <label className="d-label">Target Duration</label>
              <div className="d-pills">
                {DEMO_DURATIONS.map(d=>(
                  <button key={d} className={`d-pill${duration===d?" on":""}`}
                    onClick={()=>!used&&setDuration(d)} disabled={used}>{d}</button>
                ))}
              </div>
            </div>

            <div className="d-field">
              <label className="d-label">Narration Tone</label>
              <div className="d-pills">
                {DEMO_TONES.map(t=>(
                  <button key={t} className={`d-pill${tone===t?" on":""}`}
                    onClick={()=>!used&&setTone(t)} disabled={used}>{t}</button>
                ))}
              </div>
            </div>

            <button className="d-btn" onClick={generate} disabled={loading||used||!niche.trim()}>
              {loading?"Generating...":used?"✓ Generated":"Generate Free Preview →"}
            </button>

            <div className={`d-status${loading?" on":""}`}>
              {loading&&<div className="d-spin"/>}
              <span>{status}</span>
            </div>

            {result && (
              <div className="d-output">
                <span className="d-out-label">3 Title Options</span>
                {result.titles?.map((t,i)=>(
                  <div className="d-title-row" key={i}>
                    <span className="d-title-n">0{i+1}</span>
                    <span className="d-title-t">{t}</span>
                  </div>
                ))}
                <span className="d-out-label" style={{marginTop:16}}>Opening Hook (40 sec)</span>
                <div className="d-hook">{result.hook}</div>
                <div className="d-upgrade">
                  <div className="d-upgrade-text">
                    <strong>Want the full script?</strong>
                    <p>Unlock the complete timestamped script, b-roll cues, thumbnail concept, description, and 12 SEO tags.</p>
                  </div>
                  <button className="d-upgrade-btn" onClick={()=>document.getElementById('pricing').scrollIntoView({behavior:'smooth'})}>
                    Get Full Access →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  return (
    <>
      <style>{STYLES}</style>
      <div className="grid-bg" />
      <div className="glow-top" />

      <nav>
        <div className="nav-logo">Vault<span>Script</span></div>
        <div className="nav-links">
          <a onClick={()=>scrollTo('demo')}>Try Demo</a>
          <a onClick={()=>scrollTo('how')}>How It Works</a>
          <a onClick={()=>scrollTo('features')}>Features</a>
          <a onClick={()=>scrollTo('pricing')}>Pricing</a>
          <a onClick={()=>scrollTo('faq')}>FAQ</a>
        </div>
        <button className="nav-btn" onClick={()=>scrollTo('pricing')}>Get Access</button>
      </nav>

      <div className="wrap">
        {/* HERO */}
        <div className="hero">
          <div className="hero-badge">AI-Powered · No Face Required</div>
          <h1>Generate your next<br/><em>viral YouTube script</em><br/>in 60 seconds.</h1>
          <p className="hero-sub">From niche to publish-ready script in under a minute. Titles, hook, timestamped script, b-roll cues, description and tags — all generated by AI.</p>
          <div className="hero-stats">
            <div className="stat"><div className="stat-n"><span>60</span>s</div><div className="stat-l">Generation time</div></div>
            <div className="stat"><div className="stat-n"><span>8</span>x</div><div className="stat-l">Outputs per script</div></div>
            <div className="stat"><div className="stat-n"><span>2</span>hr</div><div className="stat-l">First video live</div></div>
          </div>
          <a className="hero-cta" onClick={()=>scrollTo('pricing')}>Start Generating Scripts →</a>
          <p className="hero-fine">No contract · Cancel anytime · Instant access</p>
        </div>

        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-track">
            {TICKER_ITEMS.map((item,i)=>(
              <span className="ticker-item" key={i}>{item}<span className="ticker-dot">◆</span></span>
            ))}
          </div>
        </div>

        {/* DEMO */}
        <DemoSection />

        {/* HOW IT WORKS */}
        <section id="how">
          <div className="sec-head">
            <div className="sec-tag">Simple 3-Step Process</div>
            <h2>Type it in.<br/><em>We write it.</em></h2>
            <p>Enter your niche, choose your style, and let VaultScript handle the rest.</p>
          </div>
          <div className="container">
            <div className="steps-grid" style={{marginBottom:96}}>
              <div className="step-card">
                <div className="step-num">01</div>
                <div className="step-icon">✏️</div>
                <h3>Enter Your Niche</h3>
                <p>Type your topic, pick a video style, set your duration and tone. Takes under 30 seconds.</p>
              </div>
              <div className="step-card">
                <div className="step-num">02</div>
                <div className="step-icon">⚡</div>
                <h3>AI Writes Everything</h3>
                <p>VaultScript generates titles, hook, full timestamped script with b-roll cues, thumbnail, description and tags.</p>
              </div>
              <div className="step-card">
                <div className="step-num">03</div>
                <div className="step-icon">🚀</div>
                <h3>Record, Edit & Upload</h3>
                <p>Add an AI voiceover, layer free stock footage using the b-roll cues, paste the description and publish.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features">
          <div className="sec-head">
            <div className="sec-tag">Every Generation Includes</div>
            <h2>8 outputs.<br/><em>One click.</em></h2>
            <p>Everything you need to go from idea to published video without writing a single word yourself.</p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f,i)=>(
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
          <div className="sec-tag">By The Numbers</div>
          <div className="proof-grid" style={{marginTop:32}}>
            <div><div className="proof-n"><span>60</span>s</div><div className="proof-l">Average generation time</div></div>
            <div><div className="proof-n"><span>8</span></div><div className="proof-l">Outputs per script</div></div>
            <div><div className="proof-n"><span>2</span>hr</div><div className="proof-l">Script to published video</div></div>
            <div><div className="proof-n">∞</div><div className="proof-l">Niches supported</div></div>
          </div>
        </div>

        {/* PIPELINE */}
        <section>
          <div className="sec-head">
            <div className="sec-tag">Complete Creator Workflow</div>
            <h2>Script to published<br/><em>in 5 steps.</em></h2>
            <p>VaultScript is step one. Here's the full zero-to-upload pipeline.</p>
          </div>
          <div className="pipeline">
            {PIPELINE.map((p,i)=>(
              <div className="pipe-item" key={i}>
                <div className="pipe-n">{p.n}</div>
                <div className="pipe-body">
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
          <div className="sec-head">
            <div className="sec-tag">Simple Pricing</div>
            <h2>One video pays<br/><em>for the month.</em></h2>
            <p>A single monetised video covers your subscription. Everything after that is profit.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-card">
              <div className="price-plan">Starter</div>
              <div className="price-amt"><sup>$</sup>19<span>/mo</span></div>
              <p className="price-desc">Perfect for creators just getting started with faceless content.</p>
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
              <div className="price-amt"><sup>$</sup>49<span>/mo</span></div>
              <p className="price-desc">Unlimited scripts for serious creators publishing multiple times a week.</p>
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
          <div className="sec-head">
            <div className="sec-tag">FAQ</div>
            <h2>Common <em>questions.</em></h2>
          </div>
          <div className="faq">
            {FAQS.map((f,i)=><FaqItem key={i} {...f}/>)}
          </div>
        </section>

        {/* FINAL CTA */}
        <div className="final-cta">
          <h2>Your first video is<br/><em>60 seconds away.</em></h2>
          <p>Join creators building passive income with faceless YouTube channels. No experience needed.</p>
          <a className="hero-cta" onClick={()=>scrollTo('pricing')}>Start Generating Scripts →</a>
          <p className="hero-fine" style={{marginTop:16}}>No contract · Cancel anytime · Instant access</p>
        </div>
      </div>

      <footer>
        <div className="footer-logo">Vault<span>Script</span></div>
        <span>© 2026 VaultScript · All rights reserved</span>
        <span>Built for creators.</span>
      </footer>
    </>
  );
                }
