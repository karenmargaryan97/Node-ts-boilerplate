import * as moment from 'moment';

export const isValidDate = (value: string): boolean => {
    return moment(value).isValid();
};
