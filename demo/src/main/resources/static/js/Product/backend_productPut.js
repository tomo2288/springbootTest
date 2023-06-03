// 頁面加載完成後執行
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
        console.log(data);
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

    // 直接使用從後端獲取的 base64 字串
    const imageSrc = `data:image/png;base64,${product.productImage}`;

    const date = dayjs(product.productDate);
    const formattedDate = date.format('YYYY-MM-DD');
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
    row.querySelector('td:nth-child(8)').appendChild(deleteButton);

    tableBody.appendChild(row);
  });
}

// 跳轉到商品頁面
function jumpupdatepage(productID) {
  const url = `/product/backend_productUpdate.html?id=${productID}`;
  window.location.href = url;
}

// 刪除商品
function deleteProduct(productID) {
  fetch(`http://localhost:8080/productDelete/${productID}`, {
    method: 'DELETE',
  })
      .then(response => {
        if (response.ok) {
          console.log('Product deleted successfully');
          fetchProducts(); // 重新獲取商品數據並渲染表格
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch(error => {
        console.error(error);
      });
}
