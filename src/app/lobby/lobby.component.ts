import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from './lobby.service';
import { ClientService } from '../client.service';
import { LobbyStatusResults } from '../common/interfaces/results';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  // TODO: implement a change gameMode function if the client is the owner of the lobby
  validGameModes = this.lobbyService.getValidGameMode();

  lobbyGameMode:string = '';
  chosenGameMode: string = '';
  isGameModeSet: boolean = true;

  lobbyId = this.clientService.getLobbyId();
  clientToken = this.clientService.getToken();
  clientName = this.clientService.getName();
  isClientOwner = this.clientService.getIsOwner();

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private clientService: ClientService) {}

  ngOnInit() {
    this.init();
  }

  private init() {
    //setLobbyGameMode currently does nothing because we haven't chosen a gameMode yet.
    this.setLobbyGameMode();

    // delay is preventing from spamming from the UI
    setInterval(() => {
      // if statement for preventing sending the same request if the lobby is set
      if (!this.isGameModeSet) {
        this.lobbyService.setLobbyGameMode(this.clientToken, this.lobbyId, this.chosenGameMode)
        .subscribe(data => {
          console.log(data);
        });
        this.isGameModeSet = true;
      }
    }, 1000);
  }

  private setLobbyGameMode() {
    this.lobbyService.getLobbyStatus(this.lobbyId, this.clientToken)
      .subscribe(data => {
        this.lobbyGameMode = data.result.gameMode;
      });
  }

  // this function is being called from the HTML
  private setChosenGameMode(gameMode) {
    if (this.chosenGameMode !== gameMode) {
      this.chosenGameMode = gameMode;
      this.isGameModeSet = false;
    }
  }

}
