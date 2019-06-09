import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from './lobby.service';
import { ClientService } from '../client.service';
import { StatusResultsResult } from '../common/interfaces/lobby/lobby-results';
import { Subject, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';

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

  lobbyStatus: StatusResultsResult;
  lobbyGameMode: string = '';
  interval;

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private clientService: ClientService) {}

  ngOnInit() {
    if (!this.clientToken) return;
    this.update();
    this.interval = setInterval(this.update.bind(this), 1000);
    this.clientGameModeSelect$
      .pipe(debounce(() => timer(500)))
      .pipe(distinctUntilChanged())
      .subscribe((gameMode) => this.setGameMode(gameMode));
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.clientGameModeSelect$.unsubscribe();
  }

  private update() {
    this.updateLobbyStatus();
    this.updateLobbyClients();
  }

  private updateLobbyStatus() {
    this.lobbyService.getLobbyStatus(this.lobbyId, this.clientToken)
    .subscribe(data => {
        if (!data.error) {
          this.lobbyStatus = data.result;
          this.lobbyGameMode = this.lobbyStatus.gameMode;
          // TODO: we should be using enums
          // If the game has started
          if (this.lobbyStatus.status === "STARTED") {
          this.router.navigate(['game', this.lobbyGameMode]);
          }
        }
        // if error with requesting the status
        else {
          // TOOD: print the error to the screen~
        }
      });
  }

  private updateLobbyClients() {
    this.lobbyService.getLobbyClients(this.lobbyId, this.clientToken)
    .subscribe(data => {
      const newLobbyClients = data.result;
      // if there's a change in the lobbyClients
      if (this.lobbyClients !== newLobbyClients) {
        this.lobbyClients = newLobbyClients;
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

  // this function is being called from the HTML. for Owners only
  private onStartClick() {
    this.startLobbyGame();
  }

  private startLobbyGame() {
    this.lobbyService.startLobbyGame(this.clientToken, this.lobbyId)
      .subscribe( d => {
        if (!d.error) {
          // TOOD: display the game in UI (using the router)
          this.router.navigate(['game', this.lobbyGameMode]);
        }
      });
  }
}
