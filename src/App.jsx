import { useState, useRef, useEffect } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0d0d0d;
    --surface: #141414;
    --card: #1a1a1a;
    --border: #2a2a2a;
    --amber: #f59e0b;
    --amber-dim: #92600a;
    --amber-glow: rgba(245,158,11,0.12);
    --amber-glow2: rgba(245,158,11,0.06);
    --text: #e8e0d0;
    --muted: #6b6460;
    --muted2: #3d3835;
    --red: #ef4444;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .noise {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 128px;
  }

  .glow-orb {
    position: fixed; top: -200px; left: 50%; transform: translateX(-50%);
    width: 700px; height: 500px; pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 70%);
  }

  .app {
    position: relative; z-index: 1;
    max-width: 860px; margin: 0 auto;
    padding: 0 24px 80px;
  }

  /* ── HEADER ── */
  .header {
    padding: 52px 0 40px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 48px;
  }
  .header-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--amber-glow); border: 1px solid var(--amber-dim);
    border-radius: 2px; padding: 4px 10px;
    font-size: 10px; letter-spacing: 0.2em; color: var(--amber);
    text-transform: uppercase; margin-bottom: 20px;
  }
  .header-badge::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%;
    background: var(--amber); box-shadow: 0 0 8px var(--amber);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 8vw, 88px);
    letter-spacing: 0.02em;
    line-height: 0.9;
    color: var(--text);
  }
  h1 span { color: var(--amber); }
  .header-sub {
    margin-top: 16px;
    font-size: 12px; letter-spacing: 0.08em;
    color: var(--muted);
    font-style: italic;
    font-family: 'Instrument Serif', serif;
  }

  /* ── FORM ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  .form-full { grid-column: 1 / -1; }

  label {
    display: block;
    font-size: 9px; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--muted);
    margin-bottom: 8px;
  }

  input, select, textarea {
    width: 100%;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 3px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    padding: 12px 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
  }
  input::placeholder, textarea::placeholder { color: var(--muted2); }
  input:focus, select:focus, textarea:focus {
    border-color: var(--amber-dim);
    box-shadow: 0 0 0 3px var(--amber-glow2);
  }
  textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
  select option { background: var(--card); }

  /* pill selectors */
  .pill-row {
    display: flex; flex-wrap: wrap; gap: 8px;
  }
  .pill {
    padding: 7px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 11px; letter-spacing: 0.05em;
    background: var(--card);
    color: var(--muted);
    cursor: pointer;
    transition: all 0.15s;
    font-family: 'DM Mono', monospace;
  }
  .pill:hover { border-color: var(--amber-dim); color: var(--amber); }
  .pill.active {
    background: var(--amber-glow);
    border-color: var(--amber);
    color: var(--amber);
  }

  /* ── GENERATE BUTTON ── */
  .btn-generate {
    width: 100%; margin-top: 24px;
    padding: 18px;
    background: var(--amber);
    border: none; border-radius: 3px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 0.12em;
    color: #0d0d0d;
    cursor: pointer;
    position: relative; overflow: hidden;
    transition: opacity 0.2s, transform 0.15s;
  }
  .btn-generate:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); }
  .btn-generate:active:not(:disabled) { transform: translateY(0); }
  .btn-generate:disabled { opacity: 0.4; cursor: not-allowed; }

  .btn-generate .shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
    transform: translateX(-100%);
    animation: shimmer 2s infinite;
  }
  @keyframes shimmer { to { transform: translateX(200%); } }

  /* ── STATUS BAR ── */
  .status-bar {
    margin-top: 16px;
    padding: 10px 14px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 11px; color: var(--muted);
    display: flex; align-items: center; gap: 8px;
    background: var(--surface);
    min-height: 40px;
  }
  .status-bar.loading { border-color: var(--amber-dim); color: var(--amber); }
  .spinner {
    width: 12px; height: 12px;
    border: 2px solid var(--amber-dim);
    border-top-color: var(--amber);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── DIVIDER ── */
  .section-divider {
    display: flex; align-items: center; gap: 16px;
    margin: 48px 0 32px;
  }
  .section-divider::before, .section-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .section-label {
    font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--muted); white-space: nowrap;
  }

  /* ── OUTPUT CARDS ── */
  .output-card {
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--card);
    margin-bottom: 16px;
    overflow: hidden;
    animation: fadeUp 0.3s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .card-label {
    font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--amber);
  }
  .copy-btn {
    padding: 4px 10px;
    font-size: 10px; letter-spacing: 0.1em;
    border: 1px solid var(--border);
    border-radius: 2px;
    background: transparent;
    color: var(--muted);
    cursor: pointer;
    font-family: 'DM Mono', monospace;
    transition: all 0.15s;
  }
  .copy-btn:hover { border-color: var(--amber-dim); color: var(--amber); }
  .copy-btn.copied { border-color: #22c55e; color: #22c55e; }

  .card-body {
    padding: 20px;
    font-size: 13px; line-height: 1.75;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
  }

  /* titles list */
  .title-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid var(--border);
  }
  .title-item:last-child { border-bottom: none; padding-bottom: 0; }
  .title-num {
    font-family: 'Bebas Neue'; font-size: 22px;
    color: var(--amber); flex-shrink: 0; line-height: 1;
    padding-top: 2px;
  }
  .title-text { font-size: 14px; line-height: 1.5; }

  /* script segments */
  .script-segment {
    margin-bottom: 20px; padding-bottom: 20px;
    border-bottom: 1px solid var(--border);
  }
  .script-segment:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  .seg-ts {
    font-size: 10px; color: var(--amber);
    letter-spacing: 0.15em; margin-bottom: 6px;
    font-family: 'Bebas Neue'; font-size: 14px;
  }
  .seg-broll {
    margin-top: 8px; padding: 8px 12px;
    background: var(--surface); border-left: 2px solid var(--amber-dim);
    border-radius: 0 2px 2px 0;
    font-size: 11px; color: var(--muted);
    font-style: italic;
  }
  .seg-broll::before { content: '🎬  '; }

  /* tags */
  .tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; padding: 16px; }
  .tag {
    padding: 5px 10px;
    border: 1px solid var(--border);
    border-radius: 2px;
    font-size: 11px; color: var(--muted);
    background: var(--surface);
  }

  /* ── ERROR ── */
  .error-box {
    padding: 14px 16px;
    border: 1px solid var(--red);
    border-radius: 3px;
    background: rgba(239,68,68,0.07);
    font-size: 12px; color: var(--red);
    margin-top: 16px;
  }

  /* ── FOOTER ── */
  .footer {
    margin-top: 64px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10px; letter-spacing: 0.12em; color: var(--muted2);
    text-transform: uppercase;
  }
  .footer-mark { color: var(--amber); font-family: 'Bebas Neue'; font-size: 16px; letter-spacing: 0.1em; }
