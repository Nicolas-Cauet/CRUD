class UnknownSuffixError extends Error {
    constructor(suffix) {
        super(`Suffix '${suffix}' does not exist`);
    }
}

class ExistingSuffixError extends Error {
    constructor(suffix) {
        super(`Suffix '${suffix}' already exists`);
    }
}

class UnauthorizedDeletionError extends Error {
    message = `Wrong password`;
}

class HandlerError {
    static UnknownSuffixError = UnknownSuffixError;
    static ExistingSuffixError = ExistingSuffixError;
    static UnauthorizedDeletionError = UnauthorizedDeletionError;
}

module.exports = HandlerError;