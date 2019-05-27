export interface Results {
    result: any,
    error: string
}

export interface LobbyCreationResults {
    result: string,
    error: string
}

export interface LobbyJoinResults {
    result: {
        clientToken:  string,
        isOwner: boolean
    },
    error: string
}

export interface LobbyStatusResults {
     result: {
        status: string,
        gameMode: string
    },
    error: string
}

export interface LobbyClientsResults {
    result: Array<string>
    error: string
}

export interface LobbyValidGameModesResults {
    result: Array<string>,
    error: string
}

export interface LobbyPutGameModeResults {
    result: string
    error: string
}

export interface LobbyStatusResultsResult {
    status: string,
    gameMode: string
}