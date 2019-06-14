import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    login: {
        validation: {
            password: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Password')
                }
            },
            email: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                },
                isEmail: {
                    errorMessage: INVALID('Email')
                }
            }
        }
    },
    register: {
        validation: {
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
            },
            email: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                },
                isEmail: {
                    errorMessage: INVALID('Email')
                }
            }
        }
    },
    logout: {
        authentication: true
    }
}
