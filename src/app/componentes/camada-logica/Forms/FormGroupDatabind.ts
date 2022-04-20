import { FormGroup, FormControl } from "@angular/forms";
import { EventEmitter } from "@angular/core";

export class FormGroupDataBind{

    public constructor(){}

    public formularioRecarregado: EventEmitter<any> = new EventEmitter<any>();;

    /**
     * Insere os dados da API no FormGroup
     * @param formGroup FormGroup cujos dados serão populados
     * @param ObjetoDaApi Objeto com dados da API que irão alimentar o FormGroup
     * @param emEdicao Serve para identificar em um novo cadastro que deve iniciar o status como em edição
     */
    public setValues(formGroup: FormGroup, ObjetoDaApi: any, emEdicao?:boolean): void{
        emEdicao = emEdicao||false;
        var formControl: FormControl;
        Object.keys(formGroup.controls).forEach(key => {
            formControl = <FormControl>formGroup.get(key);
            formControl.setValue(ObjetoDaApi[key]);
        });

        this.formularioRecarregado.emit(emEdicao);

        if(emEdicao == false){
            formGroup.markAsUntouched();
            formGroup.markAsPristine();
        }else{
            formGroup.markAsTouched();
            formGroup.markAsDirty();
        }
        
    }

    /**
     * Devolve ao objeto da API os dados modificados pelo formGroup
     * @param formGroup FormGroup cujos dados irão ser transferidos para o objeto da API
     * @param ObjetoDaApi Objeto da API que irá receber os dados do formGroup
     */
    public getValues(formGroup: FormGroup, ObjetoDaApi: any): void{
        var formControl: FormControl;
        Object.keys(formGroup.controls).forEach(key => {
            formControl = <FormControl>formGroup.get(key);
            ObjetoDaApi[key] = formControl.value;
        });
    }

}