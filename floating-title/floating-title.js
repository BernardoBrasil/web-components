const TEXT = "Floating title"
const COLOR = "#ffffff"

const createFloatingTitle = (title) => {
    const floatingTitle = document.createElement('span');
    floatingTitle.setAttribute('class', 'floating-title');
    floatingTitle.textContent = title;

    return floatingTitle;
}

const createContainer = (title) => {
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    const floatingTitle = createFloatingTitle(title)
    container.appendChild(floatingTitle);

    container.addEventListener('mousedown', function (e) {
        floatingTitle.classList.add('pressed')
    })

    container.addEventListener('mouseup', () => {
        floatingTitle.classList.remove('pressed')
    })

    container.addEventListener('mouseenter', function (e) {
        floatingTitle.classList.add('visible');
    })

    container.addEventListener('mousemove', function (e) {
        const w = floatingTitle.offsetWidth;
        const h = floatingTitle.offsetHeight;

        const cw = container.offsetWidth;
        const ch = container.offsetHeight;
        const cby = container.getBoundingClientRect().y

        const x = e.clientX;
        const y = e.clientY;

        floatingTitle.style.left = x < cw - w ? `${x}px` : `${cw - w}px`
        floatingTitle.style.top = y < ch + cby - h ? `${y - cby}px` : `${ch - h}px`
    })

    container.addEventListener('mouseleave', function (e) {
        floatingTitle.classList.remove('visible');
        floatingTitle.classList.remove('pressed');
    })

    return container;
}

const createStyle = (color) => {
    const style = document.createElement('style');

    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@1,200&display=swap');
    .container {
        font-family: 'IBM Plex Mono', monospace;
        position: relative;
        height: 100%;
        overflow: hidden;
        background-size: cover;
        background-position: center center;
    }
    .floating-title {
        position: absolute;
        left: 50%;
        top: 50%;
        border: 1px solid ${color};
        color: ${color};
        padding: .2em .5em;
        font-size: clamp(1rem, 3vh, 2rem);
        border-radius: 1em;
        transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
        transform: scale(.5);
        opacity: 0;
    }
    .floating-title.visible {
        transform: scale(1);
        opacity: 1;
    }
    .floating-title.pressed {
        transform: skew(10deg,20deg)
    }
    `;

    return style
}

class FloatingTitle extends HTMLElement {
    constructor() {
        super()
        console.log('Loading the code for Custom Element \'floating-title\'. To debug this code, open floating-title.js in Developer Tools.')
    }
    connectedCallback() {
        const title = this.hasAttribute('text') ? this.getAttribute('text') : TEXT
        const color = this.hasAttribute('color') ? this.getAttribute('color') : COLOR
        this.appendChild(createStyle(color))
        this.appendChild(createContainer(title))
    }
}

customElements.define('floating-title', FloatingTitle)