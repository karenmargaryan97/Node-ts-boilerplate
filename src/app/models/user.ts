import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default (mongoose) => {
    let UserSchema = mongoose.Schema({
            fullName: { type: String, required: true },
            email: { type: String, lowercase: true, required: true, index: true },
            password: { type: String },
            createdAt: Date,
            updatedAt: Date
        });

    UserSchema.pre('save', function(next) {
        const now: Date = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    UserSchema.methods = {
        generatePassword: function setUserPassword(pw: string): string {
            return hashSync(pw, genSaltSync(8));
        },

        setPassword: function setUserPassword(pw: string): void {
            this.password = hashSync(pw, genSaltSync(8));
        },

        comparePassword: function checkUserPassword(pw: string): boolean {
            return this.password && compareSync(pw, this.password);
        },
    };

    return mongoose.model('User', UserSchema);
};
