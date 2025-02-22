import { Photo } from "./photo"

export interface Member {
    id:number
    userName: string
    age: number
    photoUrl: any
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    intresets: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
  }

  
  