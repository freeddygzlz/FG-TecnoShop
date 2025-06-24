// Catálogo de productos de ejemplo
const productos = [
    {
        id: 1,
        nombre: "Adaptador Bluetooth Audio",
        descripcion: "Funciona con cualquier sistema de audio o altavoz que llevan un 3.5mm de línea de entrada.",
        precio: 25000,
        categoria: "smartphones",
        imagen: "https://cdn.pixabay.com/photo/2017/01/06/19/15/smartphone-1957740_1280.jpg",
        items: [
            "<b>Conectividad:</b> Entrada AUX y salida AUX.",
            "<b>Compatibilidad:</b> Funciona con dispositivos de audio como parlantes, auriculares y radios de carro.",
            "<b>Bluetooth:</b> Versión 4.2 para una conexión estable.",
            "<b>Carga rápida:</b> Se carga completamente en 30 minutos",
            "<b>Duración:</b> Aproximadamente 2 horas de reproducción continua.",
            "<b>Funciones adicionales:</b> Manos libres para llamadas y compatibilidad con dos dispositivos Bluetooth simultáneamente.",
        ]
    },
    {
        id: 2,
        nombre: "Audifonos Sony",
        descripcion: "auriculares inalámbricos Sony",
        precio: 50000,
        categoria: "Accesorios",
        imagen: "https://cdn.pixabay.com/photo/2014/12/27/15/40/smartphone-582877_1280.jpg",
        items: [
            "<b>Conectividad:</b> Bluetooth 5.0 y entrada AUX.",
            "<b>Calidad de sonido:</b> Sonido nítido y graves profundos.",
            "<b>Compatibilidad:</b> Funciona con smartphones y computadoras.",
            "<b>Bluetooth:</b> Versión 5.0 para una conexión estable.",
            "<b>Duración:</b> Aproximadamente 2-4 horas de reproducción continua.",
            "<b>Funciones adicionales:</b> Manos libres para llamadas y compatibilidad con dispositivos Bluetooth simultáneamente.",
        ]
    },
    {
        id: 3,
        nombre: "Candado Moto con Alarma",
        descripcion: "Este candado compacto ofrece una seguridad mejorada para tu motocicleta o bicicleta, especialmente cuando la estaciones en la calle.",
        precio: 50000,
        categoria: "Otros",
        imagen: "https://cdn.pixabay.com/photo/2016/11/29/09/32/pexels-photo-169573.jpeg",
        items: [
            "<b>Llaves:</b> 2 llaves incluidas.",
            "<b>Alarma:</b> 110 dB que se activa al intentar manipular el candado.",
            "<b>Impermeable:</b> Resistente al agua y a la corrosión.",
            "<b>Pilas:</b> Utiliza 6 pilas referencia LR44 tipo botón",
        ]
    },
    {
        id: 4,
        nombre: "Camara (Tipo Bombillo)",
        descripcion: "cámara bombillo Wi-Fi, la solución perfecta para vigilar tu hogar sin llamar la atención. Con visión nocturna, detección de movimiento y giro 360°, tendrás seguridad completa a cualquier hora. Además, su audio bidireccional te permite escuchar y hablar en tiempo real.",
        precio: 60000,
        categoria: "Camaras",
        imagen: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
        items: [
            "<b>Diseño discreto:</b> Se integra en un bombillo estándar.",
            "<b>Wi-Fi:</b> transmisión en vivo y desde el celular.",
            "<b>Resolucion:</b> En HD con Vision Nocturna.",
            "<b>Giro 360°:</b> Con cobertura completa",
            "<b>Detección de movimiento:</b> Si Con Notificaciones en tiempo real.",
            "<b>Audio bidireccional:</b> Escucha y habla a través de la cámara.",
            "<b>Fácil instalación:</b> Requiere solo una conexión Wi-Fi y un portalámparas.",
            "<b>Aplicación móvil:</b> Controla la cámara desde tu celular.",
            "<b>Almacenamiento:</b> Compatible con tarjetas microSD (no incluidas) para grabación continua.",
        ]
    },
    {
        id: 5,
        nombre: "Roku Espress",
        descripcion: "Disfruta de tus series y películas favoritas en alta definición con Roku Express. Este dispositivo compacto te permite acceder a una amplia variedad de aplicaciones de streaming como Netflix, YouTube y más, todo desde tu televisor.",
        precio: 150000,
        categoria: "Proyectores",
        imagen: "https://cdn.pixabay.com/photo/2016/11/29/09/32/headphones-1868612_1280.jpg",
        items: [
            "<b>Conectividad:</b> HDMI.",
            "<b>Resolución:</b> 1080p Full HD.",
            "<b>Compatibilidad:</b> Con aplicaciones como Netflix, YouTube y más.",
            "<b>Tamaño compacto:</b> Fácil de transportar y almacenar.",
            "<b>Control remoto incluido:</b> Con acceso rápido a aplicaciones populares.",
            "<b>Fácil configuración:</b> Conéctalo a tu TV y disfruta al instante.",
            "<b>Actualizaciones automáticas:</b> Mantén tu dispositivo al día con las últimas funciones.",
        ]
    },
    {
        id: 6,
        nombre: "Cargador Rápido USB-C 65W",
        descripcion: "Compatible con laptops y smartphones, protección múltiple.",
        precio: 99000,
        categoria: "accesorios",
        imagen: "https://cdn.pixabay.com/photo/2017/01/06/19/15/charger-1957742_1280.jpg",
        items: [

        ]
    }
];

