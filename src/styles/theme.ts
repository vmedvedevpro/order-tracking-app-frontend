export const theme = {
    colors: {
        bg: '#f7f8fb',
        surface: '#ffffff',
        surfaceHover: '#f1f5f9',
        border: '#e5e7eb',
        text: '#111827',
        textMuted: '#6b7280',
        accent: '#4f46e5',
        accentHover: '#4338ca',
        accentSoft: '#eef2ff',
        accentBorder: '#c7d2fe',
        danger: '#dc2626',
        dangerBg: '#fee2e2',
        dangerBorder: '#fecaca',
        dangerText: '#991b1b',
        warning: '#d97706',
        warningBg: '#fef3c7',
        warningBorder: '#fde68a',
        warningText: '#9a3412',
        success: '#16a34a',
        successBg: '#dcfce7',
        successBorder: '#bbf7d0',
        successText: '#166534',
        star: '#f59e0b',
    },
    radii: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        pill: '999px',
    },
    shadows: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04)',
    },
    fonts: {
        sans:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
} as const

export type AppTheme = typeof theme
