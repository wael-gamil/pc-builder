import { theme, ThemeConfig } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const getAppTheme = (mode: 'light' | 'dark'): ThemeConfig => ({
  algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,

  token: {
    colorPrimary: '#2881fd',
    colorSuccess: '#0bac46',

    borderRadius: 10,
    fontFamily: 'Cairo, Inter, Arial, sans-serif',

    colorBgLayout: mode === 'dark' ? '#0f172a' : '#f6f8fb',
    colorBgContainer: mode === 'dark' ? '#111827' : '#ffffff',

    colorBorder: mode === 'dark' ? '#263241' : '#e5e7eb',
    colorBorderSecondary: mode === 'dark' ? '#1f2937' : '#edf0f5',

    colorText: mode === 'dark' ? '#ffffff' : '#111827',
    colorTextSecondary: mode === 'dark' ? '#cbd5e1' : '#64748b',
  },

  components: {
    Card: {
      borderRadiusLG: 12,
      paddingLG: 18,
    },

    Button: {
      borderRadius: 8,
      controlHeight: 38,
    },

    Tag: {
      borderRadiusSM: 6,
    },

    Progress: {
      defaultColor: '#2881fd',
      remainingColor: mode === 'dark' ? '#263241' : '#e5e7eb',
    },

    Layout: {
      bodyBg: mode === 'dark' ? '#0f172a' : '#f6f8fb',
      headerBg: mode === 'dark' ? '#0f172a' : '#f6f8fb',
      siderBg: mode === 'dark' ? '#0f172a' : '#f6f8fb',
    },

    Drawer: {
      colorBgElevated: mode === 'dark' ? '#111827' : '#ffffff',
    },
  },
});
