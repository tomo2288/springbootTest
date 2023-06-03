function increment() {
    document.getElementById('quantity').stepUp();
}

function decrement() {
    document.getElementById('quantity').stepDown();
}

// 取得URL中的productID參數
const urlParams = new URLSearchParams(window.location.search);
const productID = urlParams.get('productID');

document.getElementById('productID').value = productID;

fetch(`http://localhost:8080/selectById/${productID}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                console.error('Response status:', response.status);
                console.error('Response text:', text);
                throw new Error('Response was not ok');
            });
        }
        return response.json();
    })
    .then(data => {
        const product = data;
        // 將資訊填入表單
        document.getElementById('productName').textContent = product.productName;
        document.getElementById('productDetail').textContent = product.productDetail;
        document.getElementById('productPrice').textContent = `價格：${product.productPrice}元`;

        // 將圖片填入 img 元素
        if (product.productImage) {
            const imageSrc = `data:image/png;base64,${product.productImage}`;
            document.querySelector('.img-thumbnail').src = imageSrc;
        }
    })
    .catch((error) => console.error('錯誤:', error));
