import { authenticate } from 'passport';

export default (rule: string): any => authenticate(rule, { session: false });
