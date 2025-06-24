// Inicializa productos si no existe
window.productos = window.productos || [];

// Configuración de credenciales
const ADMIN_USER = 'freeddygzlz16';
const ADMIN_PASS = '1694';

function mostrarLogin() {
    document.getElementById('admin-login')?.classList.remove('oculto');
    document.getElementById('admin-panel')?.classList.add('oculto');
    document.querySelector('main > section.hero')?.classList.add('oculto');
    document.getElementById('catalogo')?.classList.add('oculto');
}

function mostrarPanelAdmin() {
    document.getElementById('admin-login')?.classList.add('oculto');
    document.getElementById('admin-panel')?.classList.remove('oculto');
    document.querySelector('main > section.hero')?.classList.add('oculto');
    document.getElementById('catalogo')?.classList.add('oculto');
    renderAdminArticulos();
}

function logoutAdmin() {
    mostrarLogin();
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#admin') mostrarLogin();

    // Botón de acceso administrador
    const adminBtn = document.createElement('a');
    adminBtn.href = '#admin';
    adminBtn.textContent = 'Administrador';
    adminBtn.className = 'cta-btn';
    adminBtn.style.position = 'absolute';
    adminBtn.style.top = '20px';
    adminBtn.style.right = '20px';
    adminBtn.style.zIndex = '1000';
    document.body.appendChild(adminBtn);

    adminBtn.onclick = function(e) {
        e.preventDefault();
        window.location.hash = '#admin';
        mostrarLogin();
    };

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const user = document.getElementById('admin-usuario').value.trim();
            const pass = document.getElementById('admin-password').value.trim();
            if (user === ADMIN_USER && pass === ADMIN_PASS) {
                mostrarPanelAdmin();
                document.getElementById('login-error').style.display = 'none';
                loginForm.reset();
            } else {
                document.getElementById('login-error').style.display = 'block';
            }
        };
    }
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.onclick = logoutAdmin;
});

function renderAdminArticulos() {
    const cont = document.getElementById('admin-articulos');
    if (!cont) return;
    cont.innerHTML = '';
    // Formulario para agregar producto
    const form = document.createElement('form');
    form.id = 'admin-add-form';
    form.innerHTML = `
        <h3>Agregar nuevo producto</h3>
        <label>Nombre:<input type="text" id="add-nombre" required></label>
        <label>Precio (COP):<input type="number" id="add-precio" required min="0"></label>
        <label>Categoría:
            <select id="add-categoria" required>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="accesorios">Accesorios</option>
            </select>
        </label>
        <label>Imágenes (puedes seleccionar varias):<input type="file" id="add-imagenes" accept="image/*" multiple required></label>
        <div id="preview-imagenes" style="display:flex;gap:8px;margin-bottom:10px;"></div>
        <label>Descripción:<textarea id="add-desc" required></textarea></label>
        <label>Características (una por línea):<textarea id="add-items"></textarea></label>
        <label>Estado:
            <select id="add-estado">
                <option value="disponible">Disponible</option>
                <option value="agotado">Agotado</option>
            </select>
        </label>
        <button type="submit" class="cta-btn">Agregar producto</button>
        <hr>
    `;
    form.querySelector('#add-imagenes').addEventListener('change', function(e) {
        const preview = document.getElementById('preview-imagenes');
        preview.innerHTML = '';
        Array.from(this.files).forEach(file => {
            const url = URL.createObjectURL(file);
            const img = document.createElement('img');
            img.src = url;
            img.style.width = '48px';
            img.style.height = '48px';
            img.style.objectFit = 'cover';
            preview.appendChild(img);
        });
    });
    form.onsubmit = function(e) {
        e.preventDefault();
        const files = form.querySelector('#add-imagenes').files;
        if (!files.length) {
            alert('Debes seleccionar al menos una imagen.');
            return;
        }
        const imagenes = Array.from(files).map(file => URL.createObjectURL(file));
        const nuevo = {
            id: Date.now(),
            nombre: document.getElementById('add-nombre').value.trim(),
            precio: parseInt(document.getElementById('add-precio').value, 10),
            categoria: document.getElementById('add-categoria').value,
            imagen: imagenes[0] || '',
            imagenes: imagenes,
            descripcion: document.getElementById('add-desc').value.trim(),
            items: document.getElementById('add-items').value.split('\n').map(i => i.trim()).filter(i => i),
            estado: document.getElementById('add-estado').value
        };
        window.productos.push(nuevo);
        renderAdminArticulos();
        if (typeof window.renderProductos === 'function') window.renderProductos();
        alert('Producto agregado');
    };
    cont.appendChild(form);

    if (!window.productos.length) {
        cont.innerHTML += '<p>No hay productos cargados.</p>';
        return;
    }
    window.productos.forEach((prod, idx) => {
        const div = document.createElement('div');
        div.className = 'admin-articulo';
        div.innerHTML = `
            <h4>${prod.nombre}</h4>
            <label>Estado:
                <select class="admin-estado" data-idx="${idx}">
                    <option value="disponible" ${prod.estado !== 'agotado' ? 'selected' : ''}>Disponible</option>
                    <option value="agotado" ${prod.estado === 'agotado' ? 'selected' : ''}>Agotado</option>
                </select>
            </label>
            <label>Descripción:
                <textarea class="admin-desc" data-idx="${idx}">${prod.descripcion}</textarea>
            </label>
            <label>Características (una por línea):
                <textarea class="admin-items" data-idx="${idx}">${prod.items ? prod.items.join('\n') : ''}</textarea>
            </label>
            <button class="admin-guardar" data-idx="${idx}">Guardar cambios</button>
            <hr>
        `;
        cont.appendChild(div);
    });
    cont.querySelectorAll('.admin-guardar').forEach(btn => {
        btn.onclick = function() {
            const idx = this.getAttribute('data-idx');
            const estado = cont.querySelector(`.admin-estado[data-idx='${idx}']`).value;
            const desc = cont.querySelector(`.admin-desc[data-idx='${idx}']`).value;
            const items = cont.querySelector(`.admin-items[data-idx='${idx}']`).value.split('\n').map(i => i.trim()).filter(i => i);
            window.productos[idx].estado = estado;
            window.productos[idx].descripcion = desc;
            window.productos[idx].items = items;
            alert('Cambios guardados para ' + window.productos[idx].nombre);
        };
    });
}
