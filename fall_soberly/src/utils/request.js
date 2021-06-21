//默认导出
export default function request(method,url,body) {
  if (method==="GET"){
    body=undefined;
  }else {
    body=body&&JSON.stringify(body);
  }
  return fetch(url,{
    method,
    headers:{
      'Content-Type':'application/json',
    },
    body
  })
      .then(res=>res.json())
}
export const get=(url)=>request('GET',url);
export const post=(url,body)=>request('POST',url,body);
export const put=(url,body)=>request('PUT',url,body);
export const del=(url,body)=>request('DELETE',url,body);
