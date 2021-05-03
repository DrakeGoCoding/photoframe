import { red, lightBlue } from '@material-ui/core/colors'
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
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
    },
    overrides:{
        
    }
})

export default theme;