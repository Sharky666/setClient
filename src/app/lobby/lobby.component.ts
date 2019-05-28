import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from './lobby.service';
import { ClientService } from '../client.service';
import { LobbyStatusResultsResult } from '../common/interfaces/results';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit {
  clientGameModeSelect$ = new Subject();

  lobbyId = this.clientService.getLobbyId();
  clientToken = this.clientService.getToken();
  clientName = this.clientService.getName();
  isClientOwner = this.clientService.getIsOwner();

  validGameModes = this.lobbyService.getValidGameMode();
  lobbyClients: Array<string> = [''];

  lobbyStatus: LobbyStatusResultsResult;
  lobbyGameMode: string;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private clientService: ClientService) {}

  ngOnInit() {
    this.update();
    setInterval(this.update, 1000);
    this.clientGameModeSelect$
      .pipe(debounce(() => timer(500))).subscribe((gameMode) => this.setGameMode(gameMode));
  }

  private update() {
      if (!this.clientToken) return;
      this.updateLobbyStatus();
      this.updateLobbyClients();
  }

  private updateLobbyClients() {
    this.lobbyService.getLobbyClients(this.lobbyId, this.clientToken).subscribe(data => {
      const newLobbyClients = data.result;
      // if there's a change in the lobbyClients
      if (this.lobbyClients !== newLobbyClients) {
        this.lobbyClients = newLobbyClients;
      }
    });
  }

  private updateLobbyStatus() {
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
  }

  private setGameMode(gameMode) {
    // only owners can change a gameMode
    this.lobbyService.setLobbyGameMode(this.clientToken, this.lobbyId, gameMode)
      .subscribe(data => {
        if(!data.error) {
          // TODO: Implement game redirection?
        }
      });
  }

  // this function is being called from the HTML. for Owners only
  private onGameModeClick(gameMode) {
    this.clientGameModeSelect$.next(gameMode);
  }
}
