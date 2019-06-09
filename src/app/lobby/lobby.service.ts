import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Results, CreationResults, StatusResults, JoinResults, ValidGameModesResults, PutGameModeResults, ClientsResults } from '../common/interfaces/lobby/lobby-results';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private address:string = 'http://localhost:2000';
  
  constructor(private http: HttpClient) {}

  // setters

  public createLobby() {
    return this.http.post<CreationResults>(`${this.address}/lobby/create`, {});
  }

  public joinLobby(lobbyKey: string, name: string) {
    return this.http.post<JoinResults>(`${this.address}/lobby/join`, '',
    {
      headers: {
        'lobbykey': lobbyKey,
        'name': name
      }
    });
  }

  public setLobbyGameMode(token: string, lobbyKey: string, gameMode: string) {
    return this.http.put<PutGameModeResults>(`${this.address}/lobby/gameMode/${gameMode}`, '', {
      headers: {
        lobbyKey,
        token
      }
    });
  }

  public startLobbyGame(token: string, lobbyKey: string) {
    return this.http.post<Results>(`${this.address}/lobby/start`, '', {
      headers: {
        'lobbykey': lobbyKey,
        'token': token
      }
    });
  }

  // getters

  public getLobbyStatus(lobbyKey: string, token: string) {
    return this.http.get<StatusResults>(`${this.address}/lobby/status`, {
      headers: {
        'lobbykey': lobbyKey,
        'token': token
      }
    });
  };

  public getLobbyClients(lobbyKey: string, token: string) {
    return this.http.get<ClientsResults>(`${this.address}/lobby/clients`, {
      headers: {
        'lobbykey': lobbyKey,
        'token': token
      }
    });
  };

  public getValidGameMode() {
    return this.http.get<ValidGameModesResults>(`${this.address}/lobby/allowedGames`);
  }
}
