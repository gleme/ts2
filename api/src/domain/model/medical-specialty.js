// @flow

class MedicalSpecialty {
    code: number;
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

module.exports = {
    MedicalSpecialty: MedicalSpecialty
};
