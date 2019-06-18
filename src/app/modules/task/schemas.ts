import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    save: {
        authentication: true,
        validation: {
            content: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Content')
                }
            },
            deadline: {
                in: 'body',
                isValidDate: {
                    errorMessage: INVALID('Date')
                },
                notEmpty: {
                    errorMessage: REQUIRED('Deadline')
                }
            },
            title: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Title')
                }
            },
        }
    }
};
