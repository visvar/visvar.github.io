function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    console.log(element.style.display);
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function toggleClass(elementId, className) {
    const element = document.getElementById(elementId);
    element.classList.toggle(className);
}

function toggleImageSize(img) {
    if (img.src.includes('small')) {
        img.src = img.src.replace('small/', '');
        img.classList.remove('small');
    } else {
        img.src = img.src.replace('img/', 'img/small/');
        img.classList.add('small');
    }
}
