export class Movie {
    constructor(
        public id: number,
        public title: string,
        public posterPath: string | null,
        public overview: string,       
        public releaseDate: string     
    ) {}
}

export class Provider {
    constructor(
        public providerId: number,
        public providerName: string
    ) {}
}
