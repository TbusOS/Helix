/**
 * Helix - Multi-Model Local LLM Chat Platform
 *
 * Built with:
 * - React 18 + TypeScript + Vite
 * - Anthropic Design System
 * - Zustand for state management
 */

import { useState } from 'react'

function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh')

  return (
    <div style={{ minHeight: '100vh', background: 'var(--anth-bg)' }}>
      {/* Language Toggle */}
      <div style={{
        position: 'fixed',
        top: 'var(--space-4)',
        right: 'var(--space-4)',
        zIndex: 100,
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={() => setLang('zh')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--anth-light-gray)',
            background: lang === 'zh' ? 'var(--anth-orange)' : 'var(--anth-bg-subtle)',
            color: lang === 'zh' ? 'white' : 'var(--anth-text)',
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.24s ease'
          }}
        >
          中文
        </button>
        <button
          onClick={() => setLang('en')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--anth-light-gray)',
            background: lang === 'en' ? 'var(--anth-orange)' : 'var(--anth-bg-subtle)',
            color: lang === 'en' ? 'white' : 'var(--anth-text)',
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.24s ease'
          }}
        >
          English
        </button>
      </div>

      {/* Hero Section */}
      <section className="anth-hero" style={{ paddingTop: '120px' }}>
        <div className="anth-container" style={{ textAlign: 'center' }}>
          {/* Logo SVG */}
          <svg viewBox="0 0 200 60" width="200" style={{ margin: '0 auto 24px' }}>
            <path
              d="M 20 10 Q 60 30 100 30 Q 140 30 180 10"
              stroke="#d97757"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 20 50 Q 60 30 100 30 Q 140 30 180 50"
              stroke="#6a9bcc"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="100" cy="30" r="8" fill="#d97757" />
          </svg>

          <span className="anth-badge">Open Source / 开源</span>

          <h1 style={{ marginTop: 'var(--space-4)' }}>
            {lang === 'zh' ? 'Helix' : 'Helix'}
          </h1>

          <p className="anth-subhead" style={{ maxWidth: '640px', margin: 'var(--space-5) auto' }}>
            {lang === 'zh'
              ? '本地 LLM 聊天平台 - 多模型运行时支持、群聊讨论、深度监控、参数调优'
              : 'Local LLM Chat Platform - Multi-runtime support, group chat, deep monitoring, parameter tuning'}
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', marginTop: 'var(--space-6)' }}>
            <a
              className="anth-button"
              href="https://github.com/TbusOS/Helix"
              target="_blank"
              rel="noopener noreferrer"
            >
              {lang === 'zh' ? 'GitHub 仓库' : 'GitHub Repository'} →
            </a>
            <a className="anth-button anth-button--ghost" href="#features">
              {lang === 'zh' ? '了解更多' : 'Learn More'}
            </a>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="anth-section anth-section--subtle">
        <div className="anth-container" style={{ textAlign: 'center' }}>
          <h2>
            {lang === 'zh' ? '应用开发中...' : 'Application In Development...'}
          </h2>

          <div style={{
            maxWidth: '600px',
            margin: 'var(--space-7) auto',
            padding: 'var(--space-7)',
            background: 'var(--anth-bg)',
            border: '1px solid var(--anth-light-gray)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'left'
          }}>
            <h3 style={{ marginBottom: 'var(--space-5)' }}>
              {lang === 'zh' ? '预计功能' : 'Upcoming Features'}
            </h3>

            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)'
            }}>
              {[
                lang === 'zh' ? '多运行时适配器 (Ollama / LM Studio / llama.cpp)' : 'Multi-runtime Adapters (Ollama / LM Studio / llama.cpp)',
                lang === 'zh' ? '5 种群聊模式 (并行 / 串行 / 角色 / 自主讨论)' : '5 Group Chat Modes (Parallel / Serial / Role / Autonomous)',
                lang === 'zh' ? '深度监控 (CPU / GPU / 内存 / KV Cache)' : 'Deep Monitoring (CPU / GPU / Memory / KV Cache)',
                lang === 'zh' ? '三级参数配置 (全局 / 会话 / 模型)' : 'Three-level Config (Global / Session / Model)',
                lang === 'zh' ? '插件系统 (事件驱动扩展)' : 'Plugin System (Event-driven extensions)',
              ].map((feature, i) => (
                <li key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '16px'
                }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'rgba(217, 119, 87, 0.15)',
                    color: 'var(--anth-orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--anth-text-secondary)'
          }}>
            {lang === 'zh'
              ? '完整应用发布后，你将能够：加载本地模型、与多个 AI 同时对话、实时监控资源使用、自定义参数配置'
              : 'When the full application releases, you will be able to: load local models, chat with multiple AIs simultaneously, monitor resource usage in real-time, customize parameter configurations'}
          </p>
        </div>
      </section>

      {/* Architecture Preview */}
      <section className="anth-section">
        <div className="anth-container--wide">
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-7)' }}>
            {lang === 'zh' ? '系统架构' : 'System Architecture'}
          </h2>

          <svg viewBox="0 0 800 400" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', display: 'block' }}>
            {/* Background */}
            <rect width="800" height="400" fill="#faf9f5" />

            {/* Frontend */}
            <rect x="50" y="30" width="200" height="120" rx="12" fill="#ffffff" stroke="#e8e6dc" />
            <text x="150" y="60" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#141413" textAnchor="middle">Frontend</text>
            <text x="150" y="80" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">React + TypeScript</text>

            {/* Backend */}
            <rect x="300" y="30" width="200" height="120" rx="12" fill="#ffffff" stroke="#e8e6dc" />
            <text x="400" y="60" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#141413" textAnchor="middle">Backend</text>
            <text x="400" y="80" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">Python FastAPI</text>

            {/* Runtimes */}
            <rect x="550" y="30" width="200" height="120" rx="12" fill="#ffffff" stroke="#e8e6dc" />
            <text x="650" y="60" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#141413" textAnchor="middle">Runtimes</text>
            <text x="650" y="80" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">Ollama / LM Studio</text>

            {/* Adapters */}
            <rect x="50" y="200" width="700" height="80" rx="12" fill="#f0ede3" />
            <text x="400" y="230" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#141413" textAnchor="middle">
              {lang === 'zh' ? '模型适配器层 (统一接口)' : 'Model Adapters (Unified Interface)'}
            </text>
            <text x="400" y="255" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">
              OllamaAdapter | LMStudioAdapter | LlamaCppAdapter | Plugin API
            </text>

            {/* Chat Engine */}
            <rect x="50" y="310" width="350" height="70" rx="12" fill="#d97757" opacity="0.1" stroke="#d97757" />
            <text x="225" y="340" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#d97757" textAnchor="middle">
              {lang === 'zh' ? '聊天引擎' : 'Chat Engine'}
            </text>
            <text x="225" y="362" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">
              {lang === 'zh' ? '并行 / 串行 / 角色 / 自主' : 'Parallel / Serial / Role / Autonomous'}
            </text>

            {/* Monitor */}
            <rect x="420" y="310" width="330" height="70" rx="12" fill="#788c5d" opacity="0.1" stroke="#788c5d" />
            <text x="585" y="340" fontFamily="Poppins" fontSize="14" fontWeight="600" fill="#788c5d" textAnchor="middle">
              {lang === 'zh' ? '监控代理' : 'Monitor Agent'}
            </text>
            <text x="585" y="362" fontFamily="Lora" fontSize="11" fill="#6b6a5f" textAnchor="middle">
              CPU / GPU / Memory / KV Cache
            </text>

            {/* Arrows */}
            <path d="M 250 90 L 290 90" stroke="#141413" strokeWidth="2" markerEnd="url(#arrow)" />
            <path d="M 500 90 L 540 90" stroke="#141413" strokeWidth="2" markerEnd="url(#arrow)" />

            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#141413" />
              </marker>
            </defs>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="anth-footer">
        <div className="anth-footer-legal">
          <p>© 2026 Helix Project. Apache License 2.0.</p>
          <div className="anth-social">
            <a href="https://github.com/TbusOS/Helix" aria-label="GitHub">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
