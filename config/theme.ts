import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

export const defaultThemeObject = {
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  colors: {
    primary: '#FFCF42',
  },
  breakPoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: () => ({
      body: {
        fontFamily: "'Bricolage Grotesque', sans-serif",
        bg: '#fff',
        color: '#000',
      },
    }),
  },
  components: {
    Button: defineStyleConfig({
      defaultProps: {
        variant: 'default',
      },
      baseStyle: {
        borderRadius: '0',
        fontSize: '12px',
        fontWeight: '500',
        size: 'md',
      },
      variants: {
        default: defineStyle({
          bg: '#fff',
          color: '#000',
          borderRadius: '4px',
          border: '1px solid #000',
          boxShadow: '0px 2px 0px 0px #000',
        }),
        primary: defineStyle({
          bg: 'primary',
          color: '#1B1B1B',
          _hover: {
            bg: '#fff',
          },
          borderRadius: '4px',
          border: '1px solid #000',
          boxShadow: '0px 2px 0px 0px #000',
        }),
        profile: defineStyle({
          bg: '#242EA5',
          color: '#fff',
          borderRadius: '4px',
          border: '1px solid #000',
          boxShadow: '0px 2px 0px 0px #000',
        }),
        ghost: defineStyle({
          color: '#FFF',
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        }),
      },
    }),
    Link: defineStyleConfig({
      baseStyle: {
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
      },
    }),
    Drawer: defineStyleConfig({
      baseStyle: {
        dialog: {
          bg: '#1B1B1B',
        },
      },
    }),
    Steps,
  },
}

export const defaultTheme = extendTheme(defaultThemeObject)
