describe("global.LOG", () => {
    let logLevel = "INFO";
    const text = "Something interesting to log.";

    beforeEach(() => {
        require("./log");
        jest.spyOn(console, "log");
    });

    test("prints something", () => {
        expect(console.log.mock.calls.length).toBe(0);
        LOG(logLevel, text);
        expect(console.log.mock.calls.length).toBe(1);
    });

    test("prints what's passed on", () => {
        LOG(logLevel, text);
        expect(("" + console.log.mock.calls[0][0]).includes(text)).toBe(true);
    });

    test("prints the log level", () => {
        LOG(logLevel, text);
        expect(("" + console.log.mock.calls[0][0]).includes(logLevel)).toBe(true);
    });

    test("adds datetime", () => {
        LOG(logLevel, text);
        expect(
            ("" + console.log.mock.calls[0][0]).includes(
                new Date().toLocaleDateString("fr-fr")
            )
        ).toBe(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});