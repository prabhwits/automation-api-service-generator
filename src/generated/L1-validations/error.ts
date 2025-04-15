const errors = [
    { code: 60001, message: "Used in error object" },
    { code: 60002, message: "Used in error object" },
    { code: 60004, message: "Used in error object" },
    { code: 60005, message: "Used in NACK" },
    { code: 60006, message: "Used in NACK" },
    { code: 60007, message: "undefined" },
    { code: 60008, message: "undefined" },
    { code: 60009, message: "undefined" },
    { code: 60010, message: "undefined" },
    { code: 60011, message: "undefined" },
    { code: 60012, message: "undefined" },
    { code: 61001, message: "undefined" },
    { code: 62501, message: "undefined" },
    { code: 62502, message: "undefined" },
    { code: 62503, message: "undefined" },
    { code: 62504, message: "undefined" },
    { code: 62505, message: "undefined" },
    { code: 62506, message: "undefined" },
    { code: 62507, message: "undefined" },
    { code: 62508, message: "undefined" },
    { code: 62509, message: "undefined" },
    { code: 62510, message: "undefined" },
    { code: 62511, message: "undefined" },
    { code: 63001, message: "undefined" },
    { code: 63002, message: "undefined" },
    { code: 64001, message: "undefined" },
    { code: 65001, message: "undefined" },
    { code: 65002, message: "undefined" },
    { code: 65003, message: "undefined" },
    { code: 65004, message: "undefined" },
    { code: 66001, message: "undefined" },
    { code: 66002, message: "undefined" },
    { code: 66003, message: "undefined" },
    { code: 66004, message: "undefined" },
    { code: 66005, message: "undefined" },
    {
        code: 20006,
        message: "Invalid response does not meet API contract specifications",
    },
    {
        code: 30000,
        message: "Invalid request does not meet API contract specifications",
    },
];

export function getError(code: number) {
    const error = errors.find((error) => error.code === code);
    if (!error) {
        throw new Error(`Error code ${code} not found`);
    }
    return error;
}
