import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Message } from "semantic-ui-react";
import { SignUpForm, SignUpFormValues } from "../../components/signUpForm";
import API from "../../dataLayer/api";


export function SignUpView() {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignUp = async (values: SignUpFormValues) => {
        setLoading(true)
        const { data, status } = await API.signUp(values)
        setLoading(false)
        if (status !== "success") {
            //tell the user
            setSuccess(false)
        } else {
            setSuccess(true)
            navigate('/login')
        }
    }

    return (
        <Container style={{ width: 400, margin: 48 }}>
            {loading ? <span>Signing Up...</span> : null}
            {success && <Message success>Thank you for Signing Up</Message>}
            <SignUpForm onSuccess={handleSignUp} />
        </Container>

    )
}