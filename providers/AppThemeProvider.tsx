'use client';

import { ConfigProvider, Switch } from 'antd';
import { ReactNode, useMemo, useState } from 'react';
import { getAppTheme } from '@/lib/theme/tokens';

type ThemeMode = 'light' | 'dark';

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

  function handleThemeChange(checked: boolean) {
    const nextMode = checked ? 'dark' : 'light';

    setMode(nextMode);
    localStorage.setItem('theme-mode', nextMode);
  }

  return (
    <ConfigProvider theme={themeConfig}>
      <div
        style={{
          minHeight: '100vh',
          background: mode === 'dark' ? '#0f172a' : '#fff',
        }}
      >
        <Switch
          checked={mode === 'dark'}
          onChange={handleThemeChange}
          checkedChildren='Dark'
          unCheckedChildren='Light'
        />

        {children}
      </div>
    </ConfigProvider>
  );
}
