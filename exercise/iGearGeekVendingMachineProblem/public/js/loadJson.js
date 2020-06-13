productListData = null; // Keep all product from json
totalCoin = 0; // Sum of coin that you inserted
oneCoin = 0; // Number of one baht coin that you inserted
twoCoin = 0; // Number of two baht coin that you inserted
fiveCoin = 0; // Number of five baht coin that you inserted
tenCoin = 0; // Number of ten baht coin that you inserted
changeCoin = [0, 0, 0, 0]; // Number of change coin when you buy product, index of  array from ten baht coin to one baht coin

// Load json data to myObj
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);

        // Append product card to view
        myObj.data.forEach(product => {
            document.getElementById("productList").innerHTML += `
            <div id="${product.name}" data-toggle="modal" data-target="#productModal" onclick="calculateCoin(this.id)" class="position-relative d-inline-block mr-4 ml-3 mt-3 productCard" style="">
            <img src="${product.image}" alt="" class="position-absolute productCardImage" style="">
            <h6 class="position-absolute" style="color: #707070; top: 85%; left: 50%; transform: translate(-50%,-50%); width:90%; text-align: center">${product.name}: ${product.price} Baht</h6>
        </div>
            `;
        });

        productListData = myObj.data;
        checkProductStock() // Check, Is product avaliable in the stock
    }
};
xmlhttp.open("GET", "https://www.mocky.io/v2/5c77c5b330000051009d64c9", true);
xmlhttp.send();


// Detect when click the coin
document
    .getElementById("oneCoin")
    .addEventListener("click", () => insertCoin(1));
document
    .getElementById("twoCoin")
    .addEventListener("click", () => insertCoin(2));
document
    .getElementById("fiveCoin")
    .addEventListener("click", () => insertCoin(5));
document
    .getElementById("tenCoin")
    .addEventListener("click", () => insertCoin(10));


// Keep data when insert coin and display to total coin
function insertCoin(coin) {
    totalCoin = totalCoin + coin;
    document.getElementById("totalCoin").innerHTML = totalCoin.toString();
    if (coin == 1) oneCoin++;
    else if (coin == 2) twoCoin++;
    else if (coin == 5) fiveCoin++;
    else if (coin == 10) tenCoin++;
}

// Calculate coin when select the product
function calculateCoin(product) {
    productListData.forEach(productCheck => {
        if (product == productCheck.name) {
            let productPrice = parseInt(productCheck.price);
            if (productPrice <= totalCoin) {
                change = totalCoin - productPrice;
                while (change > 0) {
                    let coinValue = [10, 5, 2, 1];
                    coinValue.some((coin, index) => {
                        if (change >= coin) {
                            change -= coin;
                            changeCoin[index]++
                            return true
                        }
                    });
                }
                
                // Edit display in Modal to display change
                document.getElementById("productModalContent").innerHTML = `
                <img class="mt-4 w-50 mx-auto" src="/images/youGotModal.svg" alt="">
                <img src="${productCheck.image}" alt="" class="mx-auto mt-4" style="width: 45%; border-radius: 5%">
                <h5 class="mx-auto mt-4 modalFontColor">${productCheck.name}: ${productCheck.price} Baht</h5>
                <h5 class="mx-auto mt-2 modalFontColor">Change:</h5>
                <div class="d-flex mx-auto">
                <h5 class=" mt-2 modalFontColor mr-3">10 ฿ x ${changeCoin[0]}</h5>
                <h5 class=" mt-2 modalFontColor ml-3">5 ฿ x ${changeCoin[1]}</h5>
                </div>
                <div class="d-flex mx-auto">
                <h5 class=" mt-2 modalFontColor mr-3">2 ฿ x ${changeCoin[2]}</h5>
                <h5 class=" mt-2 modalFontColor ml-3">1 ฿ x ${changeCoin[3]}</h5>
                </div>
                `;
                resetCoin()
            }
            else
            {
                // Edit Modal when not enough coins to buy the product
                document.getElementById("productModalContent").innerHTML = `
                <img src="/images/coin.svg" alt="" class="mx-auto mt-5" style="width: 45%; border-radius: 5%">
                <h5 class="mx-auto mt-5 modalFontColor">Not enough coins</h5>
                <h5 class="mx-auto mt-5 w-100 text-center modalFontColor">Please insert coins <br> according to the product price.</h5>
                `;
            }
        }
    });
}

// Detect click refund button
document.getElementById("refund").addEventListener("click", () => refund())

// Calculate coin to refund and display to modal
function refund()
{
    while (totalCoin > 0) {
        let coinValue = [10, 5, 2, 1];
        coinValue.some((coin, index) => {
            if (totalCoin >= coin) {
                totalCoin -= coin;
                changeCoin[index]++
                return true
            }
        });
    }
    // Edit refund modal
    document.getElementById("productModalContent").innerHTML = `
    <img src="/images/coin.svg" alt="" class="mx-auto mt-5" style="width: 45%; border-radius: 5%">
    <h5 class="mx-auto mt-4 modalFontColor">You have been refunded</h5>
    <div class="d-flex mx-auto">
    <h5 class=" mt-4 modalFontColor mr-3">10 ฿ x ${changeCoin[0]}</h5>
    <h5 class=" mt-4 modalFontColor ml-3">5 ฿ x ${changeCoin[1]}</h5>
    </div>
    <div class="d-flex mx-auto">
    <h5 class=" mt-2 modalFontColor mr-3">2 ฿ x ${changeCoin[2]}</h5>
    <h5 class=" mt-2 modalFontColor ml-3">1 ฿ x ${changeCoin[3]}</h5>
    </div>
    `;
    resetCoin()
}

// Reset data from insert coin and change
function resetCoin()
{
    totalCoin = 0;
    oneCoin = 0;
    twoCoin = 0;
    fiveCoin = 0;
    tenCoin = 0;
    changeCoin = [0, 0, 0, 0];
    document.getElementById("totalCoin").innerHTML = totalCoin.toString();
}

// check, Is product avaliable in stock and display soldout when the product unavaliable
function checkProductStock()
{
    productListData.forEach(product => {
        if(product.in_stock == false)
        {
            document.getElementById(product.name).setAttribute("class", "soldoutCardImage position-relative d-inline-block mr-4 ml-3 mt-3")
            document.getElementById(product.name).innerHTML = `
            
            <img src="${product.image}" alt="" class="position-absolute productCardImage" style="">
            <h6 class="position-absolute" style="color: #707070; top: 85%; left: 50%; transform: translate(-50%,-50%); width:90%; text-align: center">${product.name}: ${product.price} Baht</h6>
            <img src="/images/soldoutTag.svg" alt="" style="top: 40%; left: 12%" class="position-absolute w-75 ">
            `
        }
    });
}

