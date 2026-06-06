'use client';

import Link from 'next/link';
import styles from './PublicHeader.module.less';

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/jobs" className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
          </div>
          <span className={styles.logoText}>ATS Careers</span>
        </Link>
        <Link href="/auth/login" className={styles.loginLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Admin Login
        </Link>
      </div>
    </header>
  );
}
