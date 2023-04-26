let xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
        
        let obj = JSON.parse(this.responseText)
        
        let productsEl = document.getElementById("products")
        let html = ""
        for(let i=0;i<obj.length;i++) {
            html += "<div class='col-md-4'>"+"<div class='card'>"
                    + "<img src='"+obj[i].product_image+"'>"
                    +"<div class='card-body'>"
                    +"<h5 class='card-tittle'>"+obj[i].product_name+"</h5>"
                    +"<p>"+"$ "+obj[i].product_price+"</p>"
                    +"<button onclick='add_to_cart("+obj[i].id+")' class='btn btn-primary'>Add to cart</button>"
                    +"<button onclick='see_more("+obj[i].id+")' class='btn btn-info' data-product_id='"+obj[i].id+"' data-bs-toggle='modal' data-bs-target='#seeMoreModal'>See more</button>"

                    +"</div>"+"</div>" + "</div>"
        }

        productsEl.innerHTML = html;
    }
}
let url_api = "https://63e8fefdb120461c6be92c3c.mockapi.io/products"
xhttp.open("GET", url_api, true)
xhttp.send()

function see_more(id) {
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText)
            let tekst = document.querySelector('.modal-body')
            let naslov = document.querySelector('.modal-title')

            tekst.innerHTML = "<h5>"+obj.product_name+"</h5>"
            naslov.innerHTML = "<p>"+obj.product_description+"</p>"
                                    
                                    +"<p><b>Material: </b>"+obj.product_material+"</p>"
                                    +"<p><b>Price: </b> $<i>"+obj.product_price+"</i></p>"
        }
    }
    
    xhttp.open("GET", url_api+"/"+id, true)
    xhttp.send()
}
let already = false, total = 0
function add_to_cart(id) {
    if(already===false) {
        document.querySelector('.myCart').innerHTML = "<div class='row glavni'>"
                                                    +"<div class='col-md-9'><h3>Your cart items</h3></div>"
                                                    +"<div class='col-md-3'><b>Total: </b>$<span class='totalPrice'></span></div>"
                                                    +"</div>"
        already = true;
    }
    
    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let obj = JSON.parse(this.responseText)
            let cart = document.querySelector('.myCart')
            cart.innerHTML += "<div class='row cart-items' id='cart-item"+id+"'>"
                            +"<div class='col-md-4'>"+obj.product_name+"</div>"
                            +"<div class='col-md-3'><b>Material: </b>"+obj.product_material+"</div>"
                            +"<div class='col-md-2'><b>Price: </b>"+obj.product_price+"</div>"
                            +"<div class='col-md-2'><b><button class='btn btn-danger' onclick='remove_from_cart("+id+","+obj.product_price+")'>Remove</button></div>"
                            +"</div>"
            total+=parseFloat(obj.product_price)
            document.querySelector('.totalPrice').innerText = total
        }
    }
    xhttp.open("GET", url_api+"/"+id, true)
    xhttp.send()
}
function remove_from_cart(id, price) {
    document.getElementById('cart-item'+id).remove()
    total-=parseFloat(price)
    document.querySelector('.totalPrice').innerText = total
    if(total === 0) {
        already = false
        document.querySelector('.glavni').innerHTML = ""
    }
    
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }