import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    login: {
        validation: {
            email: {
                in: 'body',
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                }
            },
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            }
        }
    },
    logout: {
        authentication: true
    },
    register: {
        validation: {
            email: {
                in: 'body',
                isEmail: {
                    errorMessage: INVALID('Email')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                }
            },
            fullName: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Full Name')
                }
            },
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            }
        }
    }
};
