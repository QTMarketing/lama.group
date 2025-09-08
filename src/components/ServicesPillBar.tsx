"use client";

import styles from "./ServicesPillBar.module.css";

export default function ServicesPillBar() {
  return (
    <div className="relative z-30" style={{ transform: "translateY(-20px)" }}>
      <nav aria-label="Services" className={styles.pill}>
      <div className={styles.track}>
        <a className={styles.item} href="/store-leasing" aria-label="Store Leasing">
          <span>Store Leasing</span>
          <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a className={styles.item} href="https://quicktrackfuel.com" target="_blank" rel="noopener noreferrer" aria-label="Fuel Branding & Supply (opens in new tab)">
          <span>Fuel Branding & Supply</span>
          <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a className={styles.item} href="https://lamawholesle.com" target="_blank" rel="noopener noreferrer" aria-label="Wholesale Distribution (opens in new tab)">
          <span>Wholesale Distribution</span>
          <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a className={styles.item} href="/book?service=construction-renovation" aria-label="Construction & Renovation, book a strategy session">
          <span>Construction & Renovation</span>
          <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <a className={styles.item} href="/book?service=maintenance-support" aria-label="Maintenance & Support, book a strategy session">
          <span>Maintenance & Support</span>
          <svg className={styles.chev} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      </nav>
    </div>
  );
}


