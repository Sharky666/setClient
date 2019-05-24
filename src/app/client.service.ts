import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientToken: string = '';
  clientName: string = '';
  clientLobbyId: string = '';
  isClientOwner: boolean = false;

  constructor() { }

  // setters
  public setToken(token: string): void {
    this.clientToken = token;
  }

  public setOwner(isOwner: boolean): void {
    this.isClientOwner = isOwner;
  }

  public setLobbyId(id: string): void {
    this.clientLobbyId = id;
  }

  public setName(Name: string): void {
    this.clientName = Name;
  }

  // getters
  public getToken(): string {
    return this.clientToken;
  }

  public getName(): string {
    return this.clientName;
  }

  public getLobbyId(): string {
    return this.clientLobbyId;
  }

  public getIsOwner(): boolean {
    return this.isClientOwner;
  }
}
