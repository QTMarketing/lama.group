import React from 'react';

export default function StatusBar() {
  return (
    <section className="stats-section">
      <div className="container">
        <h2 className="section-title">
          The first institutional-grade fixed income platform built for scale
        </h2>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-value">$5.2T+</div>
            <p className="stat-label">
              Assets managed by institutional clients on our platform
            </p>
          </div>
          <div className="stat-item">
            <div className="stat-value">5M+</div>
            <p className="stat-label">
              Bond trades executed through our system
            </p>
          </div>
          <div className="stat-item">
            <div className="stat-value">&lt;1s</div>
            <p className="stat-label">
              Median execution time for bond transactions
            </p>
          </div>
        </div>

        <div className="chart-container" />

        <div className="testimonial">
          <blockquote>
            Lama Group&apos;s fixed income technology has fundamentally transformed our trading operations. The platform&apos;s scalability and efficiency have delivered unprecedented performance improvements across our entire bond portfolio.
          </blockquote>
          <p className="author">Sarah Johnson</p>
          <p className="title">Chief Investment Officer, Global Asset Management</p>
        </div>
      </div>

      <style jsx>{`
        :root {
          --primary: #000000;
          --secondary: #ffffff;
          --accent: #f5f5f5;
          --text: #1a1a1a;
          --text-light: #666666;
        }

        .stats-section {
          padding: 120px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: var(--secondary);
          color: var(--text);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }

        .section-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          text-align: center;
          margin-bottom: 80px;
          max-width: 800px;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: 0.2s;
        }

        .stats-container {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          gap: 20px;
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.5s;
        }

        .stat-item {
          flex: 1;
          text-align: center;
          padding: 0 20px;
          transition: transform 0.3s ease;
        }

        .stat-item:hover { transform: translateY(-5px); }

        .stat-value {
          font-size: 64px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--primary);
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        .stat-item:nth-child(1) .stat-value { animation-delay: 0.8s; }
        .stat-item:nth-child(2) .stat-value { animation-delay: 1.0s; }
        .stat-item:nth-child(3) .stat-value { animation-delay: 1.2s; }

        .stat-label {
          font-size: 18px;
          color: var(--text-light);
          max-width: 220px;
          margin: 0 auto;
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
          animation-fill-mode: both;
        }

        .stat-item:nth-child(1) .stat-label { animation-delay: 1.0s; }
        .stat-item:nth-child(2) .stat-label { animation-delay: 1.2s; }
        .stat-item:nth-child(3) .stat-label { animation-delay: 1.4s; }

        .chart-container {
          height: 200px;
          width: 100%;
          max-width: 1200px;
          margin: 80px auto 0;
          position: relative;
          background: linear-gradient(to right, transparent 0%, var(--accent) 100%);
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 1.5s;
        }

        .chart-container::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background: var(--primary);
        }

        .testimonial {
          max-width: 800px;
          margin: 100px auto 0;
          text-align: center;
          padding: 0 20px;
          opacity: 0;
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 1.8s;
        }

        .testimonial blockquote {
          font-size: 24px;
          font-style: italic;
          line-height: 1.6;
          margin: 30px 0;
          color: var(--text);
          position: relative;
        }

        .testimonial blockquote::before {
          content: '"';
          font-size: 64px;
          color: var(--accent);
          position: absolute;
          left: -20px;
          top: -30px;
          line-height: 1;
        }

        .author {
          font-weight: 600;
          margin-top: 20px;
          font-size: 18px;
          color: var(--primary);
        }

        .title {
          font-style: italic;
          color: var(--text-light);
          font-size: 16px;
          margin-top: 5px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .section-title { font-size: 36px; margin-bottom: 60px; }
          .stats-container { flex-direction: column; gap: 40px; margin-bottom: 60px; }
          .stat-item { padding: 0; }
          .stat-value { font-size: 48px; }
          .chart-container { height: 150px; margin: 60px auto 0; }
          .testimonial blockquote { font-size: 20px; }
          .testimonial blockquote::before { font-size: 48px; left: -15px; top: -20px; }
        }
      `}</style>
    </section>
  );
} 