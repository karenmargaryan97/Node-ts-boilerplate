import { INVALID, REQUIRED } from '../../configs/constants';

export default {
    save: {
        authentication: true,
        validation: {
            title: {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Title')
                }
            },
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
            }
        }
    }
}
