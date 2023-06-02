//頁面加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
  // 獲取商品數據並渲染表格
  fetchProducts();

  // 為刪除按鈕綁定事件
  // 為修改按钮也绑定事件
  document.getElementById('productTableBody').addEventListener('click', function(event) {
    if (event.target.classList.contains('btn-delete')) {
      const productID = event.target.dataset.productId;
      deleteProduct(productID);
    } else if (event.target.classList.contains('btn-edit')) {
      const productID = event.target.dataset.productId;
      jumpupdatepage(productID); // 跳轉到修改頁面
    }
  });
});

// 獲取商品數據並渲染表格
function fetchProducts() {
  fetch('http://localhost:8080/productsGetAll')
    .then(response => response.json())
    .then(data => {
      renderProducts(data);
    })
    .catch(error => {
      console.error(error);
    });
}

// 渲染商品表格
function renderProducts(products) {
  const tableBody = document.getElementById('productTableBody');
  tableBody.innerHTML = '';

  products.forEach(product => {
    const row = document.createElement('tr');
    row.classList.add('align-middle');

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-secondary', 'btn-edit');
    editButton.textContent = '修改';
    editButton.dataset.productId = product.productID;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-secondary', 'btn-delete');
    deleteButton.textContent = '刪除';
    deleteButton.dataset.productId = product.productID;

    const base64Image = btoa(new Uint8Array(product.productImage).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    const imageSrc = `data:image/png;base64,${base64Image}`;

    // 將日期格式轉換為 yyyy-MM-dd 格式
    const date = new Date(product.productDate);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    row.innerHTML = `
      <th scope="row">${product.productID}</th>
      <td class="col-2">
        <img src="${imageSrc}" class="img-thumbnail">
      </td>
      <td>${product.productClass}</td>
      <td>${product.productName}</td>
      <td>${product.productStatus}</td>
      <td>${formattedDate}</td>
      <td></td>
      <td></td>
    `;

    row.querySelector('td:nth-child(7)').appendChild(editButton);
    row.querySelector('td:nth-child(8').appendChild(deleteButton);

    tableBody.appendChild(row);
  });
}

// 跳轉到商品頁面
function jumpupdatepage(productID) {
  const url = `/ski/product/backend_productUpdate.html?id=${productID}`;
  window.location.href = url;
}

// 刪除商品
function deleteProduct(productID) {
  fetch(`http://localhost:8080/ski/productDelete?productID=${productID}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Product deleted successfully:', data);
      fetchProducts(); // 重新獲取商品數據並渲染表格
    })
    .catch(error => {
      console.error(error);
    });
}
