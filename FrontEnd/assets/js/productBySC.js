async function getProductBySCId() {
    try {
        var urlString = window.location.search;
        var urlParam = new URLSearchParams(urlString);
        var id = urlParam.get('id');
        console.log(id);
        const response = await axios.get(`http://localhost:3000/api/product/${id}`);
        console.log(response.data[0]);

        var row = "";
        for (let i = 0; i < response.data.length; i++) {
            row = `
            <div class="col-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                <div class="card" style="width: 100%">
                    <img src="http://localhost:3000/api/product/photo/${response.data[i]._id}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${response.data[i].name}</h5>
                <p class="card-text">${response.data[i].description}</p>
                <div class="row">
                    <div class="col-12 d-grid">
                        <a href="#" class="btn btn-primary">${response.data[i].price} DH</a>
                    </div>

                </div>
                <div class="col-12 my-3">
                    <div class="d-grid">
                        <a type="submit" class="btn btn-dark mt-3" id="submit" href="cart.html?id=${response.data[i]._id}"><i class="fal fa-shopping-cart"></i>ADD TO CART</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
            document.getElementById("card").innerHTML += row;
        }      

    } catch (error) {
        console.error(error);
    }
}

getProductBySCId();



// ===================== Select product to cart =================

async function getProductToCart() {
    try {
        let urlString = window.location.search;
        let urlParam = new URLSearchParams(urlString);
        let id = urlParam.get('id');
        console.log(id);
        const response = await axios.get(`http://localhost:3000/api/product/cart/${id}`);
        console.log(response.data[0]);

        var row = "";
        for (let i = 0; i < response.data.length; i++) {

            row = `
            <tr>
            <td>
                <div class="row">
                    <div class="col-4">
                        <img src="http://localhost:3000/api/product/photo/${response.data[i]._id}" alt="" width="100%" height="100%">
                    </div>
                    <div class="col-8 d-flex align-items-center">
                        <p>${response.data[i].name}</p>
                    </div>
                </div>
            </td>
            <td class="price">${response.data[i].price} DH</td>
            <td>${response.data[i].quantity}</td>
            <td>
              <input type="text" name="" id="" class="form-control">
            </td>
            <td class="total">${response.data[i].price * response.data[i].quantity} DH</td>
            <td>
                <div class="row justify-content-center">
                <div class="col-12 ">
                <div class="cadre cadre-success py-3 px-2"><i class="fas fa-save"></i></div>
            </div>
                </div>
            </td>
        </tr>
            `
            document.getElementById("tbody").innerHTML += row;

            const point = 10;
            const dirhame = 2;


            var input2 = parseInt(price.innerText)

            if(input2 > 7 && input2 < 20){
              console.log(((5 * dirhame) / point) - (response.data[i].price * response.data[i].quantity) + " " + "DH");
              var html = ((5 * dirhame) / point) - total + " " + "DH" 
              total.innerHTML = html
            }else if(input2 > 21 && input2 < 47){
                console.log(((12 * dirhame) / point) - total + " " + "DH");
                var html = ((5 * dirhame) / point) - total + " " + "DH";
                total.innerHTML = html
            }else{
                console.log(((20 * dirhame) / point) - total + " " + "DH");
                var html = ((20 * dirhame) / point) - total + " " + "DH";
                total.innerHTML = html
            }
        }

    } catch (error) {
        console.error(error);
    }
}

getProductToCart();