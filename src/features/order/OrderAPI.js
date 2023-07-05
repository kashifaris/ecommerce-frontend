// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders',{
      method: 'POST',
      body: JSON.stringify(order),
      headers: {'content-type':'application/json'}
    }) 
    const data= await response.json()
    resolve({data}); 
});
}

export function fetchAllOrders(sort,pagination) {
  let querryString= '';
  
  for(let key in sort ){
    querryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination ){
    querryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders?"+querryString) 
    const data= await response.json()
    const totalOrders = await response.headers.get('X-Total-Count')
    resolve({data:{orders:data,totalOrders:totalOrders}}); 
});
}

export function updateOrder(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/'+update.id,{
      method: 'PATCH',
      body: JSON.stringify(update),
      headers:{'content-type': 'application/json'}
    }) 
    const data= await response.json()
    resolve({data}); 
});
}
