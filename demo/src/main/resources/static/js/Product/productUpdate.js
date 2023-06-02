const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('id');

document.getElementById('productID').value = productID;

fetch(`http://localhost:8080/ski/productSelectByID?productID=${productID}`, {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json'
	}
})
	.then(response => response.json())
	.then(data => {
		fillForm(data[0]);
	})
	.catch((error) => console.error('錯誤:', error));

function fillForm(product) {
    const base64Image = btoa(new Uint8Array(product.productImage).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const imageSrc = `data:image/png;base64,${base64Image}`;
    document.getElementById('originalImage').src = imageSrc;
    document.getElementById('originalImage').dataset.originalImage = base64Image; // 將 base64 數據賦值給 data-original-image 屬性
    document.getElementById('productName').value = product.productName;
    document.getElementById('productClass').value = product.productClass;
    document.getElementById('productStatus').value = product.productStatus;
    document.getElementById('productDetail').value = product.productDetail;
    document.getElementById('productPrice').value = product.productPrice;
    document.getElementById('productQuantity').value = product.productQuantity;
    
    const productDate = new Date(product.productDate);
    const formattedDate = productDate.toLocaleDateString("en-CA"); // 使用 "en-CA" 作為語言代碼
    document.getElementById('productDate').value = formattedDate;
}

document.querySelector(".btn-info").addEventListener("click", updateProduct);

function base64ToBlob(base64) {
	var binary = atob(base64);
	var bytes = new Uint8Array(binary.length);
	for (var i = 0; i < binary.length; i++) {
		bytes[i] = binary.charCodeAt(i);
	}
	return new Blob([bytes], { type: 'image/png' });
}

function updateProduct(event) {
    console.log("updateProduct called");
    event.preventDefault();
    // 從表單獲取新的商品資訊
    const updatedProduct = new FormData(document.getElementById('productForm'));
    updatedProduct.append("productClass", document.getElementById('productClass').value);
    updatedProduct.append("productName", document.getElementById('productName').value);
    updatedProduct.append("productStatus", document.getElementById('productStatus').value);
    updatedProduct.append("productDetail", document.getElementById('productDetail').value);
    updatedProduct.append("productPrice", document.getElementById('productPrice').value);
    updatedProduct.append("productQuantity", document.getElementById('productQuantity').value);
   
    // 將商品圖片也加入 FormData 中
    let productImage = document.getElementById('productImage').files[0];
    if (!productImage) {
        const originalBase64 = document.getElementById("originalImage").dataset.originalImage; // 獲取 originalBase64 的值
        if (typeof originalBase64 === 'undefined') {
            console.error("原始圖片的URL格式不正確，無法提取base64數據。");
            return;
        }
        const cleanedBase64 = originalBase64.replace(/(\r\n|\n|\r)/gm, "");
        const blob = base64ToBlob(cleanedBase64, 'image/png');
        productImage = new File([blob], 'productImage.png', { type: blob.type });
    }

    updatedProduct.append("productImage", productImage);

    // 向後端 API 發送更新請求
    fetch(`http://localhost:8080/ski/productUpdate`, {
        method: 'POST', // 或是其他適合的 HTTP 方法，如 PUT
        body: updatedProduct // 使用 FormData 物件，不需指定 headers
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('網路連線錯誤，請稍後再試');
        }
        return response.text();
    })
    .then(data => {
        // 更新成功，導向商品管理頁面
         window.location.replace("http://localhost:8080/ski/product/backend_productPut.html");
    })
    .then(text => console.log(text))
    .catch((error) => console.error('錯誤:', error));
}


document.getElementById("productImage").addEventListener("change", handleImageChange);

function handleImageChange() {
	const selectedImage = document.getElementById("productImage").files[0];
	if (selectedImage) {
		const reader = new FileReader();
		reader.onload = function(event) {
			document.getElementById("originalImage").src = event.target.result;
			document.getElementById("originalImage").dataset.originalImage = event.target.result;
		}
		reader.readAsDataURL(selectedImage);
	} else {
		const originalImageURL = document.getElementById("originalImage").dataset.originalImage;
		document.getElementById("originalImage").src = originalImageURL;
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
