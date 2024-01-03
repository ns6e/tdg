import {createDataGenerator} from "../src";

test("generator without modifiers should return base data", () => {
    let baseData = {
        test: "sample-string"
    };
    const generator = createDataGenerator(baseData);
    const data = generator();

    expect(data).toEqual(baseData);
});

test("generator should not affect base data", () => {
    let baseData = {
        test: "sample-string"
    };
    const generator = createDataGenerator(baseData);
    generator(baseData1 => baseData1["test"] = "xyz");

    expect(baseData.test).toEqual("sample-string");
});

test("generator with modifier should return modified base data", () => {
    let baseData = {
        test: "sample-string"
    };
    const generator = createDataGenerator(baseData);
    const data = generator(baseData1 => baseData1["test"] = "xyz");

    expect(data).toEqual({
        test: "xyz"
    });
});

test("generator with modifier should not impact next generations", () => {
    let baseData = {
        test: "sample-string"
    };
    const generator = createDataGenerator(baseData);
    generator(baseData1 => baseData1["test"] = "xyz");
    const data = generator();

    expect(data).toEqual(baseData);
});

test("generator should apply modifiers", () => {
    let baseData = {
        test: "sample-string",
        test3: "sample-string",
    };
    const generator = createDataGenerator(baseData);
    const data = generator(
        baseData1 => baseData1["test"] = "xyz",
        baseData1 => baseData1["test2"] = "qwe",
        baseData1 => baseData1["test4"] = "iop",
        baseData1 => delete baseData1["test3"],
        );

    expect(data).toEqual({
        test: "xyz",
        test2: "qwe",
        test4: "iop",
    });
});

test("generator should apply base modifiers", () => {
    let baseData = {
        test: "sample-string",
        test3: "sample-string",
    };
    const generator = createDataGenerator(
        baseData,
        baseData1 => baseData1["test"] = "xyz",
        baseData1 => baseData1["test2"] = "qwe",
        baseData1 => baseData1["test4"] = "iop",
        baseData1 => delete baseData1["test3"],
    );
    const data = generator();

    expect(data).toEqual({
        test: "xyz",
        test2: "qwe",
        test4: "iop",
    });
});

test("generator should apply base modifiers before modifiers", () => {
    let baseData = {
        test: "sample-string",
        test3: "sample-string",
    };
    const generator = createDataGenerator(baseData,
        baseData1 => baseData1["test"] = "xy1"
    );
    const data = generator(
        baseData1 => baseData1["test"] = "xy2",
        baseData1 => baseData1["test2"] = "qwe",
        baseData1 => baseData1["test4"] = "iop",
        baseData1 => delete baseData1["test3"],
    );

    expect(data).toEqual({
        test: "xy2",
        test2: "qwe",
        test4: "iop",
    });
});