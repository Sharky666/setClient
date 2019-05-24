import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Results, LobbyCreationResults, LobbyStatusResults, LobbyJoinResults, LobbyValidGameModesResults, LobbyPutGameModeResults } from '../common/interfaces/results';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private address:string = 'http://localhost:2000';
  
  constructor(private http: HttpClient) {}

  public createLobby() {
    return this.http.post<LobbyCreationResults>(`${this.address}/lobby/create`, {});
  }

  public joinLobby(lobbyKey: string, name: string) {
    return this.http.post<LobbyJoinResults>(`${this.address}/lobby/join`, '',
    {
      headers: {
        'lobbykey': lobbyKey,
        'name': name
      }
    });
  }

  public setLobbyGameMode(token: string, lobbyKey: string, gameMode: string) {
    return this.http.put<LobbyPutGameModeResults>(`${this.address}/lobby/gameMode/${gameMode}`, '', {
      headers: {
        lobbyKey,
        token
      }
    });
  }

  // setters

  public getLobbyStatus(lobbyKey: string, token: string) {
    return this.http.get<LobbyStatusResults>(`${this.address}/lobby/status`, {
      headers: {
        'lobbykey': lobbyKey,
        'token': token
      }
    });
  };

  public getValidGameMode() {
    return this.http.get<LobbyValidGameModesResults>(`${this.address}/lobby/allowedGames`);
  }
}
