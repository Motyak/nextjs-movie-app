import { Server, Client } from "styletron-engine-atomic"

const engine = typeof window === "undefined" ? new Server() : new Client()

export default engine

// import {Client, Server} from 'styletron-engine-monolithic';

// const getHydrateClass = () => document.getElementsByClassName("_styletron_hydrate_") as HTMLCollectionOf<HTMLStyleElement>
// const engine = typeof window === "undefined"? new Server() : new Client({hydrate: getHydrateClass()})

// export default engine
