import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { numberGuess, RandomNumberGameStatus } from '../../common/interfaces/games/randomNumber/randomNumber-results'
import { ApiResponse } from '../../common/interfaces/common';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {
  private address:string = 'http://localhost:2000';
  private game:string = 'randomNumber';

  constructor(private http: HttpClient) { }

  public setNumber(token: string, lobbyKey: string, number: number) {
    return this.http.post<numberGuess>(`${this.address}/game/${this.game}/guessNumber`,
    {
      number: number
    },
    {
      headers: {
            'Content-Type': 'application/json',
            'token': token,
            'lobbykey': lobbyKey
      }
    });
  }

  public getStatus(token: string, lobbyKey: string) {
    return this.http.get<ApiResponse<RandomNumberGameStatus>>(`${this.address}/game/${this.game}/status`, {
      headers: {
        'token': token,
        'lobbykey': lobbyKey
      }
    });
  }

  public playAgain(token: string, lobbyKey: string) {
    return this.http.put<ApiResponse<string>>(`${this.address}/game/${this.game}/playAgain`, '', {
      headers: {
        'token': token,
        'lobbykey': lobbyKey
      }
    });
  }

  public endGame(token: string, lobbyKey: string) {
    return this.http.put<ApiResponse<string>>(`${this.address}/game/${this.game}/finishGame`, '', {
      headers: {
        'token': token,
        'lobbykey': lobbyKey
      }
    });
  }
}
