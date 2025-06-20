import axios from "axios"

type ArchiveType = "error"|"function"|"event"

export const requestAbi = async (type:ArchiveType,index1:string,index2:string) => {
    const url = getArchiveUrl(type,index1,index2)
    const request = await httpGet(url)
    return {abi:request.data,url}
}

const httpGet = async (url:string) => {
    return await axios.get(url)
}

const getArchiveUrl = (type:ArchiveType,index1:string,index2:string) => {
    return `https://raw.githubusercontent.com/imelon2/abi-archive/refs/heads/main/archive/${type}/${index1}/${index2}/abi.json`
}