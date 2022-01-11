import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

export type LoginFormValues = {
    username?: string;
    password?: string
}

type LoginProps = {
    onSuccess: (formValues: LoginFormValues) => void;
    onError?: (errors: any) => void;
}

//after custom hook
export function Login({ onSuccess, onError }: LoginProps) {
    const { handleSubmit, register } = useForm<LoginFormValues>({
        mode: 'onSubmit',
        defaultValues: {}
    }
    )

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <Form.Field>
                <label>Username/Email</label>
                <input {...register("username")} placeholder="Username/Email" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" {...register("password")} placeholder="Password" />
            </Form.Field>
            <Button type="submit">Sign In</Button>
        </Form>
    );
}


//this is before custom hook
export function Login2({ onSuccess, onError }: LoginProps) {
    const [formValues, setFormValues] = useState<LoginFormValues>({})
    const handleSubmit = () => {
        onSuccess(formValues)
    }

    const handleChange = ({ target: { value, name } }: any) => {
        setFormValues({ ...formValues, [name]: value })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <label>Username/Email</label>
                <input onChange={handleChange} name="username" placeholder="Username/Email" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" onChange={handleChange} name="password" placeholder="Password" />
            </Form.Field>
            <Button type="submit">Sign In</Button>
        </Form>
    );
}