let title = document.getElementById(`title`)
let price = document.getElementById(`price`)
let taxes = document.getElementById(`taxes`)
let ads = document.getElementById(`ads`)
let discount = document.getElementById(`discount`)
let total = document.getElementById(`total`)
let count = document.getElementById(`count`)
let category = document.getElementById(`category`)
let create = document.getElementById(`create`)

let mood = "create"
let ii;




/*sum*/

function sum(){
    if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    total.innerHTML = result
    total.style.backgroundColor = "green"
    }
    else{
        total.style.backgroundColor = "rgb(76, 9, 9)"
    }
}


// create Object

let arr =[];
if (localStorage.product != null){
    arr = JSON.parse(localStorage.product)
}else{
    let arr = []
}




create.addEventListener("click" , function(){
    let product = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }



    if(title.value != "" && price.value != "" && category.value != "" && count.value < 100){
        if(mood === "create"){
            if(product.count > 1){
                for(i = 0; i < product.count; i++){
                    arr.push(product)
                }
            }else{
                arr.push(product)
            }
        }else{
            arr[  ii   ] = product
            create.innerHTML = "create"
            count.style.display = "block"
        }
        clearData()
    }
    localStorage.setItem("product" , JSON.stringify(arr))
    showdata()
})


// clear data
function clearData(){
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    total.innerHTML = ""
    count.value = ""
    category.value = ""
    total.style.backgroundColor = "rgb(76, 9, 9)"
}




// show data
function showdata(){
    let table = ''
    for(i=0; i<arr.length; i++){
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td onclick=updateData(${i})><button>update</button></td>
        <td onclick=deletedata(${i})><button>delete</button></td>
        </tr> 
        `
    }
    document.getElementById(`tbody`).innerHTML = table
    if(table.length > 0){
        document.getElementById("clear").innerHTML = `<button id="clear" onclick=deleteAll()>delete All ( ${arr.length} ) </button>`
    }else{
        document.getElementById("clear").innerHTML = ''
    }
}
showdata()

// delete data 

function deletedata(i){
    arr.splice(i , 1)
    localStorage.product = JSON.stringify(arr)
    showdata()
}

//delete All
function deleteAll(){
    localStorage.clear()
    arr.splice(0)
    showdata()
}

// update data 
function updateData(i){
    title.value = arr[i].title
    price.value = arr[i].price
    taxes.value = arr[i].taxes
    ads.value = arr[i].ads
    discount.value = arr[i].discount
    category.value = arr[i].category
    count.style.display = "none"
    create.innerHTML = "Update"
    mood = "update"
    ii = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
    sum()
}

// search data 
let searchMood = "title"
let search = document.getElementById("search")

function getMood(id){
    if(id == "title"){
        searchMood = "title"
    }else{
        searchMood = "category"
    }
    search.placeholder = `Search By ${searchMood}`
    search.focus()
    search.value = ""
    showdata()
}

function searchData(value){
    let table = ``
    if(searchMood == "title"){
        for(i=0; i< arr.length; i++){
            if(arr[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].category}</td>
                <td onclick=updateData(${i})><button>update</button></td>
                <td onclick=deletedata(${i})><button>delete</button></td>
                </tr> 
                `
            }
        }
    }
    else{
        for(i=0; i< arr.length; i++){
            if(arr[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i}</td>
                <td>${arr[i].title}</td>
                <td>${arr[i].price}</td>
                <td>${arr[i].taxes}</td>
                <td>${arr[i].ads}</td>
                <td>${arr[i].discount}</td>
                <td>${arr[i].total}</td>
                <td>${arr[i].category}</td>
                <td onclick=updateData(${i})><button>update</button></td>
                <td onclick=deletedata(${i})><button>delete</button></td>
                </tr> 
                `
            }
        }
    }
    document.getElementById(`tbody`).innerHTML = table
}














