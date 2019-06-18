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
    public message: string;
    public errors: any[];
    public status: number = UNAUTHORIZED_CODE;

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    public status: number = BAD_REQUEST_CODE;
    public message: string;
    public errors: any[];

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class UnsupportedMediaType extends Error {
    public status: number = UNSUPPORTED_MEDIA_TYPE_CODE;
    public message: string;
    public errors: any[];

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    public status: number = CONFLICT_CODE;
    public message: string;
    public errors: any[];

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    public status: number = NOT_FOUND_CODE;
    public message: string;
    public errors: any[];

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    public status: number = FORBIDDEN_CODE;
    public message: string = PERMISSION_DENIED;
    public errors: any[];

    constructor(errors: any = null) {
        super();
        this.errors = errors;
    }
}

export class Gone extends Error {
    public status: number = GONE_CODE;
    public message: string;
    public errors: any[];

    constructor(message: string, errors: any = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ValidationError extends Error {
    public status: number = VALIDATION_ERROR_CODE;
    public message: string = VALIDATION_ERROR;
    public errors: any[];

    constructor(errors: any) {
        super();
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    public status: number = SERVICE_UNAVAILABLE_CODE;
    public message: string = SERVICE_UNAVAILABLE;
    public errors: any[];

    constructor(errors: any) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    public status: number = BAD_REQUEST_CODE;
    public message: string = SOMETHING_WENT_WRONG;
    public errors: any[];

    constructor(message: string, errors: any = null) {
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
