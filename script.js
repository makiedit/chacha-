// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
// Registration Form Submission Handler
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ገጹ እንዳይነሳ (reload እንዳይሆን) ይከለክላል

    // ለጊዜው ፎርሙ ሲላክ የስኬት መልእክት ያሳያል
    registrationForm.style.display = 'none';
    successMessage.style.display = 'block';
  });
}
// Search & Filter Logic for Library Page
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const resourceCards = document.querySelectorAll('.resource-card');

// Filter by Category
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active class ቀይር
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      resourceCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Search Functionality
if (searchInput) {
  searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();

    resourceCards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase();
      const desc = card.querySelector('.description').textContent.toLowerCase();

      if (title.includes(term) || desc.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
// Gallery Filtering Logic
const gFilterBtns = document.querySelectorAll('.g-filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

gFilterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gFilterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    document.querySelectorAll('.gallery-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Modal Open/Close Logic
const uploadModal = document.getElementById('uploadModal');
const openUploadBtn = document.getElementById('openUploadModal');
const closeUploadBtn = document.getElementById('closeUploadModal');

if (openUploadBtn) {
  openUploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'flex';
  });
}

if (closeUploadBtn) {
  closeUploadBtn.addEventListener('click', () => {
    uploadModal.style.display = 'none';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === uploadModal) {
    uploadModal.style.display = 'none';
  }
});

// Photo Preview and Add Functionality
const photoFileInput = document.getElementById('photoFileInput');
const photoUrlInput = document.getElementById('photoUrlInput');
const imagePreviewBox = document.getElementById('imagePreviewBox');
const imagePreview = document.getElementById('imagePreview');
const photoUploadForm = document.getElementById('photoUploadForm');
const galleryGrid = document.getElementById('galleryGrid');

// Preview image file
if (photoFileInput) {
  photoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
        imagePreviewBox.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });
}

// Preview image URL
if (photoUrlInput) {
  photoUrlInput.addEventListener('input', (e) => {
    if (e.target.value.trim() !== '') {
      imagePreview.src = e.target.value.trim();
      imagePreviewBox.style.display = 'block';
    }
  });
}

// Handle Photo Publishing
if (photoUploadForm) {
  photoUploadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('photoTitle').value;
    const category = document.getElementById('photoCategory').value;
    const categoryText = document.getElementById('photoCategory').options[document.getElementById('photoCategory').selectedIndex].text;
    const imgSrc = imagePreview.src || 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80';

    // Create New Gallery Card Element
    const newCard = document.createElement('div');
    newCard.className = 'gallery-card';
    newCard.setAttribute('data-category', category);

    newCard.innerHTML = `
      <div class="gallery-img-box">
        <img src="${imgSrc}" alt="${title}">
        <div class="gallery-overlay">
          <span class="g-category">${categoryText}</span>
          <h4>${title}</h4>
          <div class="g-actions">
            <a href="${imgSrc}" target="_blank" class="g-btn"><i class="fa-solid fa-expand"></i></a>
          </div>
        </div>
      </div>
    `;

    // Add to Grid
    galleryGrid.prepend(newCard);

    // Reset Form & Close Modal
    photoUploadForm.reset();
    imagePreviewBox.style.display = 'none';
    uploadModal.style.display = 'none';

    alert('ፎቶው በስኬት ተለቋል!');
  });
}
// ነባሪ የፓስወርድ ቅንብር (ለሙከራ፡ 1234)
const ADMIN_PASSWORD = "1234";

// ኤለመንቶች
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPasswordInput = document.getElementById('adminPassword');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// 1. Authentication (መግቢያ) Check
adminLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (adminPasswordInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('isAdminLoggedIn', 'true');
    showDashboard();
  } else {
    loginError.style.display = 'block';
  }
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('isAdminLoggedIn');
  location.reload();
});

// ድህረ-ገጹ ሲከፈት Logged In መሆኑን ማረጋገጫ
if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
  showDashboard();
}

function showDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
  loadAdminPhotos();
}

// 2. Photos Data Management (ከ LocalStorage)
function getPhotos() {
  const photos = localStorage.getItem('gallery_photos');
  return photos ? JSON.parse(photos) : [
    {
      id: 1,
      title: "የደመራ በዓል አከባበር",
      category: "holidays",
      categoryName: "በዓላት",
      url: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "የሰንበት ትምህርት ጥናት",
      category: "classes",
      categoryName: "ትምህርትና መዝሙር",
      url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80"
    }
  ];
}

function savePhotos(photos) {
  localStorage.setItem('gallery_photos', JSON.stringify(photos));
}

// 3. ፎቶዎችን በአድሚን ገጽ ላይ ማሳየት
function loadAdminPhotos() {
  const photos = getPhotos();
  const grid = document.getElementById('adminPhotoGrid');
  document.getElementById('photoCount').innerText = photos.length;
  grid.innerHTML = '';

  photos.forEach(photo => {
    const card = document.createElement('div');
    card.className = 'photo-manage-card';
    card.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}">
      <div class="photo-manage-details">
        <h4>${photo.title}</h4>
        <small style="color:#777;">ምድብ፡ ${photo.categoryName}</small>
        <button class="delete-btn" onclick="deletePhoto(${photo.id})"><i class="fa-solid fa-trash"></i> አጥፋ</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 4. አዲስ ፎቶ መጨመር
const adminUploadForm = document.getElementById('adminUploadForm');
const aPhotoFileInput = document.getElementById('aPhotoFileInput');
const aPhotoUrlInput = document.getElementById('aPhotoUrlInput');

adminUploadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('aPhotoTitle').value;
  const category = document.getElementById('aPhotoCategory').value;
  const categoryName = document.getElementById('aPhotoCategory').options[document.getElementById('aPhotoCategory').selectedIndex].text;

  let photoUrl = aPhotoUrlInput.value.trim();

  // ፋይል ከተመረጠ ወደ Base64 ይቀይረዋል
  if (aPhotoFileInput.files && aPhotoFileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      addPhotoToStorage(title, category, categoryName, event.target.result);
    };
    reader.readAsDataURL(aPhotoFileInput.files[0]);
  } else if (photoUrl) {
    addPhotoToStorage(title, category, categoryName, photoUrl);
  } else {
    alert('እባክዎን ፎቶ ይምረጡ ወይም URL ያስገቡ!');
  }
});

function addPhotoToStorage(title, category, categoryName, url) {
  const photos = getPhotos();
  const newPhoto = {
    id: Date.now(),
    title: title,
    category: category,
    categoryName: categoryName,
    url: url
  };

  photos.unshift(newPhoto);
  savePhotos(photos);
  loadAdminPhotos();
  adminUploadForm.reset();
  alert('ፎቶው በስኬት ተጨምሯል!');
}

// 5. ፎቶ ማጥፋት (Delete)
window.deletePhoto = function(id) {
  if (confirm('እርግጠኛ ነዎት ይህን ፎቶ ማጥፋት ይፈልጋሉ?')) {
    let photos = getPhotos();
    photos = photos.filter(p => p.id !== id);
    savePhotos(photos);
    loadAdminPhotos();
  }
};