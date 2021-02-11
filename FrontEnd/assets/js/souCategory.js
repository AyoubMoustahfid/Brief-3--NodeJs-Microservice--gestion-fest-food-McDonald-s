
// =================== Start Script : Method Affiche All Sous Category ======================
async function getSouCategory() {
    try {
        var urlString = window.location.search;
        var urlParam = new URLSearchParams(urlString);
        const id = urlParam.get('id');
        console.log(id);
        
        const resSouCategory = await axios.get(`http://localhost:3000/api/souCategory/${id}`);
        // console.log(resSouCategory.data.souCategories[0].name);
        console.log(resSouCategory.data[0].name);

        var row = "";
        for (let i = 0; i < resSouCategory.data.length; i++) {
            row = `
             <div class="col-4">
             <a class="list-group-item list-group-item-action my-1" id="list-home-list" href="product.html?id=${resSouCategory.data[i]._id}">${resSouCategory.data[i].name}</a>
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