`;

const VIDEO_STYLES = ["Educational", "Listicle", "Documentary", "Story-Time", "Expose / Deep-Dive", "Motivational"];
const DURATIONS = ["3–5 min", "7–10 min", "12–15 min", "20+ min"];
const TONES = ["Calm & Authoritative", "Hype & Energetic", "Dark & Mysterious", "Conversational"];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copy}>
      {copied ? "✓ COPIED" : "COPY"}
    </button>
  );
}

function OutputCard({ label, children, copyText }) {
  return (
    <div className="output-card">
      <div className="card-header">
        <span className="card-label">{label}</span>
        {copyText && <CopyButton text={copyText} />}
      </div>
      {children}
    </div>
  );
}

export default function VaultScript() {
  const [niche, setNiche] = useState("");
  const [angle, setAngle] = useState("");
  const [videoStyle, setVideoStyle] = useState("Educational");
  const [duration, setDuration] = useState("7–10 min");
  const [tone, setTone] = useState("Calm & Authoritative");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready to forge your script.");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const outputRef = useRef(null);

  async function generate() {
    if (!niche.trim()) { setError("Please enter a niche or topic."); return; }
    setError(""); setResult(null); setLoading(true);
    setStatus("Analyzing your niche...");

    const prompt = `You are an elite faceless YouTube scriptwriter. Generate a complete, ready-to-record YouTube script package.

INPUTS:
- Niche / Topic: ${niche}
- Specific angle or hook idea: ${angle || "Your choice — pick the most viral angle"}
- Video style: ${videoStyle}
- Target duration: ${duration}
- Tone: ${tone}

Respond ONLY with a valid JSON object (no markdown, no backticks, no preamble). Use this exact structure:

{
  "titles": [
    "Title option 1 (SEO-optimized, curiosity-driven)",
    "Title option 2",
    "Title option 3"
  ],
  "hook": "First 30–45 seconds spoken word hook. Must be gripping. No intro fluff.",
  "script": [
    {
      "timestamp": "0:00 – 0:45",
      "section": "HOOK",
      "narration": "The full spoken narration for this section.",
      "broll": "Specific b-roll / visual suggestion for this section"
    },
    {
      "timestamp": "0:45 – 2:00",
      "section": "INTRO / SETUP",
      "narration": "...",
      "broll": "..."
    }
  ],
  "description": "Full YouTube video description (150–200 words). SEO-rich. Include call to action.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8", "tag9", "tag10", "tag11", "tag12"],
  "thumbnail_idea": "One specific thumbnail concept with text overlay suggestion and visual composition."
}

