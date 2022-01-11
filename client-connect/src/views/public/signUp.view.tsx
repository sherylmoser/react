import { Container } from "semantic-ui-react";
import { SignUpForm, SignUpFormValues } from "../../components/signUpForm";


export function SignUpView() {
    const handleSignUp = (values: SignUpFormValues) => {
        console.log('Sign up', values);

    }
    return (
        <Container style={{ width: 400, margin: 48 }}>
            <SignUpForm onSuccess={handleSignUp} />
        </Container>

    )
}