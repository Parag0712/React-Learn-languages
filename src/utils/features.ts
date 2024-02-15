import axios from "axios";
import { generate } from "random-words";
import _ from 'lodash'

const key = import.meta.env.VITE_TEXT_TO_SPEECH_API;
const rapidKey = import.meta.env.VITE_RAPID_API;

const generateMcq = (
    meaning: {
        Text: string;
    }[],
    idx: number): string[] => {
    //This Is Correct meaning

    const correctAns: string = meaning[idx].Text;

    // An Array with all words except for correct ans 
    const allMeaningExpectCorrect = meaning.filter((i) => i.Text !== correctAns);

    // Randomly genrating 3 elements from incorrectArray
    const incorrectOptions: string[] = _.sampleSize(
        allMeaningExpectCorrect, 3).map((i) => i.Text);

    const mcqOptions = _.shuffle([...incorrectOptions, correctAns]);

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
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
            },
        })

        const receive: FetchedDataType[] = response.data;

        const arr: WordType[] = receive.map((value, index) => {
            const options: string[] = generateMcq(words, index);
            return {
                word: value.translations[0].text,
                meaning: words[index].Text,
                options: options
            }
        });



        return arr
    } catch (error) {
        throw new Error("Some Error")

    }
}



export const fetchAudio = async (
    text: string,
    language: langType
): Promise<string> => {

    const encodedParams = new URLSearchParams({
        src: text,
        r: "0",
        c: "mp3",
        f: "8khz_8bit_mono",
        b64: "true",
    });

    // Here translate code check in site https://www.voicerss.org/
    if (language === "ja") encodedParams.set("hl", "ja-jp");
    else if (language === "es") encodedParams.set("hl", "es-es");
    else if (language === "fr") encodedParams.set("hl", "fr-fr");
    else encodedParams.set("hl", "hi-in");

    const { data }: { data: string } = await axios.post(
        "https://voicerss-text-to-speech.p.rapidapi.com/",
        encodedParams,
        {
            params: { key },
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": rapidKey,
                "X-RapidAPI-Host": "voicerss-text-to-speech.p.rapidapi.com",
            },
        }
    );
    return data;
}