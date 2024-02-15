import axios from "axios";
import { generate } from "random-words";
import _ from 'lodash'

const generateMcq = (
meaning: {
    Text: string;
}[], 
idx: number): string[] => {
    //This Is Correct meaning
    
    const correctAns: string = meaning[idx].Text;        
    
    // An Array with all words except for correct ans 
    const allMeaningExpectCorrect = meaning.filter((i)=>i.Text !== correctAns); 

    // Randomly genrating 3 elements from incorrectArray
    const incorrectOptions:string[] = _.sampleSize(
        allMeaningExpectCorrect,3).map((i)=>i.Text); 

    const mcqOptions = _.shuffle([...incorrectOptions,correctAns]);

    return mcqOptions;
}


export const TranslateWord = async (toLag: langType) => {
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

        const receive: FetchedDataType[] = response.data;

        const arr: WordType[] = receive.map((value, index) => {
            const options: string[] = generateMcq(words,index);
            return {
                word: value.translations[0].text,
                meaning: words[index].Text,
                options: options
            }
        });

        
        console.log(arr);

        return arr
    } catch (error) {
        console.log(error);
        throw new Error("Some Error")

    }
}