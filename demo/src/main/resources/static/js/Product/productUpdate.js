const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');

document.getElementById('productID').value = productID;

fetch(`http://localhost:8080/selectById/${productID}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
})
	.then(response => response.json())
	.then(product => {
		fillForm(product);
	})
	.catch(error => console.error('錯誤:', error));

function fillForm(product) {
	const imageSrc = `data:image/png;base64,${product.productImage}`;
	document.getElementById('originalImage').src = imageSrc;
	document.getElementById('productName').value = product.productName;
	document.getElementById('productClass').value = product.productClass;
	document.getElementById('productStatus').value = product.productStatus;
	document.getElementById('productDetail').value = product.productDetail;
	document.getElementById('productPrice').value = product.productPrice;
	document.getElementById('productQuantity').value = product.productQuantity;

	const productDate = new Date(product.productDate);
	const formattedDate = productDate.toISOString().split('T')[0];
	document.getElementById('productDate').value = formattedDate;
}

document.querySelector('.btn-info').addEventListener('click', updateProduct);

function updateProduct(event) {
	console.log('updateProduct called');
	event.preventDefault();

	const productDate = new Date(document.getElementById('productDate').value);
	const isoDateString = productDate.toISOString();

	const updatedProduct = {
		productID: productID,
		productName: document.getElementById('productName').value,
		productClass: document.getElementById('productClass').value,
		productStatus: document.getElementById('productStatus').value,
		productDetail: document.getElementById('productDetail').value,
		productPrice: document.getElementById('productPrice').value,
		productQuantity: document.getElementById('productQuantity').value,
		productImage: document.getElementById('originalImage').src.split(",")[1], // 截取Base64編碼的部分
		productDate: isoDateString
	};

	fetch(`http://localhost:8080/producetUpdate/${productID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedProduct)
	})
		.then(response => response.text())
		.then(data => {
			console.log('Update successful:', data);
			window.location.replace('http://localhost:8080/product/backend_productPut.html');
		})
		.catch(error => console.error('錯誤:', error));
}

document.getElementById('productImage').addEventListener('change', handleImageChange);

function handleImageChange() {
	const selectedImage = document.getElementById('productImage').files[0];
	if (selectedImage) {
		const reader = new FileReader();
		reader.onload = function(event) {
			document.getElementById('originalImage').src = event.target.result;
		}
		reader.readAsDataURL(selectedImage);
	} else {
		const originalImageURL = document.getElementById('originalImage').dataset.originalImage;
		document.getElementById('originalImage').src = originalImageURL;
	}
}


$(document).ready(function() {
	function validateInput(input, errorMsg) {
		if (input.val().trim() === "") {
			errorMsg.show();
		} else {
			errorMsg.hide();
		}
	}

	function validateSelect(select, errorMsg) {
		if (select.val() === "請選擇商品類別") {
			errorMsg.show();
		} else {
			errorMsg.hide();
		}
	}

	function validateRadio(radioName, errorMsg) {
		if ($(`input[name="${radioName}"]:checked`).length === 0) {
			errorMsg.show();
		} else {
			errorMsg.hide();
		}
	}

	function validateFile(input, errorMsg) {
		if (input.get(0).files.length === 0) {
			errorMsg.show();
		} else {
			errorMsg.hide();
		}
	}

	$("#inputGroupSelect01").on("change", function() {
		validateSelect($(this), $(".text-danger:eq(0)"));
	});

	$("input[type='text']").on("input", function() {
		validateInput($(this), $(this).parent().parent().next());
	});

	$("input[type='radio']").on("change", function() {
		validateRadio($(this).attr("name"), $(this).parent().parent().parent().next());
	});

	$("#inputGroupFile01").on("change", function() {
		validateFile($(this), $(this).parent().parent().next());
	});

	$("#floatingTextarea2").on("input", function() {
		validateInput($(this), $(this).parent().parent().next());
	});

	$(".text-danger").each(function() {
		if ($(this).text() !== "") {
			$(this).hide();
		}
	});

	$("#inputGroupFile01").on("change", function() {
		const file = this.files[0];
		const fileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

		if (file && fileTypes.includes(file.type)) {
			$(".text-danger:eq(7)").hide();
		} else {
			$(".text-danger:eq(7)").text("請上傳有效的圖片文件（jpg, png, gif, webp）");
			$(".text-danger:eq(7)").show();
			this.value = "";
		}
	});
});
