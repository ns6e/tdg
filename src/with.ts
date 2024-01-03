import {JsonData, Modifier} from "./types";

export function withValue(path: string, value: JsonData | any, separator: string = '.'): Modifier {
    return function (baseData: JsonData): void {
        const pathElements = path.split(separator);
        const lastElement = pathElements.length - 1;
        let current = baseData;
        pathElements.forEach((element, index) => {
            if (index == lastElement) {
                current[element] = value;
            } else {
                if (!(element in current)) {
                    current[element] = {};
                }
                current = current[element] as JsonData;
            }
        })
    }
}

export function withoutValue(path: string, separator: string = '.'): Modifier {
    return function (baseData: JsonData): void {
        const pathElements = path.split(separator);
        const lastElement = pathElements.length - 1;
        let current = baseData;
        pathElements.forEach((element, index) => {
            if (!(element in current)) {
                return;
            }

            if (index == lastElement) {
                delete current[element];
            } else {
                current = current[element] as JsonData;
            }
        })
    }
}