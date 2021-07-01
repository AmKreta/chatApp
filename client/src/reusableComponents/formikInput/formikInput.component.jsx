import React from 'react';


//importing custom components
import Input from './text/text.input';

const FormikInput = ({ type, ...props }) => {
    switch (type) {
        case 'text': return <Input {...props} type={type}/>
        case 'number': return <Input {...props} type={type}/>
        case 'email': return <Input {...props} type={type}/>
        case 'password': return <Input {...props} type={type}/>
        default: return <Input {...props} type={type}/>
    }
}

export default FormikInput;