The script array should have 6–10 sections appropriate for the target duration. Make the narration conversational, punchy, and perfectly paced for a faceless YouTube channel. Use pattern interrupts. No filler.`;

    const statuses = [
      "Analyzing your niche...",
      "Crafting viral title hooks...",
      "Writing the script...",
      "Polishing narration...",
      "Generating SEO metadata...",
    ];
    let i = 0;
    const ticker = setInterval(() => { i = (i + 1) % statuses.length; setStatus(statuses[i]); }, 2200);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      clearInterval(ticker);

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const raw = data.content?.map(b => b.text || "").join("") || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setStatus("Script forged. Ready to record.");
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e) {
      clearInterval(ticker);
      setError("Generation failed: " + e.message);
      setStatus("Error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fullScriptText = result
    ? result.script?.map(s => `[${s.timestamp}] ${s.section}\n${s.narration}\nB-ROLL: ${s.broll}`).join("\n\n")
    : "";

  return (
    <>
      <style>{STYLES}</style>
      <div className="noise" />
      <div className="glow-orb" />
      <div className="app">

        {/* HEADER */}
        <header className="header">
          <div className="header-badge">AI Script Generator</div>
          <h1>VAULT<span>SCRIPT</span></h1>
          <p className="header-sub">Forge faceless YouTube scripts that rank, retain, and convert.</p>
        </header>

        {/* FORM */}
        <div className="form-grid">
          <div className="form-full">
            <label>Niche / Topic *</label>
            <input
              value={niche}
              onChange={e => setNiche(e.target.value)}
              placeholder="e.g. abandoned places, dark history, AI investing, stoicism..."
            />
          </div>

          <div className="form-full">
            <label>Specific angle or hook idea (optional)</label>
            <textarea
              value={angle}
              onChange={e => setAngle(e.target.value)}
              placeholder="e.g. 'The hotel that was abandoned mid-renovation and never reopened' — or leave blank and we'll choose the most viral angle"
            />
          </div>

          <div className="form-full">
            <label>Video Style</label>
            <div className="pill-row">
              {VIDEO_STYLES.map(s => (
                <button key={s} className={`pill${videoStyle === s ? " active" : ""}`} onClick={() => setVideoStyle(s)}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <label>Target Duration</label>
            <div className="pill-row">
              {DURATIONS.map(d => (
                <button key={d} className={`pill${duration === d ? " active" : ""}`} onClick={() => setDuration(d)}>{d}</button>
              ))}
            </div>
          </div>

          <div>
            <label>Narration Tone</label>
            <div className="pill-row">
              {TONES.map(t => (
                <button key={t} className={`pill${tone === t ? " active" : ""}`} onClick={() => setTone(t)}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-generate" onClick={generate} disabled={loading}>
          {loading && <span className="shimmer" />}
          {loading ? "FORGING SCRIPT..." : "⚡ GENERATE SCRIPT"}
        </button>

        <div className={`status-bar${loading ? " loading" : ""}`}>
          {loading && <div className="spinner" />}
          <span>{status}</span>
        </div>

        {error && <div className="error-box">⚠ {error}</div>}

        {/* OUTPUT */}
        {result && (
          <div ref={outputRef}>
            <div className="section-divider"><span className="section-label">Generated Output</span></div>

            {/* TITLES */}
            <OutputCard label="Title Options (A/B Test These)" copyText={result.titles?.join("\n")}>
              <div className="card-body" style={{ padding: "16px 20px" }}>
                {result.titles?.map((t, i) => (
                  <div className="title-item" key={i}>
                    <span className="title-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="title-text">{t}</span>
                  </div>
                ))}
              </div>
            </OutputCard>

            {/* HOOK */}
            <OutputCard label="Opening Hook (First 45 Seconds)" copyText={result.hook}>
              <div className="card-body">{result.hook}</div>
            </OutputCard>

            {/* FULL SCRIPT */}
            <OutputCard label="Full Script" copyText={fullScriptText}>
              <div className="card-body" style={{ padding: "20px" }}>
                {result.script?.map((seg, i) => (
                  <div className="script-segment" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="seg-ts">[{seg.timestamp}] — {seg.section}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.8 }}>{seg.narration}</div>
                    {seg.broll && <div className="seg-broll">{seg.broll}</div>}
                  </div>
                ))}
              </div>
            </OutputCard>

            {/* THUMBNAIL */}
            {result.thumbnail_idea && (
              <OutputCard label="Thumbnail Concept" copyText={result.thumbnail_idea}>
                <div className="card-body">{result.thumbnail_idea}</div>
              </OutputCard>
            )}

            {/* DESCRIPTION */}
            <OutputCard label="YouTube Description" copyText={result.description}>
              <div className="card-body">{result.description}</div>
            </OutputCard>

            {/* TAGS */}
            {result.tags && (
              <OutputCard label="SEO Tags" copyText={result.tags.join(", ")}>
                <div className="tags-wrap">
                  {result.tags.map((tag, i) => <span className="tag" key={i}>#{tag}</span>)}
                </div>
              </OutputCard>
            )}
          </div>
        )}

        <footer className="footer">
          <span className="footer-mark">VaultScript</span>
          <span>Powered by Claude AI</span>
        </footer>
      </div>
    </>
  );
}
