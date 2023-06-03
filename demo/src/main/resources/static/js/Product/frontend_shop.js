function createAndAttachModal(productDiv, uniqueModalId) {
    const uniqueModalLabel = 'staticBackdropLabel' + uniqueModalId.replace('staticBackdrop', '');

    // Create modal HTML
    const modalHtml = `
    <div class="modal fade" id="${uniqueModalId}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="${uniqueModalLabel}" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="${uniqueModalLabel}"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    已加入購物車成功
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>  
    `;

    // Attach modal to product div
    productDiv.innerHTML += modalHtml;
}

// Helper function to create product element
function createProductElement(product) {
    return fetch(`http://localhost:8080/loadImage?productID=${product.productID}`)
        .then(response => response.json())
        .then(imageData => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('col-3');
            productDiv.classList.add('p-2');

            if (product.productStatus === "下架中") {
                productDiv.classList.add('hidden');
            }

            const uniqueModalId = 'staticBackdrop' + product.productID;


            const productHtml = `
      	<div class="card text-center">
        <a href="http://localhost:8080/product/frontend_productDetail.html?productID=${product.productID}">
        <img src="data:image/png;base64,${imageData.imageData}" alt="商品圖片" style="height: 100px">
         
          <div class="card-body">
              <div class="productName">${product.productName}</div>
              <div class="productPrice">${product.productPrice}元</div>
              </a>
          </div>
          <div class="card text-center">
            <!-- ...其他程式碼... -->
    			 <button class="btn btn-info add-to-cart" data-bs-toggle="modal" data-bs-target="#${uniqueModalId}">加入購物車</button>
          </div>
	  </div>
      `;

            productDiv.innerHTML = productHtml;

            createAndAttachModal(productDiv, uniqueModalId);

            return productDiv;
        });
}



function displayAllProducts() {
	fetch('http://localhost:8080/productsGetAll')
		.then(response => response.json())
		.then(data => {
			const productContainer = document.getElementById('productContent');
			productContainer.innerHTML = '';

			let promises = data.map(createProductElement);

			Promise.all(promises).then(productElements => {
				productElements.forEach(element => {
					productContainer.appendChild(element);
				});
			});
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation: ', error);
		});
}

function searchProduct(searchTerm) {
	var url = "http://localhost:8080/productSelectByName?productName=" + searchTerm;

	fetch(url)
		.then(response => response.json())
		.then(data => {
			const productContainer = document.getElementById('productContent');
			productContainer.innerHTML = '';

			let promises = data.map(createProductElement);

			Promise.all(promises).then(productElements => {
				productElements.forEach(element => {
					productContainer.appendChild(element);
				});
			});
		})
		.catch(error => {
			console.log(error);
		});
}

document.addEventListener('DOMContentLoaded', () => {
	displayAllProducts();

	$(".search-bar").keypress(function(event) {
		if (event.which === 13) {
			event.preventDefault();
			var searchTerm = $(".search-bar").val();
			searchProduct(searchTerm);
		}
	});

	$(".search").click(function() {
		var searchTerm = $(".search-bar").val();
		searchProduct(searchTerm);
	});

	const productClassButtons = document.querySelectorAll('.ProductClass');

	productClassButtons.forEach(button => {
		button.addEventListener('click', () => {
			const productClass = button.innerText.trim();

			fetch(`http://localhost:8080/productSelectByClass/${productClass}`)
				.then(response => response.json())
				.then(data => {
					const productContainer = document.getElementById('productContent');
					productContainer.innerHTML = '';

					let promises = data.map(createProductElement);

					Promise.all(promises).then(productElements => {
						productElements.forEach(element => {
							productContainer.appendChild(element);
						});
					});
				})
				.catch(error => {
					console.error('There has been a problem with your fetch operation: ', error);
				});
		});
	});

	const allProductsButton = document.querySelector('#allProductsButton');
	allProductsButton.addEventListener('click', () => {
		displayAllProducts();
	});
});

document.addEventListener('keyup', function(event) {
	if (event.key === 'Enter') {
		var searchTerm = $(".search-bar").val();
		searchProduct(searchTerm);
	}
});
