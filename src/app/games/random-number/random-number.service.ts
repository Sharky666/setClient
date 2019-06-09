import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { numberGuess } from '../../common/interfaces/games/randomNumber/randomNumber-results'

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {
  private address:string = 'http://localhost:2000';

  constructor(private http: HttpClient) { }

  private setNumber() {
    return this.http.post<numberGuess>(`${this.address}`, '', {
      headers: {
        
      }
    })
  }
}
