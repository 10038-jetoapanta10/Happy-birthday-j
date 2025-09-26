// Crear cometas normales (menos frecuentes)
function createNormalComet() {
    const comet = document.createElement('div');
    comet.className = 'comet';
    
    // Posición inicial aleatoria en el lado izquierdo
    const startY = Math.random() * window.innerHeight;
    comet.style.left = '-100px';
    comet.style.top = startY + 'px';
    
    // Velocidad aleatoria
    const duration = Math.random() * 4 + 3;
    comet.style.animationDuration = duration + 's';
    
    // Tamaño aleatorio
    const size = Math.random() * 2 + 1;
    comet.style.width = size + 'px';
    comet.style.height = size + 'px';
    
    document.body.appendChild(comet);
    
    // Eliminar después de la animación
    setTimeout(() => {
        comet.remove();
    }, duration * 1000);
}

// Crear lluvia intensa de cometas especiales
function createSpecialComet() {
    const comet = document.createElement('div');
    comet.className = 'special-comet';
    
    // Posición inicial aleatoria en el borde superior izquierdo
    const startX = Math.random() * window.innerWidth * 0.5 - 200;
    const startY = Math.random() * 200 - 300;
    comet.style.left = startX + 'px';
    comet.style.top = startY + 'px';
    
    // Velocidad aleatoria (más rápidos)
    const duration = Math.random() * 2 + 1;
    comet.style.animationDuration = duration + 's';
    
    // Tamaño variado
    const size = Math.random() * 4 + 2;
    comet.style.width = size + 'px';
    comet.style.height = size + 'px';
    
    // Retraso aleatorio
    comet.style.animationDelay = Math.random() * 0.5 + 's';
    
    document.body.appendChild(comet);
    
    // Eliminar después de la animación
    setTimeout(() => {
        comet.remove();
    }, (duration + 1) * 1000);
}

// Crear estrellas de fondo
function createBackgroundStar() {
    const star = document.createElement('div');
    star.className = 'star-background';
    
    // Posición aleatoria
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Duración de parpadeo aleatoria
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(star);
}

// Crear partículas mágicas cuando se abre la flor
function createMagicParticles() {
    const flowerCenter = document.querySelector('.flower-center');
    const rect = flowerCenter.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            
            // Calcular dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 150;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            
            // Color aleatorio entre turquesa y blanco
            if (Math.random() > 0.5) {
                particle.style.background = '#00ffff';
                particle.style.boxShadow = '0 0 15px #00ffff';
            } else {
                particle.style.background = 'white';
                particle.style.boxShadow = '0 0 15px white';
            }
            
            document.body.appendChild(particle);
            
            // Eliminar después de la animación
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
}

// Variable para controlar la lluvia de cometas especiales
let specialCometInterval;

// Variable para controlar si la flor está abierta
let isOpen = false;

// Función para abrir la flor
function openFlower() {
    if (!isOpen) {
        const flower = document.getElementById('flower');
        const flowerWrapper = document.getElementById('flowerWrapper');
        const message = document.getElementById('message');
        const darkOverlay = document.getElementById('darkOverlay');
        const cornerImages = document.getElementById('cornerImages');
        
        // Abrir la flor
        flower.classList.remove('closed');
        flower.classList.add('open');
        
        // Opacar la flor después de abrirse
        setTimeout(() => {
            flowerWrapper.classList.add('fade');
            darkOverlay.classList.add('active');
        }, 1500);
        
        // Mostrar mensaje
        setTimeout(() => {
            message.classList.add('show');
            
            // Mostrar las imágenes de las esquinas
            setTimeout(() => {
                cornerImages.classList.add('show');
            }, 500);
            
            // Iniciar lluvia intensa de cometas
            // Crear muchos cometas iniciales
            for (let i = 0; i < 30; i++) {
                setTimeout(() => createSpecialComet(), i * 100);
            }
            
            // Continuar creando cometas
            specialCometInterval = setInterval(() => {
                createSpecialComet();
                if (Math.random() > 0.5) createSpecialComet(); // A veces crear dos
                if (Math.random() > 0.7) createSpecialComet(); // A veces crear tres
            }, 200);
            
        }, 500);
        
        // Crear partículas mágicas
        createMagicParticles();
        
        isOpen = true;
    }
}

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar cometas normales (menos frecuentes)
    setInterval(createNormalComet, 2000);

    // Inicializar estrellas de fondo
    for (let i = 0; i < 150; i++) {
        createBackgroundStar();
    }

    // Efecto de partículas al mover el mouse
    document.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.96 && isOpen) {
            const particle = document.createElement('div');
            particle.className = 'magic-particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            particle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    });

    // Detectar scroll en el mensaje para ocultar indicador
    const messageContainer = document.getElementById('message');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (messageContainer && scrollIndicator) {
        messageContainer.addEventListener('scroll', function() {
            if (this.scrollTop > 10) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        });
    }
});
