import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RandomNumberService } from './random-number.service'
import { ClientService } from 'src/app/client.service';
import { LobbyService } from 'src/app/lobby/lobby.service';
import { numberGuess, RandomNumberGameStatus } from '../../common/interfaces/games/randomNumber/randomNumber-results'
import { StatusResultsResult } from '../../common/interfaces/lobby/lobby-results'


@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  interval;
  guessNumber: number;
  hasGuessed = false;
  clientToken = this.clientService.getToken();
  clientLobby = this.clientService.getLobbyId();
  isOwner = this.clientService.getIsOwner();
  gameStatus: RandomNumberGameStatus;

  constructor(
    private router: Router,
    private randomNumberService: RandomNumberService,
    private clientService: ClientService,
    private lobbyService: LobbyService
    ) { }

  ngOnInit() {
    if (!this.clientToken) return;
    this.update();
    this.interval = setInterval(this.update.bind(this), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onSubmitClick() {
    this.hasGuessed = true;
    this.randomNumberService.setNumber(this.clientToken, this.clientLobby, this.guessNumber)
      .subscribe(d => {
        console.log(d.result);
      });
  }

  update() {
    this.updateGameStatus();
    this.updateLobbyStatus();
  }

  updateGameStatus() {
    if (this.gameStatus && this.gameStatus.isInGame === false) return;
    this.randomNumberService.getStatus(this.clientToken, this.clientLobby)
    .subscribe(d => {
      this.gameStatus = d.result;
      // if the game is over
      if (!this.gameStatus.isInGame) {
        // if the client is the owner
        if (this.clientService.getIsOwner) {
          // TODO: prompt the owner if he wants to play again or finish the game
        }
        else {
          // TODO: display something to the clients, since the game is over
        }
      }
      if (this.gameStatus.isGuessed === false) {
        this.hasGuessed = false;
      }
    });
  }

  updateLobbyStatus() {
    this.lobbyService.getLobbyStatus(this.clientLobby, this.clientToken)
      .subscribe(d => {
        if(d.error) {
          // TODO: display error on screen
        }
        else {
          // Should use enums
          if (d.result.status === "IDLE") {
            this.router.navigate(['lobby']);
          }
        }
      });
  }

  onPlayAgainConfirm() {
    this.gameStatus.isInGame = true;
    this.randomNumberService.playAgain(this.clientToken, this.clientLobby)
      .subscribe(d => {
        this.updateGameStatus();
      });
  }

  onPlayAgainCancel() {
    this.randomNumberService.endGame(this.clientToken, this.clientLobby)
      .subscribe(d => {
        this.updateGameStatus();
      });
  }
}
