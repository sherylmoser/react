import { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

export type SignUpFormValues = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string
}

type SignUpProps = {
    onSuccess: (formValues: SignUpFormValues) => void;
    onError?: (errors: any) => void;
}

//after custom hook
export function SignUpForm({ onSuccess, onError }: SignUpProps) {
    const { handleSubmit, register } = useForm<SignUpFormValues>({
        defaultValues: {}
    })

    return (
        <Form onSubmit={handleSubmit(onSuccess)}>
            <Form.Field>
                <label>Username</label>
                <input {...register("username")} placeholder="Username" />
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input {...register("email")} placeholder="Email" />
            </Form.Field>
            <Form.Field>
                <label>First Name</label>
                <input {...register("firstName")} placeholder="First Name" />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input {...register("lastName")} placeholder="Last Name" />
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" {...register("password")} placeholder="Password" />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
            </Form.Field>
            <Button type="submit">Sign In</Button>
        </Form>
    );
}

