import React, { useState } from 'react';
import Input from '../components/Input';
//import LoginPage from './LoginPage';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions';
 
export const UserSignupPage = (props) => {

    const [form, setForm] = useState({
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: ''
    });

    const [errors, setErrors] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const onChange = (event) => {
        const {value, name} = event.target;

        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value
            }
        })

        setErrors(previousErrors => {
            return {
                ...previousErrors,
                [name]: undefined
            }
        })
    };

    const onClickSignup = () => {
        const user = {
            username: form.username,
            displayName: form.displayName,
            password: form.password
        };
        setPendingApiCall(true);
        props.actions
            .postSignup(user)
            .then((response) => {
                setPendingApiCall(false);
                props.history.push('/');   
        })
        .catch((apiError) => {
            if(apiError.response.data && apiError.response.data.validationErrors) {
                setErrors(apiError.response.data.validationErrors);
            }
            setPendingApiCall(false);
        });

    };

    let passwordRepeatError;
    const { password, passwordRepeat} = form;
    if( password || passwordRepeat ) {
        passwordRepeatError = 
            password === passwordRepeat ? '' : 'Passwords do not match';
    }

    return (
        <div className="container">
            <h1 className="text-center">Join Explorify</h1>
            <div className="col-12 mb-3">
                <Input
                    name="displayName" 
                    placeholder="Display Name" 
                    value={form.displayName} 
                    onChange={onChange} 
                    hasError={errors.displayName && true} 
                    error={errors.displayName}
                />
            </div>

            <div className="col-12 mb-3">
                <Input
                    name="username" 
                    placeholder= "Username" 
                    value={form.username} 
                    onChange={onChange} 
                    hasError={errors.username && true} 
                    error={errors.username}    
                    />
            </div>

            <div className="col-12 mb-3">
                <Input
                    name="password" 
                    placeholder="Password" 
                    type ="password" 
                    value={form.password} 
                    onChange={onChange}
                    hasError={errors.password && true} 
                    error={errors.password}   
                    />
            </div>

            <div className="col-12 mb-3">
                <Input
                    name="passwordRepeat" 
                    placeholder="Confirm Password" 
                    type ="password" 
                    value={form.passwordRepeat} 
                    onChange={onChange}
                    hasError={passwordRepeatError && true} 
                    error={passwordRepeatError}
                    />
            </div>

            <div className="text-center">
                <ButtonWithProgress 
                    onClick={onClickSignup}
                    disabled={pendingApiCall || passwordRepeatError ? true : false}
                    pendingApiCall={pendingApiCall}
                    text="Create Account"
                />
            </div>
        </div>
    )
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => 
            new Promise((resolve, reject) => {
                resolve({});
            })
    },
    history: {
        push: () => {
            
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postSignup: (user) => dispatch(authActions.signupHandler(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserSignupPage);