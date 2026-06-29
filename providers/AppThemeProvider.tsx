'use client';

import { ConfigProvider } from 'antd';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { getAppTheme } from '@/lib/theme/tokens';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: (checked: boolean) => void;
};

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = localStorage.getItem('theme-mode');

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return 'light';
}

export default function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>(() => getInitialThemeMode());

  const themeConfig = useMemo(() => getAppTheme(mode), [mode]);

  function toggleTheme(checked: boolean) {
    const nextMode = checked ? 'dark' : 'light';

    setMode(nextMode);
    localStorage.setItem('theme-mode', nextMode);
  }

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider theme={themeConfig}>
        <div
          style={{
            minHeight: '100vh',
            background: mode === 'dark' ? '#0f172a' : '#f5f7fb',
          }}
        >
          {children}
        </div>
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }

  return context;
}
