window.addEventListener('scroll', () => {
    const title = document.querySelector('.hero-title');
    const nav = document.querySelector('.main-nav');
    const designWords = document.querySelector('.design-words');
    let scrollY = window.scrollY;

    if(scrollY > 50){
        title.style.top = '20px';
        title.style.left = '20px';
        title.style.transform = 'translate(0, 0)';
        title.style.fontSize = '2rem';
        nav.style.top = '20px';
        nav.style.opacity = '1';
        designWords.style.top = '60%';
        designWords.style.opacity = '1';
    } else {
        title.style.top = '50%';
        title.style.left = '50%';
        title.style.transform = 'translate(-50%, -50%)';
        title.style.fontSize = '8vw';
        nav.style.top = '-100px';
        nav.style.opacity = '0';
        designWords.style.top = '120%';
        designWords.style.opacity = '0';
    }
});