import { Inject, Injectable } from '@angular/core';
//import { SESSION_STORAGE, LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Autenticacao } from '../modulos/segur/models/autenticacao';

@Injectable()
export class ApiTokenService {

  private tokenKey: string =  'token';
  private userKey: string =  'user';

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

  }

  public getToken(): string{
    return this.storage.get(this.tokenKey) || 'sem token';
  }

  public setToken(token: string){
    this.storage.set(this.tokenKey, token);
  }

  public getUsuarioLogado(): Autenticacao{
    return this.storage.get(this.userKey);
  }

  public setUsuarioLogado(dados: Autenticacao): void{
    this.storage.set(this.userKey, dados);
  }

  public limparDados(): void{
    this.storage.set(this.tokenKey, null);
    this.storage.set(this.userKey, null);
  }

}
