import { useState } from "react";

type UseFormArgs<T> = {
    defaultValues?: T,
    onSuccess: (value: T) => void,
    onError?: (error: any) => void,

}

export function useForm<T>({ defaultValues, onSuccess }: UseFormArgs<T>) {
    const [formValues, setFormValues] = useState<T | undefined>(defaultValues)
    return {
        formProps: {
            onSubmit: () => {
                if (!formValues) {
                    return
                }
                onSuccess(formValues)
            }
        },
        getFieldProps: (fieldName: string) => {
            return {
                onChange: ({ target: { value, name } }: any) => {
                    if (!formValues) {
                        return
                    }
                    setFormValues({ ...formValues, [name]: value })
                },
                name: fieldName
            }
        }
    }
}