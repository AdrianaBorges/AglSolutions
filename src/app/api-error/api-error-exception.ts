import { ApiErrorExceptionEnum } from './api-error-exception-enum';

export class ApiErrorException extends Error {

    public tipoErro: ApiErrorExceptionEnum;

    constructor(tipo: ApiErrorExceptionEnum ,m: string) {
        super(m);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ApiErrorException.prototype);

        this.tipoErro = tipo;
    }

    getMensagem(): string{
        return this.message;
    }

    getTipo(): ApiErrorExceptionEnum{
        return this.tipoErro;
    }
}
