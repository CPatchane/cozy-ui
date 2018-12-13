import { createMuiTheme } from '@material-ui/core/styles'

import MuiButton from './Buttons/theme'

const getCssVariableValue = variableName =>
  window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(`--${variableName}`)
    .trim()

export const theme = createMuiTheme({
  typography: {
    title: {
      fontFamily: ['Lato', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      color: 'white'
    }
  },
  palette: {
    primary: {
      light: getCssVariableValue('frenchPass'),
      main: getCssVariableValue('dodgerBlue'),
      dark: getCssVariableValue('scienceBlue'),
      contrastText: getCssVariableValue('white')
    },
    secondary: {
      light: getCssVariableValue('monza'),
      main: getCssVariableValue('portage'),
      dark: getCssVariableValue('azure'),
      contrastText: getCssVariableValue('white')
    }
  },
  overrides: {
    MuiButton
  }
})

// Override default shadow for elevation 8 used for Popover
theme.shadows[8] =
  '0rem 0.125rem 0.375rem 0rem rgba(50, 54, 63, .19), 0rem 0.375rem 1.25rem 0rem rgba(50, 54, 63, .19)'

export default theme
