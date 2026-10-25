const content = document.getElementById('content');
const backLink = document.getElementById('back-link');

// Quay lại đúng trang/bộ lọc đang xem ở danh sách
backLink.href = `index.html${sessionStorage.getItem('productListQuery') ?? ''}`;

// Lấy id từ URL: product.html?id=5 → 5; id sai → null
function getProductId() {
  const raw = new URLSearchParams(location.search).get('id');
  const id = Number(raw);
  return raw && Number.isInteger(id) && id > 0 ? id : null;
}

function formatDate(value) {
  return new Date(value).toLocaleDateString('vi-VN');
}

function infoRow(label, value) {
  return `
    <div class="flex justify-between gap-4 border-b border-slate-100 py-2 last:border-0">
      <dt class="text-slate-500">${label}</dt>
      <dd class="text-right font-medium">${value}</dd>
    </div>`;
}

function renderReviews(reviews = []) {
  if (reviews.length === 0) {
    return '<p class="text-slate-500">Sản phẩm chưa có đánh giá.</p>';
  }

  return `
    <ul class="space-y-3">
      ${reviews
        .map(
          (r) => `
        <li class="rounded-lg border border-slate-200 p-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="font-semibold">${escapeHTML(r.reviewerName)}</span>
            <span class="text-sm text-slate-400">${formatDate(r.date)}</span>
          </div>
          <p class="mt-1 text-amber-500">${renderStars(r.rating)} <span class="text-sm text-slate-600">${r.rating}/5</span></p>
          <p class="mt-1 text-slate-700">${escapeHTML(r.comment)}</p>
        </li>`
        )
        .join('')}
    </ul>`;
}

function renderProduct(p) {
  const salePrice = getSalePrice(p.price, p.discountPercentage);
  const images = p.images?.length ? p.images : [p.thumbnail];
  const { width, height, depth } = p.dimensions ?? {};

  return `
    <div class="grid gap-8 lg:grid-cols-2">
      <!-- Ảnh -->
      <section class="space-y-3">
        <div class="overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
          <img
            id="main-image"
            src="${escapeHTML(images[0])}"
            alt="${escapeHTML(p.title)}"
            class="aspect-square w-full object-contain p-6"
          />
        </div>
        <div id="gallery" class="grid grid-cols-4 gap-3 sm:grid-cols-5">
          ${images
            .map(
              (src, index) => `
            <button
              type="button"
              data-src="${escapeHTML(src)}"
              class="overflow-hidden rounded-lg bg-white ring-2 transition hover:ring-indigo-400 ${index === 0 ? 'ring-indigo-600' : 'ring-slate-200'}"
            >
              <img src="${escapeHTML(src)}" alt="${escapeHTML(p.title)} - ảnh ${index + 1}" class="aspect-square w-full object-contain p-1" />
            </button>`
            )
            .join('')}
        </div>
      </section>

      <!-- Thông tin -->
      <section class="space-y-5">
        <div class="space-y-2">
          <span class="inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
            ${escapeHTML(p.category)}
          </span>
          <h1 class="text-3xl font-bold">${escapeHTML(p.title)}</h1>
          <p class="text-amber-500">
            ${renderStars(p.rating)} <span class="text-sm text-slate-600">${p.rating}/5</span>
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-3 rounded-xl bg-rose-50 p-4">
          <span class="text-3xl font-bold text-rose-600">${formatPrice(salePrice)}</span>
          <span class="text-lg text-slate-400 line-through">${formatPrice(p.price)}</span>
          <span class="rounded-full bg-rose-500 px-2 py-0.5 text-sm font-bold text-white">-${p.discountPercentage}%</span>
          <span class="ml-auto">${stockBadge(p.stock)}</span>
        </div>

        <div>
          <h2 class="mb-1 font-semibold">Mô tả</h2>
          <p class="text-slate-700">${escapeHTML(p.description)}</p>
        </div>

        <div>
          <h2 class="mb-2 font-semibold">Tags</h2>
          <div class="flex flex-wrap gap-2">
            ${(p.tags ?? [])
              .map((tag) => `<span class="rounded-full bg-slate-100 px-3 py-1 text-sm">#${escapeHTML(tag)}</span>`)
              .join('') || '<span class="text-slate-500">Không có</span>'}
          </div>
        </div>

        <dl class="rounded-xl bg-white p-4 text-sm ring-1 ring-slate-200">
          ${infoRow('Thương hiệu', escapeHTML(p.brand ?? 'Không có'))}
          ${infoRow('Danh mục', escapeHTML(p.category))}
          ${infoRow('SKU', escapeHTML(p.sku))}
          ${infoRow('Kích thước (R × C × S)', p.dimensions ? `${width} × ${height} × ${depth} cm` : 'Không có')}
          ${infoRow('Cân nặng', `${p.weight} kg`)}
          ${infoRow('Tồn kho', p.stock)}
        </dl>
      </section>
    </div>

    <!-- Reviews -->
    <section class="mt-10 space-y-4">
      <h2 class="text-xl font-bold">Đánh giá (${p.reviews?.length ?? 0})</h2>
      ${renderReviews(p.reviews)}
    </section>`;
}

// Bấm ảnh nhỏ → đổi ảnh lớn
function setupGallery() {
  const mainImage = document.getElementById('main-image');
  const gallery = document.getElementById('gallery');

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-src]');
    if (!button) return;

    mainImage.src = button.dataset.src;
    gallery.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('ring-indigo-600', b === button);
      b.classList.toggle('ring-slate-200', b !== button);
    });
  });
}

async function loadProduct() {
  const id = getProductId();

  if (id === null) {
    content.innerHTML = messageHTML('ID sản phẩm không hợp lệ.', 'error');
    return;
  }

  content.innerHTML = loadingHTML('Đang tải chi tiết sản phẩm...');

  try {
    const response = await fetch(`${API_BASE}/products/${id}`);

    if (response.status === 404) {
      throw new Error(`Không tìm thấy sản phẩm có id ${id}.`);
    }
    if (!response.ok) {
      throw new Error(`Không tải được sản phẩm (HTTP ${response.status}).`);
    }

    const product = await response.json();
    document.title = `${product.title} | Đức Shop`;
    content.innerHTML = renderProduct(product);
    setupGallery();
  } catch (error) {
    content.innerHTML = messageHTML(error.message, 'error');
  }
}

loadProduct();