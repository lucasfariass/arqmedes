export enum CivilStatusEnum {
    SOLTEIRO = 'SOLTEIRO',
    CASADO = 'CASADO',
    DIVORCIADO = 'DIVORCIADO',
    VIUVO = 'VIUVO'
}

export const CivilStatusDescription = {
    [CivilStatusEnum.SOLTEIRO]: 'Solteiro',
    [CivilStatusEnum.CASADO]: 'Casado',
    [CivilStatusEnum.DIVORCIADO]: 'Divorciado',
    [CivilStatusEnum.VIUVO]: 'Viúvo',
}