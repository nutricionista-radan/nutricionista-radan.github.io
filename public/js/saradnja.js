const ostalo = document.getElementById("other");
const ostaloText = document.getElementById("other-content");
const diabetes = document.getElementById("diabetes");
const diabetesContent = document.getElementById("diabetes-content");


if(ostalo.checked){
    ostaloText.hidden = false;
}
else{
    ostaloText.hidden = true;
}

if(diabetes.checked){
    diabetesContent.hidden = false;
}
else{
    diabetesContent.hidden = true;
}


function contentVisibility(){
    if(ostalo.checked){
        ostaloText.hidden = false;
    }
    else{
        ostaloText.hidden = true;
    }

    if(diabetes.checked){
        diabetesContent.hidden = false;
    }
    else{
        diabetesContent.hidden = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const ribbons = document.querySelectorAll('.ribbon');
  
    ribbons.forEach(ribbon => {
        ribbon.addEventListener('click', function() {
            this.classList.toggle('active');
  
            const content = this.nextElementSibling;
  
            if (content && content.classList.contains('ribbon-content')) {
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    content.classList.remove('show');
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.classList.add('show');
                }
            }
        });
    });
});

  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('nav');
    const navTop = nav.offsetTop; // Get the original position of nav

    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        // If we've scrolled past the original position of the navbar
        if (scrollPosition > navTop) {
            nav.classList.add('fixed');
        } 
        // If we've scrolled back up to or above the original position
        else {
            nav.classList.remove('fixed');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        age: document.getElementById('age').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        purpose: document.querySelector('input[name="purpose"]:checked')?.value,
        otherPurpose: document.getElementById('other-text').value,
        insulin: document.querySelector('input[name="insulin"]:checked')?.value,
        sugarLevel: document.getElementById('sugar').value,
        medications: document.getElementById('meds').value,
        allergies: document.getElementById('allergy').value,
        activity: document.querySelector('input[name="activity"]:checked')?.value,
        additional: document.getElementById('additional').value
    };

    try {
        const response = await fetch('/saradnja/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Poruka je uspešno poslata. Uskoro ćete biti kontaktirani putem mejla.');
            e.target.reset();
        } else {
            alert('Došlo je do greške prilikom slanja poruke. Pokušajte ponovo kasnije, ili se javite putem mejla, Instagrama, ili broja telefona.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Došlo je do greške prilikom slanja poruke. Pokušajte ponovo kasnije, ili se javite putem mejla, Instagrama, ili broja telefona.');
    }
});