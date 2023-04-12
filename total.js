function saveToserver(event) {
    event.preventDefault();
    //Saving the data input of 3 fields, inside variables
    const name = document.getElementById('nameInput').value;
    const price = document.getElementById('price').value;


    //Creating object of Particular variables
    const obj = {
        name,
        price
    }

    axios.post("https://crudcrud.com/api/c8d2f0e3c31d4bee88921cf12f81a134/productlist", obj)
        .then((response) => {
            console.log(response);
            displayItems();
            displaycost();
            window.location.reload();
            event.target.reset();
        }).catch((err) => {
            console.log(err);
        });


}

async function displayItems() {
    let ul = document.getElementById("listOfitems");
    ul.innerHTML = '';


    try {
        const response = await axios.get("https://crudcrud.com/api/c8d2f0e3c31d4bee88921cf12f81a134/productlist");
        const list = response.data;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            let li = document.createElement("li");

            let dltBtn = document.createElement('button');

            dltBtn.innerText = 'Delete';
            dltBtn.id = 'dltname';
            dltBtn.onclick = async () => {
                try {
                    await axios.delete(`https://crudcrud.com/api/c8d2f0e3c31d4bee88921cf12f81a134/productlist/${item._id}`);
                    ul.removeChild(li);
                    window.location.reload();
                } catch (err) {
                    console.log(err);
                }
            };


            li.textContent = `Product Name : ${item.name}  -----  Product Price : ${item.price}  `;

            li.appendChild(dltBtn);
            ul.appendChild(li);

        }
    } catch (err) {
        console.log(err);
    }
  
}
async function displaycost() {
    let totalul = document.getElementById('totalcost');
    let li = document.createElement("li");
    totalul.innerHTML = "";
    let sum = 0;
    try {
      const response = await axios.get("https://crudcrud.com/api/c8d2f0e3c31d4bee88921cf12f81a134/productlist");
      const list = response.data;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        sum += Number(item.price);
      }
      li.textContent = "Total cost: " + sum;
      totalul.appendChild(li);
    }
    catch (err) {
      console.log(err)
    }
  }
  



document.addEventListener('DOMContentLoaded', () => {
    displayItems();
    displaycost();
});