import { menuArray } from "/data.js"
let order = []

const totalPriceDom =  document.getElementById("OrderTotalPrice")
const orderItemsSection = document.getElementById("orderItemsSection")

const paymentModal = document.getElementById("paymentModal")
const form = paymentModal.querySelector("form")

const originalModalHtml = paymentModal.innerHTML

/*document.addEventListener("click", (e)=> {
    console.log(e.target.dataset)
   if (e.target.dataset.add){
    addItem(parseInt(e.target.dataset.add))
   } 
   if (e.target.dataset.remove){
    removeItem(parseInt(e.target.dataset.remove))
   } 
   

    }
    
)*/

document.addEventListener("click", (e) => {
    const action = e.target.dataset.action

    if (!action) return

    if (action === "add") {
        addItem(parseInt(e.target.dataset.id))
    }

    if (action === "remove") {
        removeItem(parseInt(e.target.dataset.index))
    }

    if (action === "complete") {
        document.getElementById("paymentModal").classList.remove("hidden")
    }
    if (action === "close") {
        document.getElementById("paymentModal").classList.add("hidden")
    }
})


function handleSubmit(e) {
    e.preventDefault()

    const name = document.getElementById("name").value

    paymentModal.innerHTML = `
        <div class="success-state">
            <div class="checkmark">✔</div>
            <p>Thanks ${name}! Your order is on its way 🚀</p>
        </div>
    `

    order = []
    renderOrder()

    setTimeout(() => {
        paymentModal.innerHTML = originalModalHtml
        paymentModal.classList.add("hidden")

        // volver a enganchar el form correctamente
        const newForm = paymentModal.querySelector("form")
        newForm.addEventListener("submit", handleSubmit)

    }, 2500 , console.log("timeout ejecutado"))
}



form.addEventListener("submit", handleSubmit)
const container = document.getElementById("itemList")

const getItems = menuArray.map(item => {
   let itemHtml = `
   
        <div class = "item" id="${item.id}"> 

                    <div>
                        <h2>${item.name}</h2>
                        <p>${item.ingredients}</p>
                        <p>$${item.price}</p>
                    </div>

                    
                        <button data-action="add" data-id="${item.id}"> + </button>
                        
            </div>
        
        `
    return itemHtml

}).join("");

const addItem = (selectedId)=>{

    const selectedItem = menuArray.find(item => item.id === selectedId)
     
    order.push(selectedItem)
    
    renderOrder()
    document.getElementById("orderItemsSection").classList.remove('hidden')
    
    
}


const renderOrder = () =>{

    const itemComponent = order.map( (item,index) => {
       
        let itemOrderHtml = `

            <div class="item">

                <h3>${item.name}</h3>
                <p>$${item.price}</p>
                
                <button data-action="remove" data-index="${index}"> remove </button>
                </div>
        `
         console.log(index)
        return itemOrderHtml
  
        
    }).join("")



    document.getElementById("itemsOrderList").innerHTML = itemComponent
    



    const total = order.reduce((sum, currentValue) => {
         
       return sum+currentValue.price
    },0)

     totalPriceDom.innerHTML = `Total: $${total}`
     if (order.length === 0 ) {
        orderItemsSection.classList.add("hidden")
     }
    
}





const removeItem = (selectedElement) => {
    
    const newOrder = order.filter( (item, index )=>{
       return index !== selectedElement  
    })
    console.log(newOrder)
    order = newOrder
    
    renderOrder()
  
}

    



    


container.innerHTML=getItems