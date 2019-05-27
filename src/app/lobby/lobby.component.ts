import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from './lobby.service';
import { ClientService } from '../client.service';
import { LobbyStatusResultsResult } from '../common/interfaces/results';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  lobbyId = this.clientService.getLobbyId();
  clientToken = this.clientService.getToken();
  clientName = this.clientService.getName();
  isClientOwner = this.clientService.getIsOwner();

  validGameModes = this.lobbyService.getValidGameMode();
  lobbyClients: Array<string> = [''];

  lobbyStatus: LobbyStatusResultsResult;
  lobbyGameMode: string;
  chosenGameMode: string = '';
  currentGameMode: string = '';
  isNewGameMode: boolean = false;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private clientService: ClientService) {}

  ngOnInit() {
    this.init();
  }

  private init() {
    // delay is preventing from spamming from the UI
    // ??: Should be really use a setInterval
    setInterval(() => {
      // if client isn't authorized
      if (!this.clientToken) return;
      // if statement for preventing sending the same request if the lobby is set
      if (this.isNewGameMode) {
        // only owners can change a gameMode
        this.lobbyService.setLobbyGameMode(this.clientToken, this.lobbyId, this.chosenGameMode)
        .subscribe(data => {
          if(!data.error) {
            this.isNewGameMode = false;
          }
        });
      }
      // getting the lobby's status
      this.lobbyService.getLobbyStatus(this.lobbyId, this.clientToken)
      .subscribe(data => {
        if (!data.error) {
          this.lobbyStatus = data.result;
          this.lobbyGameMode = this.lobbyStatus.gameMode;
        }
        // if error with requesting the status
        else {
          // TOOD: print the error to the screen~
        }
      });
      this.lobbyService.getLobbyClients(this.lobbyId, this.clientToken).subscribe(data => {
        const newLobbyClients = data.result;
        // if there's a change in the lobbyClients
         if (this.lobbyClients !== newLobbyClients) {
          this.lobbyClients = newLobbyClients;
        }
      });
      // TODO: I believe this 'functionality' could have been written better, maybe change the client's URL according to his 'isOwner' value
      // if a change in the lobby's status gameMode accured, change the current displaying element. (otherwise it would have just kept refreshing the element and it would have been ugly)
      if (!this.isClientOwner && this.lobbyGameMode && this.lobbyGameMode !== this.currentGameMode) {
        this.currentGameMode = this.lobbyGameMode;
      }
    }, 1000);
  }

  // this function is being called from the HTML. for Owners only
  private setChosenGameMode(gameMode) {
    if (this.chosenGameMode !== gameMode) {
      this.chosenGameMode = gameMode;
      this.isNewGameMode = true;
    }
  }

}
