
const serverHost = 'http://127.0.0.1:5000/'

const API = {
    youdao: {
        wordTranslate: (word) => 'http://fanyi.youdao.com/openapi.do?keyfrom=youdaoci&key=694691143&type=data&doctype=json&version=1.1&q=' + word,
    },

    words: {
        cet4Words: 'api/v1.0/getCET4Words',
        cet4WordsClassy: 'api/v1.0/getCET4WordByClassify',
        newWords: 'api/v1.0/getNewWord',
    },

}

export default API;