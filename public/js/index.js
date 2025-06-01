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

fetch('/json/posts.json')
  .then(response => response.json())
  .then(posts => {
    const container = document.querySelector('.posts');
    posts.forEach(post => {
      const article = document.createElement('article');
      
      const header = document.createElement('header');
      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = `/blog/${post.id}#nav`;
      a.textContent = post.title;
      h3.appendChild(a);
      header.appendChild(h3);
      
      const imageLink = document.createElement('a');
      imageLink.href = `/blog/${post.id}#nav`;
      imageLink.className = 'image fit';
      const img = document.createElement('img');
      img.src = post.banner;
      img.alt = 'banner';
      imageLink.appendChild(img);
      
      const description = document.createElement('p');
      description.textContent = post.description;
      
      const actions = document.createElement('ul');
      actions.className = 'actions special';
      const li = document.createElement('li');
      const readMore = document.createElement('a');
      readMore.href = `/blog/${post.id}#nav`;
      readMore.className = 'button';
      readMore.textContent = 'Pročitaj još';
      li.appendChild(readMore);
      actions.appendChild(li);
      
      article.appendChild(header);
      article.appendChild(imageLink);
      article.appendChild(description);
      article.appendChild(actions);
      
      container.appendChild(article);
    });
  });
