import './App.css';
import Nav from './Nav'
import { Container1, Album, FeedBack } from './Home'
// import LogIn from './LogIn';
// import SignUp from './SignUp';
// import ResetPassword from './ResetPassword'
import Fotter from './Footer'

function App() {
    return (
        <>
            <Nav/>
            <Container1/>
            <Album /><br/>
            <hr/>
            <FeedBack/>
            <Fotter/>
        </>
    );
}

export default App;
