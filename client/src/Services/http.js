export default function http(url, data) {
    let request = {
      method: data ? 'POST' : 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    
    if(data) request.body = JSON.stringify(data)
  
    return fetch(url, request)
  
    .then(function(response) {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    });
  
  }
