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