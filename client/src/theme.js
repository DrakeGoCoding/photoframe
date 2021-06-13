import { red, lightBlue } from '@material-ui/core/colors'
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
        subtitle2:{
            color: 'rgba(14,19,24,.7)',
            fontWeight: '400',
            fontSize: '0.875rem',
        },
    },
    palette: {
        primary: {
            main: lightBlue[600]
        },
        secondary: {
            main: '#19857b',
        },
        
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    }
})

export default theme;