const whatsappNumero = "3508067348"; // Cambia por el número real

// Carrito de compras
let carrito = [];

function vaciarCarrito() {
    carrito = [];
    actualizarContadorCarrito();
    renderCarrito();
    document.getElementById('carrito-total').textContent = formatoCOP(0);
    const totalLabel = document.querySelector('.carrito-total');
    if (totalLabel) totalLabel.innerHTML = 'Pago total: <b>' + formatoCOP(0) + '</b>';
}

// Actualiza el total del carrito cada vez que se agrega un artículo
function actualizarTotalCarrito() {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    document.getElementById('carrito-total').textContent = formatoCOP(total);
    const totalLabel = document.querySelector('.carrito-total');
    if (totalLabel) totalLabel.innerHTML = 'Pago total: <b>' + formatoCOP(total) + '</b>';
}

// Llama a actualizarTotalCarrito después de agregar/quitar/cambiar cantidad
const _originalAgregarAlCarrito = agregarAlCarrito;
agregarAlCarrito = function(id, cantidad = 1) {
    _originalAgregarAlCarrito(id, cantidad);
    actualizarTotalCarrito();
    // Forzar actualización del contador del carrito
    actualizarContadorCarrito();
    // Forzar actualización del carrito
    renderCarrito();
    // Abrir el carrito si no está abierto
    if (document.getElementById('carrito-panel').classList.contains('oculto')) {
        abrirCarrito();
    }
    // Forzar actualización del total del carrito
    actualizarTotalCarrito();
    // Forzar actualización del enlace de WhatsApp
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const mensaje = carrito.length === 0 ? '' :
        encodeURIComponent('Hola, quiero comprar:\n' + carrito.map(item => `- ${item.nombre} x${item.cantidad} (${formatoCOP(item.precio * item.cantidad)})`).join('\n') + `\nTotal: ${formatoCOP(total)}`);
    document.getElementById('carrito-whatsapp').href = carrito.length === 0 ? '#' : `https://wa.me/${whatsappNumero}?text=${mensaje}`;
};

const _originalQuitarDelCarrito = quitarDelCarrito;
quitarDelCarrito = function(id) {
    _originalQuitarDelCarrito(id);
    actualizarTotalCarrito();
};

const _originalCambiarCantidad = cambiarCantidad;
cambiarCantidad = function(id, delta) {
    _originalCambiarCantidad(id, delta);
    actualizarTotalCarrito();
};

function formatoCOP(valor) {
    return valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 });
}

