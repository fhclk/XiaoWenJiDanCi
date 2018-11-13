import querystring from 'querystring';
// import RNFetchBlob from 'react-native-fetch-blob'

export const baseUrl = 'http://120.78.192.67:8839/';
// export const baseUrl = 'http://127.0.0.1:5000/';

export function get(url,params=""){
  let header={
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if(url.substr(0,4) != 'http'){
    url =baseUrl+ url+'?'+querystring.stringify(params);
  }else{
    url = url+'?'+querystring.stringify(params);
  }

  return new Promise(function(resolve,reject){
    fetch(url,{
      method: 'GET',
      mode: "cors",
      headers: header,
    })
        .then((response)=>{
            // if(response.success){
            //   return response.json()
            // }
            return response.json()
        })
        .then((resJson)=>{
            resolve(resJson);
        })
        .catch((err)=>{
            console.log('返回数据类型错误');
            reject(err);
        })
  })
}


export function post(url,params=""){
  let header={
      // 'Accept': 'application/json',
    "Content-Type": "application/json;charset=UTF-8",
  };
  console.log('params:>>' + JSON.stringify(params));

  url = url.substr(0,4) != 'http'? baseUrl+ url:url;
  return new Promise(function(resolve,reject){
    fetch(url,{
      method:'POST',
      mode: "cors",
      headers:header,
      body:params?JSON.stringify(params):""
    })
      .then((response)=>{

        // if(response.success){
        //   return response.json()
        // }
          return response.json()
      })
      .then((resJson)=>{
        console.log(resJson);
        resolve(resJson);
      })
      .catch((err)=>{
        console.log('返回数据类型错误');
          reject(err);
    })
  })
}


