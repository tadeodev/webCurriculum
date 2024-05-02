document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const offset = 90; // Adjust this value to set the margin on top after scrolling
            
            if (this.getAttribute('href') === '#') {
                // Scroll to the top of the web
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Scroll to the target with an offset for the margin on top
                const target = document.querySelector(this.getAttribute('href'));
                const targetTop = target.getBoundingClientRect().top + window.pageYOffset; // Calculate the top position of the target element
                window.scrollTo({
                    top: targetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    document.querySelector('.menu-icon').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');

    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            let side_sel = entry.target.getAttribute("data-direction");
            switch(side_sel){
                case "left":
                    side = "fade-left";
                    break;
                case "right":
                    side = "fade-right";
                    break;
                case "up":
                    side = "fade-up";
                    break;
                default:
                    side = "fade-up";
                    break;
            }
            // console.log(entry.target.getAttribute("data-direction"));
            // console.log(side);

            if (entry.isIntersecting && entry.target.classList.contains('barra')) {
                animateCounter(entry.target);
                entry.target.classList.remove('not-visible');
                entry.target.classList.add(side);
            }
            else if (!entry.isIntersecting && entry.target.classList.contains('barra')) {
                entry.target.querySelector('p').textContent = "0%";
                entry.target.classList.remove(side);
                entry.target.classList.remove('visible');
                entry.target.classList.add('not-visible');
            }
            else if (entry.isIntersecting) {
                entry.target.classList.remove('not-visible');
                entry.target.classList.add(side);
                // entry.target.classList.add('visible');
            }
    
            else {
                entry.target.classList.remove(side);
                entry.target.classList.remove('visible');
                entry.target.classList.add('not-visible');
            }
        });
    });
    
    
    function animateCounter(element) {
        let counter = 0;
        const percentage = element.getAttribute('value');
        const text = element.querySelector('p');
        console.log(text);
        const bar = element;
        const interval = setInterval(() => {
            counter += 1;
            if (counter <= percentage) {
                text.textContent = counter + "%";
                bar.style.width = counter + "%";
            } else {
                clearInterval(interval);
            }
        }, 12);
    }
    
    const profileElements = document.getElementById('section').querySelectorAll('div');
    const ulElements = document.getElementById('skills').querySelectorAll('ul ol');
    const percentageElements = document.getElementById('section').querySelectorAll('.percentage');
    const curriculumElements = document.getElementById('section').querySelectorAll('.curriculum-list li')
    // console.log(profileElements.length);    
    profileElements.forEach((element) => observer.observe(element));
    ulElements.forEach((element) => observer.observe(element));
    percentageElements.forEach((element) => observer.observe(element));
    curriculumElements.forEach((element) => observer.observe(element));

});

