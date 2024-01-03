import {JsonData, Modifier, Generator} from "./types";


function applyModifiers(baseData: JsonData,  ...modifiers: Modifier[]) {
    let data = structuredClone(baseData)
    modifiers.forEach(modifier => modifier(data))
    return data
}

export function createDataGenerator(baseData: JsonData,  ...baseModifiers: Modifier[]): Generator {
    let generator_base_data = applyModifiers(baseData,  ...baseModifiers);
    return (...modifiers: Modifier[]) => applyModifiers(generator_base_data,  ...modifiers)
}