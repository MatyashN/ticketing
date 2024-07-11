import { useState } from 'react';
import UseRequestHook from '../../hooks/use-request';
import Router from 'next/router'

const MyForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = UseRequestHook({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        doRequest();
    };

    return (
        <div className="container">
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                {errors}
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
        </div>
    );
};

export default MyForm;