import { object, string, InferType } from 'yup';

export const FormSchema = object().shape({
  username: string()
    .min(4, 'Min 4 characters')
    .max(12, 'Max 12 characters')
    .required('Username is required'),
  password: string()
    .min(6, 'Min 6 characters')
    .required('Password is required'),
});

export type FormSchemaType = InferType<typeof FormSchema>;
