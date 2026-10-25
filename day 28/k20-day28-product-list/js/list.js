const PAGE_SIZE = 12;

const els = {
  form: document.getElementById('filter-form'),
  search: document.getElementById('search-input'),
  category: document.getElementById('category-select'),
  sort: document.getElementById('sort-select'),
  info: document.getElementById('result-info'),
  status: document.getElementById('status'),
  grid: document.getElementById('product-grid'),
  pagination: document.getElementById('pagination'),
};

const initialParams = new URLSearchParams(location.search);
const state = {
  q: initialParams.get('q') ?? '',
  category: initialParams.get('category') ?? '',
  sort: initialParams.get('sort') ?? '',
  page: Math.max(1, Number.parseInt(initialParams.get('page'), 10) || 1),
};

let latestRequestId = 0; 

function syncUrl() {
  const params = new URLSearchParams();
  if (state.q.trim()) params.set('q', state.q.trim());
  if (state.category) params.set('category', state.category);
  if (state.sort) params.set('sort', state.sort);
  if (state.page > 1) params.set('page', state.page);

  const queryString = params.toString() ? `?${params}` : '';
  history.replaceState(null, '', `${location.pathname}${queryString}`);
  sessionStorage.setItem('productListQuery', queryString);
}

function getSortParams() {
  if (!state.sort) return null;
  const [sortBy, order] = state.sort.split('-');
  return { sortBy, order };
}

function sortProducts(products, { sortBy, order }) {
  const direction = order === 'desc' ? -1 : 1;
  return [...products].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title) * direction;
    return (a.price - b.price) * direction;
  });
}

async function fetchProducts() {
  const skip = (state.page - 1) * PAGE_SIZE;
  const sort = getSortParams();
  const q = state.q.trim();

  if (q && state.category) {
    const data = await fetchJSON(
      `${API_BASE}/products/category/${encodeURIComponent(state.category)}?limit=0`
    );
    let list = data.products.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    if (sort) list = sortProducts(list, sort);
    return { products: list.slice(skip, skip + PAGE_SIZE), total: list.length, skip };
  }

  const query = new URLSearchParams({ limit: PAGE_SIZE, skip });
  if (sort) {
    query.set('sortBy', sort.sortBy);
    query.set('order', sort.order);
  }

  let path = '/products';
  if (q) {
    path = '/products/search';
    query.set('q', q);
  } else if (state.category) {
    path = `/products/category/${encodeURIComponent(state.category)}`;
  }

  const data = await fetchJSON(`${API_BASE}${path}?${query}`);
  return { products: data.products, total: data.total, skip };
}

function productCard(p) {
  const salePrice = getSalePrice(p.price, p.discountPercentage);
  const detailUrl = `product.html?id=${p.id}`;

  return `
    <article class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <a href="${detailUrl}" class="relative block bg-slate-100">
        <img
          src="${escapeHTML(p.thumbnail)}"
          alt="${escapeHTML(p.title)}"
          loading="lazy"
          class="aspect-square w-full object-contain p-4 transition duration-300 group-hover:scale-105"
        />
        <span class="absolute left-3 top-3 rounded-full bg-rose-500 px-2 py-0.5 text-xs font-bold text-white">
          -${p.discountPercentage}%
        </span>
      </a>

      <div class="flex flex-1 flex-col gap-2 p-4">
        <h2 class="line-clamp-2 font-semibold">${escapeHTML(p.title)}</h2>

        <div class="flex items-baseline gap-2">
          <span class="text-xl font-bold text-rose-600">${formatPrice(salePrice)}</span>
          <span class="text-sm text-slate-400 line-through">${formatPrice(p.price)}</span>
        </div>

        <div class="flex items-center justify-between text-sm">
          <span class="text-amber-500" title="${p.rating}/5">
            ${renderStars(p.rating)} <span class="text-slate-600">${p.rating}</span>
          </span>
          ${stockBadge(p.stock)}
        </div>

        <a
          href="${detailUrl}"
          class="mt-auto rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Xem chi tiết
        </a>
      </div>
    </article>`;
}

function getPageNumbers(current, total) {
  const pages = [...new Set([1, current - 1, current, current + 1, total])]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];
  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) result.push('...');
    result.push(page);
  });
  return result;
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    els.pagination.innerHTML = '';
    return;
  }

  const button = (label, page, { disabled = false, active = false } = {}) => `
    <button
      type="button"
      data-page="${page}"
      ${disabled ? 'disabled' : ''}
      ${active ? 'aria-current="page"' : ''}
      class="min-w-10 rounded-lg border px-3 py-2 text-sm transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-slate-300 bg-white hover:border-indigo-400 hover:text-indigo-600'
      }"
    >${label}</button>`;

  const numbers = getPageNumbers(state.page, totalPages).map((page) =>
    page === '...'
      ? '<span class="px-2 text-slate-400">…</span>'
      : button(page, page, { active: page === state.page })
  );

  els.pagination.innerHTML = [
    button('‹ Trước', state.page - 1, { disabled: state.page === 1 }),
    ...numbers,
    button('Sau ›', state.page + 1, { disabled: state.page === totalPages }),
  ].join('');
}

async function loadProducts() {
  const requestId = ++latestRequestId;
  syncUrl();

  els.status.innerHTML = loadingHTML('Đang tải sản phẩm...');
  els.grid.innerHTML = '';
  els.pagination.innerHTML = '';
  els.info.textContent = '';

  try {
    const { products, total, skip } = await fetchProducts();
    if (requestId !== latestRequestId) return; 

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    if (total > 0 && state.page > totalPages) {
      state.page = totalPages;
      return loadProducts();
    }

    els.status.innerHTML = '';

    if (products.length === 0) {
      els.status.innerHTML = messageHTML('Không tìm thấy sản phẩm phù hợp.');
      return;
    }

    els.info.textContent = `Hiển thị ${skip + 1}–${skip + products.length} trên tổng ${total} sản phẩm`;
    els.grid.innerHTML = products.map(productCard).join('');
    renderPagination(totalPages);
  } catch (error) {
    if (requestId !== latestRequestId) return;
    els.status.innerHTML = messageHTML(`Không tải được sản phẩm: ${error.message}`, 'error');
  }
}

async function loadCategories() {
  try {
    const categories = await fetchJSON(`${API_BASE}/products/categories`);
    els.category.innerHTML =
      '<option value="">Tất cả danh mục</option>' +
      categories
        .map((c) => `<option value="${escapeHTML(c.slug)}">${escapeHTML(c.name)}</option>`)
        .join('');
    els.category.value = state.category;
  } catch (error) {
    els.category.innerHTML = '<option value="">Không tải được danh mục</option>';
    els.category.disabled = true;
  }
}

let searchTimer;

els.search.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = els.search.value;
    state.page = 1;
    loadProducts();
  }, 400);
});

els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearTimeout(searchTimer);
  state.q = els.search.value;
  state.page = 1;
  loadProducts();
});

els.category.addEventListener('change', () => {
  state.category = els.category.value;
  state.page = 1;
  loadProducts();
});

els.sort.addEventListener('change', () => {
  state.sort = els.sort.value;
  state.page = 1;
  loadProducts();
});

els.pagination.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-page]');
  if (!button || button.disabled) return;
  state.page = Number(button.dataset.page);
  loadProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

els.search.value = state.q;
els.sort.value = state.sort;
loadCategories();
loadProducts();