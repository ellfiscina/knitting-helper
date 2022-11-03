export type gaugeFormValues = {
    gaugeSt: number;
    gaugeWidth: number;
    finalWidth: number;
};

export type calculatorFormValues = {
    currentSt: number;
    finalSt: number;
};

export type Yarn = {
    name: string;
    grams: number;
    yardage: number;
    company: string;
    weight: string;
    gauge: string;
    fibers: {
        name: string;
        kind: number;
    }[];
    texture: string;
}
