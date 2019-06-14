import * as passport from 'passport';

export default (rule: string): any => passport.authenticate(rule, { session: false });
