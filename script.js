function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth' 
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.5 }); 

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.querySelectorAll('.scroll-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const targetSectionId = event.target.getAttribute('data-target');
        scrollToSection(targetSectionId);
    });
});
