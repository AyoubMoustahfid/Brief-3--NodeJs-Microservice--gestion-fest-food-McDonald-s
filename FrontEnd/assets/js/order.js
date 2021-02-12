// --------------get commande detile from local storage ------------------------------


let xcart =  JSON.parse(localStorage.getItem("cart"));
let total = localStorage.getItem("total");
let table = document.getElementById('tabFacture');
let totalContainner = document.getElementById('total');







console.log(xcart[0]);

var html = ""
for (let i = 0; i < xcart.length; i++) {

    html= ` <tr>
    <td>
        <div class="row">
            <div class="col-2">
                <img src="http://localhost:3000/api/product/photo/${xcart[i]._id}" alt="" width="100px" height="100%">
            </div>
            <div class="col-8">
                <p>${xcart[i].name}</p>
            </div>
        </div>
    </td>
    <td>${xcart[i].price} DH</td>
    <td>${xcart[i].amount}</td>
    <td>${total[i].total} DH</td>
    <td>${total[i].table}</td>
    <td>Master Card</td>
    <td>Undifined</td>
</tr>
`
document.getElementById('tbody').innerHTML += html
}