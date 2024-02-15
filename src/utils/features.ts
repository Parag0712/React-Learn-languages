import axios from "axios";
import { generate } from "random-words";



export const TranslateWord = async (toLag: langType)=> {
    try {
        // url: 'https://microsoft-translator-text.p.rapidapi.com/translate',


        const words = (generate(8) as string[]).map((value) => (
            {
                Text: value
            }
        ))

        const response = await axios.post("https://microsoft-translator-text.p.rapidapi.com/translate", words, {
            params: {
                'to[0]': toLag,
                'api-version': '3.0',
                profanityAction: 'NoAction',
                textType: 'plain'
            },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '9bd33045ffmsh98b0facc6e37d0bp1a0b23jsn5586411cc03c',
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
        })

        const receive:FetchedDataType[] = response.data;

        const arr:WordType[] =receive.map((value,index)=>{
            return{
                word:value.translations[0].text,
                meaning:words[index].Text,
                options:["asd"]
            }
        }); 

        console.log(arr);
        
        return arr
    } catch (error) {
        console.log(error);
        throw new Error("Some Error")
        
    }
}