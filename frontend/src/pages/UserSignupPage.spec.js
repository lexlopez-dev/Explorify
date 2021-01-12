// import React from 'react';
// import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import { UserSignupPage } from './UserSignupPage';

// beforeEach(cleanup);


// //Test Group for Sign Up Page
// describe('UserSignupPage', () => {
//     describe('Layout', () => {

//         it('has input for display name', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const displayNameInput = queryByPlaceholderText('Display Name');
//             expect(displayNameInput).toBeInTheDocument();

//         });

//         it('has input for username', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const usernameInput = queryByPlaceholderText('Username');
//             expect(usernameInput).toBeInTheDocument();

//         });
        
//         it('has input for password', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const passwordInput = queryByPlaceholderText('Password');
//             expect(passwordInput).toBeInTheDocument();

//         });

//         it('has password type for password input', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const passwordInput = queryByPlaceholderText('Password');
//             expect(passwordInput.type).toBe('password');

//         });

//         it('has input for password repeat', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const passwordRepeat = queryByPlaceholderText('Confirm Password');
//             expect(passwordRepeat).toBeInTheDocument();
//         });

//         it('has password type for password repeat input', () => {
//             const { queryByPlaceholderText } = render(<UserSignupPage />);
//             const passwordRepeat = queryByPlaceholderText('Confirm Password');
//             expect(passwordRepeat.type).toBe('password');

//         });

//         it('has submit button', () => {
//             const { container } = render(<UserSignupPage />);
//             const button = container.querySelector('button');
//             expect(button).toBeInTheDocument();
//         })
//     });
// });