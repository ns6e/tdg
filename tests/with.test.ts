import {withValue, createDataGenerator, withoutValue} from "../src";

const base_data = {
    test: "xyz",
    test2: "abc",
    test3: {
        test4: {
            test5: 1
        }
    }
}

const generateData = createDataGenerator(base_data);

describe("withValue", () => {
    test("should set value of existing property", () => {
       const result = generateData(
           withValue("test", "abc")
       );

        expect(result).toEqual({
            test: "abc",
            test2: "abc",
            test3: {
                test4: {
                    test5: 1
                }
            }
        });
    });
    test("should set value of not existing property", () => {
       const result = generateData(
           withValue("testX", "abc")
       );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {
                    test5: 1
                }
            },
            testX: "abc"
        });
    });
    test("should set value of existing path", () => {
        const result = generateData(
            withValue("test3.test4.test5", 2)
        );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {
                    test5: 2
                }
            }
        });
    });
    test("should set value of not existing path", () => {
        const result = generateData(
            withValue("test3.test4.testX", 3)
        );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {
                    test5: 1,
                    testX: 3
                }
            }
        });
    });
});

describe("withoutValue", () => {
    test("should unset value of existing property", () => {
        const result = generateData(
            withoutValue("test")
        );

        expect(result).toEqual({
            test2: "abc",
            test3: {
                test4: {
                    test5: 1
                }
            }
        });
    });
    test("should not fail when property does not exists", () => {
        const result = generateData(
            withoutValue("testX")
        );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {
                    test5: 1
                }
            },
            testX: "abc"
        });
    });
    test("should unset property for existing path", () => {
        const result = generateData(
            withoutValue("test3.test4.test5")
        );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {}
            }
        });
    });
    test("should not fail unsetting property of not existing path", () => {
        const result = generateData(
            withoutValue("test3.test4.testX")
        );

        expect(result).toEqual({
            test: "xyz",
            test2: "abc",
            test3: {
                test4: {
                    test5: 1
                }
            }
        });
    });
});
