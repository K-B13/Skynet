const {
    passwordMinLength,
    passwordMaxLength,
    passwordSpecialCharacter,
    passwordHasAnInteger,
    passwordIncludesUpperCase,
    passwordIncludesLowerCase,
    passwordIsString,
    passwordNoTrailingSpaces,
    allPasswordChecks,
} = require("../../validation/passwordValidation");

describe("Password Validation", () => {
    describe("password min length", () => {
        it("password of length 9 should pass", () => {
            const password = passwordMinLength("something");
            expect(password.passes).toEqual(true);
        });

        it("password of length 8 should pass", () => {
            const password = passwordMinLength("dramatic");
            expect(password.passes).toEqual(true);
        });

        it("password of length 7 should fail", () => {
            const password = passwordMinLength("finally");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password is too short");
        });
    });

    describe("password max length", () => {
        it("password of length 19 should pass", () => {
            const password = passwordMaxLength("B5#tPq$9Xm!1oLv@Z2Kr");
            expect(password.passes).toEqual(true);
        });

        it("password of length 20 should pass", () => {
            const password = passwordMaxLength("B5#tPq$9Xm!1oLv@Z2Kr");
            expect(password.passes).toEqual(true);
        });

        it("password of length 21 should fail", () => {
            const password = passwordMaxLength("K3@d9Zv!6Y2Q#xTp$1nMl");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password is too long");
        });
    });

    describe("password special character", () => {
        it("password has special character", () => {
            const password = passwordSpecialCharacter("something?");
            expect(password.passes).toEqual(true);
        });

        it("password does not have special character", () => {
            const password = passwordSpecialCharacter("finally");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password does not have special character");
        });
    });

    describe("password has an integer", () => {
        it("password has an integer", () => {
            const password = passwordHasAnInteger("something1?");
            expect(password.passes).toEqual(true);
        });

        it("password does not have an integer", () => {
            const password = passwordHasAnInteger("finally");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password does not have an integer");
        });
    });

    describe("password includes upper case", () => {
        it("password has an uppercase letter", () => {
            const password = passwordIncludesUpperCase("Something1?");
            expect(password.passes).toEqual(true);
        });

        it("password does not have an uppercase letter", () => {
            const password = passwordIncludesUpperCase("finally");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password does not have an upper case letter");
        });
    });

    describe("password includes lower case", () => {
        it("password has a lowercase letter", () => {
            const password = passwordIncludesLowerCase("Something1?");
            expect(password.passes).toEqual(true);
        });

        it("password does not have a lowercase letter", () => {
            const password = passwordIncludesLowerCase("FINALLY");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password does not have a lower case letter");
        });
    });

    describe("password is a string function", () => {
        it("password is a string", () => {
            const password = passwordIsString("Something1?");
            expect(password.passes).toEqual(true);
        });

        it("password is not a string", () => {
            const password = passwordIsString(24);
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password must be a string");
        });
    });

    describe("password has no trailing or leading spaces function", () => {
        it("password has no leading or trailing spaces", () => {
            const password = passwordNoTrailingSpaces("Something1?");
            expect(password.passes).toEqual(true);
        });

        it("password has a trailing space", () => {
            const password = passwordNoTrailingSpaces("Something1? ");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password must not have spaces on either end of the password");
        });

        it("password has a leading space", () => {
            const password = passwordNoTrailingSpaces(" Something1?");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password must not have spaces on either end of the password");
        });

        it("password has a trailing and leading space", () => {
            const password = passwordNoTrailingSpaces(" Something1? ");
            expect(password.passes).toEqual(false);
            expect(password.message).toEqual("password must not have spaces on either end of the password");
        });
    });

    describe("testing the allPasswordChecks function", () => {
        it("password Something1? which should pass", () => {
            const passwordErrors = allPasswordChecks("Something1?");
            expect(passwordErrors.length).toEqual(0);
        });

        it("password something1? which should have 1 error", () => {
            const passwordErrors = allPasswordChecks("something1?");
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("password does not have an upper case letter");
        });

        it("password Something? which should have 1 error", () => {
            const passwordErrors = allPasswordChecks("Something?");
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("password does not have an integer");
        });

        it("password S0mething which should have 1 error", () => {
            const passwordErrors = allPasswordChecks("S0mething");
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("password does not have special character");
        });

        it("empty password, which should have 1 error", () => {
            const passwordErrors = allPasswordChecks("");
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("Invalid password type");
        });

        it("password integer instead of a string, which should have 1 error", () => {
            const passwordErrors = allPasswordChecks(24);
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("Invalid password type");
        });

        it("password boolean instead of a string, which should have 1 error", () => {
            const passwordErrors = allPasswordChecks(true);
            expect(passwordErrors.length).toEqual(1);
            expect(passwordErrors[0]).toEqual("Invalid password type");
        });

        it("password with multiple errors: short, no uppercase, no special char, no integer, trailing space", () => {
            const passwordErrors = allPasswordChecks("some ");
            expect(passwordErrors.length).toEqual(5);
            expect(passwordErrors[0]).toEqual("password is too short");
            expect(passwordErrors[1]).toEqual("password does not have an upper case letter");
            expect(passwordErrors[2]).toEqual("password does not have special character");
            expect(passwordErrors[3]).toEqual("password does not have an integer");
            expect(passwordErrors[4]).toEqual("password must not have spaces on either end of the password");
        });

        it("password with multiple errors: too long, no lowercase", () => {
            const passwordErrors = allPasswordChecks("ABCDEFGHIJKLMNOPQRSTUVWXYZ1!");
            expect(passwordErrors.length).toEqual(2);
            expect(passwordErrors[0]).toEqual("password is too long");
            expect(passwordErrors[1]).toEqual("password does not have a lower case letter");
        });

        it("password with multiple errors: no special char, no integer", () => {
            const passwordErrors = allPasswordChecks("Something");
            expect(passwordErrors.length).toEqual(2);
            expect(passwordErrors[0]).toEqual("password does not have special character");
            expect(passwordErrors[1]).toEqual("password does not have an integer");
        });

        it("password with multiple errors: no special char, no uppercase", () => {
            const passwordErrors = allPasswordChecks("something1");
            expect(passwordErrors.length).toEqual(2);
            expect(passwordErrors[0]).toEqual("password does not have an upper case letter");
            expect(passwordErrors[1]).toEqual("password does not have special character");
        });
    });
});
