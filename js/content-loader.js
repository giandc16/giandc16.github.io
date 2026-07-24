fetch('data/content.json')
  .then(res => res.json())
  .then(data => {
    // About bio
    document.getElementById('about-bio').textContent = data.about.bio;

    // Skills
    const skillsList = document.getElementById('skills-list');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill.title;
      const subUl = document.createElement('ul');
      const subLi = document.createElement('li');
      subLi.innerHTML = skill.detail;
      subUl.appendChild(subLi);
      li.appendChild(subUl);
      skillsList.appendChild(li);
    });

    // Social Media gallery
    const socialList = document.getElementById('gallery-social-list');
    data.gallerySocial.forEach(item => {
      const li = document.createElement('li');
      li.className = 'col-5 col-md-4 col-lg-3';
      li.innerHTML = `
        <a href="${item.image}" data-toggle="lightbox" data-size="lg" data-caption="${item.caption}">
          <img class="img-fluid" src="${item.image}">
        </a>`;
      socialList.appendChild(li);
    });

    // WordPress Development gallery
    const wpList = document.getElementById('gallery-wordpress-list');
    data.galleryWordpress.forEach((company, companyIndex) => {
      const gallerySlug = `wp-gallery-${companyIndex}`;
    
      const li = document.createElement('li');
      li.className = 'col-5 col-md-4 col-lg-3';
    
// Visible thumbnail (the logo) — clicking it opens the first screenshot
const firstScreenshot = company.screenshots[0];
const thumbnailLink = document.createElement('a');
thumbnailLink.href = firstScreenshot.image;
thumbnailLink.setAttribute('data-toggle', 'lightbox');
thumbnailLink.setAttribute('data-gallery', gallerySlug);
thumbnailLink.setAttribute('data-size', 'fullscreen');
thumbnailLink.setAttribute('data-caption', firstScreenshot.caption);
thumbnailLink.setAttribute('data-title', company.companyName);
thumbnailLink.innerHTML = `<img class="img-fluid" src="${company.logo}" alt="${company.companyName} logo">`;
li.appendChild(thumbnailLink);

// Remaining screenshots — hidden, same gallery + fullscreen size
company.screenshots.slice(1).forEach(shot => {
  const hiddenLink = document.createElement('a');
  hiddenLink.href = shot.image;
  hiddenLink.setAttribute('data-toggle', 'lightbox');
  hiddenLink.setAttribute('data-gallery', gallerySlug);
  hiddenLink.setAttribute('data-size', 'fullscreen');
  hiddenLink.setAttribute('data-caption', shot.caption);
  hiddenLink.setAttribute('data-title', company.companyName);
  hiddenLink.className = 'd-none';
  li.appendChild(hiddenLink);
});
      wpList.appendChild(li);
    });

    // Video carousel
    const indicators = document.getElementById('carousel-indicators');
    const inner = document.getElementById('carousel-inner');
    data.videos.forEach((video, index) => {
      const isActive = index === 0;

      const indicatorBtn = document.createElement('button');
      indicatorBtn.type = 'button';
      indicatorBtn.setAttribute('data-bs-target', '#carouselExampleCaptions');
      indicatorBtn.setAttribute('data-bs-slide-to', index);
      indicatorBtn.setAttribute('aria-label', `Slide ${index + 1}`);
      if (isActive) {
        indicatorBtn.className = 'active';
        indicatorBtn.setAttribute('aria-current', 'true');
      }
      indicators.appendChild(indicatorBtn);

      const playButtonAttrs = video.embedIframe
        ? `data-src="${video.embedIframe}" data-type="html" data-title="${video.playTitle}" data-toggle="lightbox"`
        : '';

      const item = document.createElement('div');
      item.className = isActive ? 'carousel-item active' : 'carousel-item';
      item.innerHTML = `
        <img src="${video.thumbnail}" class="d-block w-100" alt="...">
        <div class="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
          <h2 class="bg-dark bg-opacity-50 py-2 px-4">${video.title}</h2>
          <p class="bg-dark bg-opacity-50 py-2 px-4">${video.description}</p>
          <a href="#" class="btn btn-outline-light px-4 py-2 rounded-0" ${playButtonAttrs}>Play</a>
        </div>`;
      inner.appendChild(item);

      // Contact cards (Resume / Email / LinkedIn)
const contactList = document.getElementById('contact-cards-list');
data.contactCards.forEach(card => {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-3 mb-md-0';
  col.innerHTML = `
    <div class="card py-4 h-100">
      <div class="card-body text-center">
        <i class="${card.icon} text-primary mb-2"></i>
        <h4 class="text-uppercase m-0">${card.label}</h4>
        <hr class="my-4 mx-auto" />
        <div class="small text-black-50"><a href="${card.url}">${card.linkText}</a></div>
      </div>
    </div>`;
  contactList.appendChild(col);
  
    });

    // Re-attach lightbox behavior to everything just injected
    document.querySelectorAll('[data-toggle="lightbox"]').forEach(el => {
      el.addEventListener('click', Lightbox.initialize);
    });

    // Reinitialize the carousel so Bootstrap picks up the new slides
    const carouselEl = document.getElementById('carouselExampleCaptions');
    const existingInstance = bootstrap.Carousel.getInstance(carouselEl);
    if (existingInstance) existingInstance.dispose();
    new bootstrap.Carousel(carouselEl);
  })
  .catch(err => console.error('Failed to load content:', err));


});
