import { theme, ThemeConfig } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

export const getAppTheme = (mode: 'light' | 'dark'): ThemeConfig => ({
  algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,

  token: {
    colorPrimary: '#2881fd',
    colorSuccess: '#0bac46',

    borderRadius: 10,
    fontFamily: 'Cairo, Inter, Arial, sans-serif',

    colorBgLayout: mode === 'dark' ? '#0f172a' : '#fff',
    colorBgContainer: mode === 'dark' ? '#111827' : '#fff',
    colorBorder: mode === 'dark' ? '#263241' : '#fff',

    colorText: mode === 'dark' ? '#fff' : '#111827',
    colorTextSecondary: mode === 'dark' ? '#fff' : '#2881fd',
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
  },
});
