'use client';

import { ConfigProvider } from 'antd';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { getAppTheme } from '@/lib/theme/tokens';
import { ThemeMode } from '@/lib/types/component';

type ThemeContextType = {
  mode: ThemeMode;
  toggleTheme: (checked: boolean) => void;
};

const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);

export default function AppThemeProvider({
  children,
  initialMode,
}: {
  children: ReactNode;
  initialMode: ThemeMode;
}) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const themeConfig = useMemo(() => getAppTheme(mode), [mode]);

  function toggleTheme(checked: boolean) {
    const nextMode: ThemeMode = checked ? 'dark' : 'light';

    setMode(nextMode);

    document.cookie = `theme-mode=${nextMode}; path=/; max-age=31536000; SameSite=Lax`;
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
