// A mock function to mimic making an async request for data
export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products/'+id) 
    const data= await response.json()
    resolve({data}); 
});
}

export function AddProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products',{
    method: "POST",
    body: JSON.stringify(product),
    headers: { "content-type": "application/json" },
  }); 
    const data= await response.json()
    resolve({data}); 
});
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/products') 
    const data= await response.json()
    resolve({data}); 
});
}


export function fetchProductsByFilters(filter,sort,pagination) {
  //filter= {category:[smartphone,laptop]}
  //sort = {_sort:'price',_order:'desc}
  let querryString= '';
  for(let key in filter){
    const categoryValues= filter[key];
    if(categoryValues.length){
      const lastCategoryValue=categoryValues[categoryValues.length-1]
      querryString += `${key}=${lastCategoryValue}&`
    }
    
  }

  for(let key in sort ){
    querryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination ){
    querryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    const response = await fetch("/products?"+querryString) 
    const data= await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({data:{products:data,totalItems:totalItems}}); 
});
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands') 
    const data= await response.json()
    resolve({data}); 
});
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/categories') 
    const data= await response.json()
    resolve({data}); 
});
}

