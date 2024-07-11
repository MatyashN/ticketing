import axios from "axios";
import { useState } from "react";

const UseRequestHook = ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);

            if (onSuccess && typeof onSuccess === 'function') {
                onSuccess(response.data);
            }

            return response.data;
        } catch (err) {
            debugger
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul className='my-0'>
                        {err.response.data.errors.map(e => {
                            return <li key={e.message} className=''>{e.message}</li>
                        })}
                    </ul>
                </div>
            )
         }
    }

    return { doRequest, errors };
};

export default UseRequestHook;