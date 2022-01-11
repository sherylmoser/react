import { useState } from "react";
import { Container } from "semantic-ui-react";
import { Login, LoginFormValues } from "../../components/login";
import API from "../../dataLayer/api";



export function LoginView() {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignIn = async (formValues: LoginFormValues) => {
        const { username, password } = formValues;
        if (!username || !password) {
            alert("NO")
            return;
        }
        setLoading(true)
        try {
            const result = await API.login(username, password)
            console.log(result)
            //handle result
        } catch (e) {
            //handle error
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container style={{ width: 400, margin: 48 }}>
            {loading ? <span>Loading...</span> : null}
            <Login onSuccess={handleSignIn} />
        </Container>
    );
}