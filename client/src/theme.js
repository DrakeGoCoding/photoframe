import { red, lightBlue } from '@material-ui/core/colors'
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {

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
})

export default theme;