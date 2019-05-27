import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from '../lobby/lobby.service';
import { ClientService } from '../client.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  clientName: string = '';
  lobbyId: string = '';

  constructor(
    private router: Router,
    private lobbyService: LobbyService,
    private clientService : ClientService
    ) { }

  ngOnInit() {
  }

  onCreateClick() {
    // creating a lobby
    this.lobbyService.createLobby()
    .subscribe(createData => {
      if (!createData.error) {
        const lobbyKey = createData.result;
        // joining that lobby
        this.lobbyService.joinLobby(lobbyKey, this.clientName)
            .subscribe(joinData => {
              if (!joinData.error) {
                // navigate to the lobby path
                this.router.navigate(['lobby', lobbyKey]);
                // setting the client data to the clientService
                this.clientService.setLobbyId(lobbyKey);
                this.clientService.setToken(joinData.result.clientToken);
                this.clientService.setOwner(joinData.result.isOwner);
                this.clientService.setName(this.clientName);
              }
              // error when joining the lobby
              else {
                // TODO: print to screen into some error component
              }
            })
      };
    });
  }
  onJoinClick() {
    this.lobbyService.joinLobby(this.lobbyId, this.clientName)
    .subscribe(data => {
      if (!data.error) {
        const results = data.result;
        this.clientService.setToken(results.clientToken);
        this.clientService.setLobbyId(this.lobbyId.toUpperCase());
        this.clientService.setName(this.clientName);
        this.clientService.setOwner(results.isOwner);
        this.router.navigate(['lobby', this.clientService.getLobbyId()]);
      }
      // error with joining
      else {
        // TODO: print the error to the screen using an error element
        console.log(data.error);
      }
    });
  }
}