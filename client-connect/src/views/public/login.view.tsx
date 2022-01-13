import { useEffect, useState } from "react";
import { Container, Message } from "semantic-ui-react";
import { Login, LoginFormValues } from "../../components/login";
import API from "../../dataLayer/api";
import { useGlobalContext } from "../../contexts/global.context";
import { useNavigate } from "react-router-dom";



export function LoginView() {
    const { state, onLogin } = useGlobalContext();
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (state.loggedIn) {
            navigate("/companies")
        }
    }, [state.loggedIn])

    const handleSignIn = async (formValues: LoginFormValues) => {
        const { username, password } = formValues;
        if (!username || !password) {
            return
        }
        onLogin?.(username, password)
    }
    return (
        <Container style={{ width: 400, margin: 48 }}>
            {state.loading ? <span>Loading...</span> : null}
            {state.error && <Message warning>{state.error}</Message>}
            <Login onSuccess={handleSignIn} />

        </Container>
    );
}