function renderProductos(filtro = "todos") {
    const lista = document.getElementById('productos-lista');
    lista.innerHTML = '';
    let filtrados = filtro === "todos" ? productos : productos.filter(p => p.categoria === filtro);
    if (filtrados.length === 0) {
        lista.innerHTML = '<p>No hay productos en esta categoría.</p>';
        return;
    }
    filtrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <div class="precio">${formatoCOP(producto.precio)}</div>
            <div class="producto-botones">
                <button class="descripcion-btn">Descripción</button>
                <button class="agregar-carrito-btn">Agregar al carrito</button>
            </div>
        `;
        // Botón Descripción
        card.querySelector('.descripcion-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            abrirModalProducto(producto.id);
        });
        // Botón Agregar al carrito
        card.querySelector('.agregar-carrito-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            agregarAlCarrito(producto.id);
            abrirCarrito();
        });
        lista.appendChild(card);
    });
}
function abrirModalProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    const modal = document.getElementById('modal-producto');
    const info = document.getElementById('modal-producto-info');
    info.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="precio">${formatoCOP(producto.precio)}</div>
        ${producto.items ? `<ul class="producto-items">${producto.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
        <label style="display:block;margin:12px 0 8px 0;">Cantidad:
            <select id="modal-cantidad" style="margin-left:8px;">
                ${Array.from({length:99},(_,i)=>`<option value='${i+1}'>${i+1}</option>`).join('')}
            </select>
        </label>
        <button class="agregar-carrito-btn">Agregar al carrito</button>
    `;
    info.querySelector('.agregar-carrito-btn').onclick = () => {
        const cantidad = parseInt(document.getElementById('modal-cantidad').value, 10);
        agregarAlCarrito(producto.id, cantidad);
        cerrarModalProducto();
        abrirCarrito();
        renderCarrito(); // Forzar actualización inmediata del total
    };
    modal.classList.remove('oculto');
}

function cerrarModalProducto() {
    document.getElementById('modal-producto').classList.add('oculto');
}

document.getElementById('cerrar-modal-producto').onclick = cerrarModalProducto;

document.addEventListener('DOMContentLoaded', () => {
    renderProductos();
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProductos(this.dataset.categoria);
        });
    });
    document.getElementById('carrito-btn').onclick = abrirCarrito;
    document.getElementById('cerrar-carrito').onclick = cerrarCarrito;
});

function abrirCarrito() {
    document.getElementById('carrito-panel').classList.remove('oculto');
    renderCarrito();
}
function cerrarCarrito() {
    document.getElementById('carrito-panel').classList.add('oculto');
}

function agregarAlCarrito(id, cantidad = 1) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += cantidad;
        if (item.cantidad > 99) item.cantidad = 99;
    } else {
        carrito.push({ ...producto, cantidad: cantidad });
    }
    actualizarContadorCarrito();
}

function quitarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    actualizarContadorCarrito();
    renderCarrito();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(p => p.id === id);
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
        quitarDelCarrito(id);
    } else {
        renderCarrito();
        actualizarContadorCarrito();
    }
}

function renderCarrito() {
    const items = document.getElementById('carrito-items');
    items.innerHTML = '';
    let total = 0;
    if (carrito.length === 0) {
        items.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
                <div class="carrito-item-nombre">${item.nombre}</div>
                <div class="carrito-item-precio">Valor unitario: <b>${formatoCOP(item.precio)}</b></div>
                <div class="carrito-item-precio">Cantidad: <b>${item.cantidad}</b></div>
                <div class="carrito-item-precio">Subtotal: <b>${formatoCOP(item.precio * item.cantidad)}</b></div>
                <div class="carrito-item-cantidad">
                <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                <button onclick="quitarDelCarrito(${item.id})" style="margin-left:10px;color:#e74c3c;background:#fff;border:1px solid #e74c3c;">&times;</button>
                </div>
            </div>
            `;
            items.appendChild(div);
        });

        // Mostrar botón de pagar por WhatsApp solo si hay productos en el carrito
        const pagarBtn = document.getElementById('carrito-whatsapp');
        if (carrito.length > 0) {
            pagarBtn.style.display = 'inline-block';
            pagarBtn.href = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent('Hola, quiero comprar:\n' + carrito.map(item => `- ${item.nombre} x${item.cantidad} (${formatoCOP(item.precio * item.cantidad)})`).join('\n') + `\nTotal: ${formatoCOP(total)}`)}`;
        } else {
            pagarBtn.style.display = 'none';
            pagarBtn.href = '#';
        }
    }
    document.getElementById('carrito-total').textContent = formatoCOP(total);
    const totalLabel = document.querySelector('.carrito-total');
    if (totalLabel) totalLabel.innerHTML = 'Pago total: <b>' + formatoCOP(total) + '</b>';
    actualizarContadorCarrito();
    // WhatsApp link
    const mensaje = carrito.length === 0 ? '' :
        encodeURIComponent('Hola, quiero comprar:\n' + carrito.map(item => `- ${item.nombre} x${item.cantidad} (${formatoCOP(item.precio * item.cantidad)})`).join('\n') + `\nTotal: ${formatoCOP(total)}`);
    document.getElementById('carrito-whatsapp').href = carrito.length === 0 ? '#' : `https://wa.me/${whatsappNumero}?text=${mensaje}`;
}

function actualizarContadorCarrito() {
    const contador = document.getElementById('carrito-contador');
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contador.textContent = total;
}

// Para que los botones del carrito funcionen (delegación)
document.getElementById('carrito-items').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        const parent = e.target.closest('.carrito-item');
        if (!parent) return;
        const nombre = parent.querySelector('.carrito-item-nombre').textContent;
        const producto = productos.find(p => p.nombre === nombre);
        if (!producto) return;
        if (e.target.textContent === '+') cambiarCantidad(producto.id, 1);
        if (e.target.textContent === '-') cambiarCantidad(producto.id, -1);
        if (e.target.textContent === '×' || e.target.textContent === '✕') quitarDelCarrito(producto.id);
    }
});

// Cerrar modal al hacer click fuera del contenido
document.getElementById('modal-producto').addEventListener('click', function(e) {
    if (e.target === this) cerrarModalProducto();
});
document.getElementById('carrito-whatsapp').addEventListener('click', function(e) {
    if (carrito.length === 0) {
        e.preventDefault();
        return;
    }
    // Permite que el enlace funcione normalmente y abra WhatsApp
});