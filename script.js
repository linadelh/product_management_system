

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create" ; 
let temp ; 

// get total function 

function getTotal(){
    if(price.value !== ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
        total.innerHTML = result ; 
        total.style.background ="#040";
    }else {
          total.innerHTML = "" ;
          total.style.background = "rgb(195, 13, 0)";
    }
}

// create product

const deleteall = document.getElementById("deleteall");

let dataPro;
if (localStorage.getItem("product")) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

submit.onclick = function (){
  let newPro = {
    title : title.value ,
    price : price.value , 
    taxes : taxes.value ,
    ads : ads.value , 
    discount : discount.value , 
    total : total.innerHTML , 
    count : count.value , 
    category : category.value , 
  }

  if(mood === "create"){
   if(newPro.count>1){
  for (let i = 0 ; i < newPro.count ; i++){
        dataPro.push(newPro);
  }
}else{
    dataPro.push(newPro);
}
  }else{
     dataPro[temp]= newPro; 
  }

  localStorage.setItem("product" , JSON.stringify(dataPro)); 
  console.log(dataPro); 
   clearData();
   showData();
}


// clear inputs 
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    count.value="";
    total.innerHTML ="";
    discount.value ="";
    category.value="";
}

// read 
function showData(){
     let table = '';
     for (let i = 0 ; i < dataPro.length ; i++){

        table += `
          <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td> 
               </tr>
     ` ;

     }
     document.getElementById('tbody').innerHTML = table ; 
     if(dataPro.length !== 0 ){
    deleteall.style.display ="block" ; 
       }else {
    deleteall.style.display ="none" ; 
       }

       let totaldelete = dataPro.length ; 
       deleteall.innerHTML = `delete all (${totaldelete})`;
}

showData(); 

// delete 
function deleteData(i){
  console.log(i);
  dataPro.splice(i , 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// update 
function updateData(i){
      title.value = dataPro[i].title ; 
      price.value = dataPro[i].price ; 
      taxes.value = dataPro[i].taxes ; 
      ads.value = dataPro[i].ads ; 
      discount.value = dataPro[i].discount ; 
      getTotal() ;
      category.value = dataPro[i].category ; 
      count.style.display ="none" ; 
      submit.innerHTML ="update" ; 
      mood ="update";
      temp = i ; 
     
}





// deleteall
function deleteAll(){
        localStorage.clear(); 
        dataPro.splice(0,dataPro.length); 
        showData();
}
















// search 

// cleandata