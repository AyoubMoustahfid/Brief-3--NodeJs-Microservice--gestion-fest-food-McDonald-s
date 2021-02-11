// =================== Start Script : Method Affiche All Produt ======================
async function getProduct() {
    try {
        const response = await axios.get('http://localhost:3000/api/product');
        console.log(response.data.products[0].name);
        console.log(response.data.products[2].category.name);

        var row = "";
        //<div class="col-12 col-md-4 col-lg-4 col-xl-3 mb-2" data-category="${response.data.products[i].category.name}" data-souCategory="${response.data.products[i].souCategory.name}">
        for (let i = 0; i < response.data.products.length; i++) {
            row = `
            <div class="col-12 col-md-4 col-lg-4 col-xl-4 mb-2">
                <div class="card" style="width: 100%">
                    <img src="http://localhost:3000/api/product/photo/${response.data.products[i]._id}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${response.data.products[i].name}</h5>
                <p class="card-text">${response.data.products[i].description}</p>
                <div class="row">
                    <div class="col-6 d-grid">
                        <a href="#" class="btn btn-primary">${response.data.products[i].price} DH</a>
                    </div>
                    <div class="col-6 d-grid">
                        <a href="#" class="btn btn-primary">${response.data.products[i].category.name}</a>
                    </div>
                </div>
                <div class="col-12 my-3">
                    <div class="d-grid">
                            <button type="submit" class="btn btn-dark mt-3">
                                <i class="fal fa-shopping-cart"></i>
                                ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
            document.getElementById("row").innerHTML += row;
        }



    } catch (error) {
        console.error(error);
    }
}

getProduct();

// =================== End Script : Method Affiche All Produt ======================

// =================== Start Script : Method Affiche All Category ======================

//  +++++++++++++++++++ Category page produt +++++++++++++++++
async function getCategory() {
    try {
        const resCategory = await axios.get('http://localhost:3000/api/category/');
        // console.log(resCategory.data.categories[0].name);

        var row = "";
        for (let i = 0; i < resCategory.data.categories.length; i++) {
            console.log(resCategory.data.categories[i].name);
            row = `
            <div class="card">
            <div class="card-body">
            <div class="row">
             <div class="col-10">
             <h5 class="card-title">${resCategory.data.categories[i].name}</h5>
             </div>
             <div class="col-2">
             <a style="    text-decoration: none;" href="souCategory.html?id=${resCategory.data.categories[i]._id}" class="card-link fas fa-arrow-right"></a>

             </div>
            </div>
            </div>
          </div>
            `
            document.getElementById("category").innerHTML += row;

        }



    } catch (error) {
        console.error(error);
    }
}

getCategory()

// ++++++++++++++++ category page souCategory +++++++++++

async function getCategory2() {
    try {
        const resCategory = await axios.get('http://localhost:3000/api/category/');
        // console.log(resCategory.data.categories[0].name);

        var row = "";
        for (let i = 0; i < resCategory.data.categories.length; i++) {
            console.log(resCategory.data.categories[i].name);
            row = `
            <div class="card">
            <div class="card-body">
            <div class="row">
             <div class="col-10">
             <h5 class="card-title">${resCategory.data.categories[i].name}</h5>
             </div>
             <div class="col-2">
             <a style="    text-decoration: none;" href="souCategory.html?${resCategory.data.categories[i]._id}" class="card-link fas fa-arrow-right"></a>

             </div>
            </div>
            </div>
          </div>
            `
            document.getElementById("category2").innerHTML += row;

        }



    } catch (error) {
        console.error(error);
    }
}

getCategory2()



// =================== End Script : Method Affiche All Category ======================

// =================== Start Script : Method Affiche All Sous Category ======================
async function getSouCategory() {
    try {
        const resSouCategory = await axios.get('http://localhost:3000/api/souCategory/');
        console.log(resSouCategory.data.souCategories[0].name);
        // console.log(response.data);

        var row = "";
        //<option value="" data-souCategory="${response.data.products[i].souCategory.name}">${resSouCategory.data.souCategories[i].name}</option>
        for (let i = 0; i < resSouCategory.data.souCategories.length; i++) {
            row = `
             <div class="col-4">
             <a class="list-group-item list-group-item-action my-1" id="list-home-list" href="#">${resSouCategory.data.souCategories[i].name}</a>
             </div>
            `
            document.getElementById("souCategory").innerHTML += row;
        }
        


    } catch (error) {
        console.error(error);
    }
}

getSouCategory()

// =================== End Script : Method Affiche All Sous Category ======================
