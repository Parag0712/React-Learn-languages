/// <reference types="vite/client" />

type Language = {
    name: string,
    code: string
}

type langType = "ja" | "es" | "hi" | "es" | "fr"

// For MCQ And word and meaning 
type WordType = {
    word:string,
    meaning:string,
    options:string[]
}

// intialstate type
interface StateType {
    loading:boolean,
    result:string[],
    words:WordType[]
    error?:string,
}

type FetchedDataType= {
    translations:{
        text:string
        to:string
    }[],

}