// @flow

class MedicalProcedure {
    code: number;
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

module.exports = {
    MedicalProcedure: MedicalProcedure
};
