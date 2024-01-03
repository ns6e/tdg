export interface JsonData {
    [index: string]: any | JsonData
}

export type Modifier = (baseData: JsonData) => void;
export type Generator = (...modifiers: Modifier[]) => JsonData;