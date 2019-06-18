export const VALIDATION_ERROR: string = `Request didn't pass validation`;
export const PERMISSION_DENIED: string = 'Permission Denied';
export const SOMETHING_WENT_WRONG: string = 'Something went wrong, please try again';

export const REQUIRED: (resource: string) => string = (resource: string): string => `${resource} is required`;
export const INVALID: (resource: string) => string = (resource: string): string => `${resource} is invalid`;
export const ALREADY_EXISTS: (resource: string) => string = (resource: string): string => `${resource} already exists!`;
export const NOT_EXISTS: (resource: string) => string  = (resource: string): string => `${resource} doesn't exist!`;

export const INVALID_EMAIL_OR_PASSWORD: string = 'Invalid email or password';
export const SERVICE_UNAVAILABLE: string = 'Service is temporarily unavailable';
export const USER_AUTH: string = 'user-rule';
