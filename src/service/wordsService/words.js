import {post,get} from '../httpBase'

//获取四级词汇
export function getCet4Words(params){
    return post('api/v1.0/getCET4Words',params)
}

//修改四级词汇
export function getCet4WordsClassy(param){
    return post('api/v1.0/getCET4WordByClassify',param)
}


//获取生词库
export function getNewWords(param){
    return post('api/v1.0/getNewWord',param)
}

//获取口腔学词汇
export function getStomatologyWords(param){
    return post('api/v1.0/getStomatologyWords',param)
}

export function addNewWord(param){
    return post('api/v1.0/addNewWord',param)
}
