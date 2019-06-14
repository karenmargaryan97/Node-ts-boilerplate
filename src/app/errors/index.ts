import {
    UNAUTHORIZED_CODE,
    BAD_REQUEST_CODE,
    GONE_CODE,
    FORBIDDEN_CODE,
    SERVICE_UNAVAILABLE_CODE,
    VALIDATION_ERROR_CODE,
    CONFLICT_CODE,
    NOT_FOUND_CODE,
    UNSUPPORTED_MEDIA_TYPE_CODE
} from '../configs/status-codes';
import {
    PERMISSION_DENIED,
    SOMETHING_WENT_WRONG,
    VALIDATION_ERROR,
    SERVICE_UNAVAILABLE
} from '../configs/constants';

export class AuthError extends Error {
    status: number = UNAUTHORIZED_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    status: number = BAD_REQUEST_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class UnsupportedMediaType extends Error {
    status: number = UNSUPPORTED_MEDIA_TYPE_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    status: number = CONFLICT_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status: number = NOT_FOUND_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    status: number = FORBIDDEN_CODE;
    message: string = PERMISSION_DENIED;
    errors: Array<any>;

    constructor(errors = null) {
        super();
        this.errors = errors;
    }
}

export class Gone extends Error {
    status: number = GONE_CODE;
    message: string;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ValidationError extends Error {
    status: number = VALIDATION_ERROR_CODE;
    message: string = VALIDATION_ERROR;
    errors: Array<any>;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    status: number = SERVICE_UNAVAILABLE_CODE;
    message: string = SERVICE_UNAVAILABLE;
    errors: Array<any>;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status: number = BAD_REQUEST_CODE;
    message: string = SOMETHING_WENT_WRONG;
    errors: Array<any>;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}
