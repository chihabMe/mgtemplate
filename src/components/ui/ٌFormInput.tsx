import React, { HTMLInputTypeAttribute, HTMLProps } from 'react'
import { Input, InputProps } from './input';
import { Label } from '@radix-ui/react-label';
import { useField } from 'formik';
import { Eater } from 'next/font/google';
import { cn } from '@/lib/utils';
interface Props extends HTMLProps<HTMLInputElement> {
    name: string;

}
const FormInput = ({ name, label, type, placeholder, className }: Props) => {
    const [field, meta, helpers] = useField({ name })
    const isError = meta.touched && meta.error
    return (


        <div className="flex flex-col space-y-1.5">
            {label && <Label className={cn(`${isError&&"text-red-400"}`)} htmlFor={name}>{label}</Label>}
            <Input id="name" type={type} className={cn(className, `${isError && "ring-red-300 ring ring-2 text-red-500"}`)} placeholder={placeholder} {...field} />
            {isError &&
                <span className=' py-2 font-medium text-red-400 text-sm'>{meta.error}</span>
            }
        </div>


    )
}

export default FormInput;