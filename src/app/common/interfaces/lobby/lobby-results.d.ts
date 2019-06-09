export interface Results {
    result: string,
    error: string
}

export interface CreationResults {
    result: string,
    error: string
}

export interface JoinResults {
    result: {
        clientToken:  string,
        isOwner: boolean
    },
    error: string
}

export interface StatusResults {
     result: {
        status: string,
        gameMode: string
    },
    error: string
}

export interface ClientsResults {
    result: Array<string>
    error: string
}

export interface ValidGameModesResults {
    result: Array<string>,
    error: string
}

export interface PutGameModeResults {
    result: string
    error: string
}

export interface StatusResultsResult {
    status: string,
    gameMode: string
}