import React from 'react'
import { Input } from './input';
import { Label } from '@radix-ui/react-label';

const FormInput = () => {
    return (

        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name of your project" />
        </div>


    )
}

export default FormInput;