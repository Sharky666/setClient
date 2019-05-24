import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyService } from '../lobby/lobby.service';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  clientName: string = '';

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
}