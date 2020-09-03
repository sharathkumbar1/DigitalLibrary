import { createMuiTheme } from '@material-ui/core/styles'

export const praxis = {
  light: '#f05545',
  main: '#8c1f27',
  dark: '#7f0000',
  contrastText: '#fff',
}

export const idp = {
  light: '#728ca8',
  main: '#144333',
  dark: '#2d3e50',
  contrastText: '#fff',
}

const praxisTheme = createMuiTheme({
  palette: {
    primary: idp,
    secondary: idp,
  },
  overrides: {
    MuiButton: {
      root: {
        color: 'white',
        backgroundColor: '#2d3e50',
        '&:hover': {
          backgroundColor: '#728ca8',
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
  spacing: 4,
})

export default praxisTheme
