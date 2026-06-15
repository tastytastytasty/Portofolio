// Carousel
const track = document.getElementById("track");
const dotsContainer = document.getElementById("dots");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const cards = track.children;
let current = 0;
let visibleCount;
let total;
let dots;
let currentOffset = 0;

function getVisibleCount() {
  return window.innerWidth < 768 ? 1 : 2;
}

function buildDots() {
  dotsContainer.innerHTML = "";
  visibleCount = getVisibleCount();
  total = Math.ceil(cards.length / visibleCount);
  current = 0;
  currentOffset = 0;
  track.style.transform = "translateX(0)";

  for (let i = 0; i < total; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  dots = dotsContainer.querySelectorAll(".dot");
}

function goTo(idx) {
  current = idx;
  const totalCards = cards.length;

  let startIndex = current * visibleCount;
  if (startIndex + visibleCount > totalCards) {
    startIndex = totalCards - visibleCount;
  }

  track.style.transform = "translateX(0)";

  const trackLeft = track.getBoundingClientRect().left;
  const cardLeft = cards[startIndex].getBoundingClientRect().left;
  currentOffset = cardLeft - trackLeft;

  track.style.transform = `translateX(-${currentOffset}px)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function next() {
  goTo((current + 1) % total);
}
function prev() {
  goTo((current - 1 + total) % total);
}

btnPrev.addEventListener("click", prev);
btnNext.addEventListener("click", next);

buildDots();
window.addEventListener("resize", buildDots);

// Theme Toggle
const btn = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  icon.className = "bx bx-sun";
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  icon.className = isLight ? "bx bx-sun" : "bx bx-moon";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

// Language Options
const translations = {
  id: {
    nav_home: "Beranda",
    nav_about: "Tentang",
    nav_portfolio: "Portofolio",
    nav_projects: "Projek",
    nav_resume: "Pengalaman",
    nav_contact: "Kontak",
    home_greet: "Halo, Saya",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>Software Developer</span> yang antusias dalam membangun aplikasi berbasis web yang menarik dan mudah digunakan.",
    home_more: 'Selengkapnya<i class="bx bx-chevron-right ikon"></i>',
    about_title: "Tentang Saya",
    about_subtitle: "Saya Software Developer.",
    about_description:
      "Seseorang yang memiliki ketertarikan dalam pengembangan aplikasi berbasis web dengan berfokus pada kemudahan dan kenyamanan pengguna. Selalu berusaha membangun tampilan dan alur yang sederhana, mudah digunakan, dan menyenangkan.",
    resume_title: "Pendidikan & Pengalaman",
    resume_education_date: "Juli 2023 - Juni 2026",
    resume_education_title: "Pendidikan Rekayasa Perangkat Lunak",
    resume_education_description:
      "Mempelajari pengembangan aplikasi berbasis web, database, dan dasar pemrograman.",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "Desember 2025 - April 2026",
    resume_experience_title: "Praktik Kerja Lapangan",
    resume_experience_description:
      "Mengembangkan aplikasi <i>e-commerce</i> berbasis web menggunakan PHP, CodeIgniter 3, dan MySQL.",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    projects_title: "Projek",
    projects_bad_habit_desc:
      "Aplikasi pelacak kebiasaan berbasis web yang membantu pengguna memantau dan menganalisis waktu yang terbuang melalui tampilan responsif, visualisasi data interaktif, serta fitur yang mendukung peningkatan produktivitas.",
    projects_utaps_desc:
      "Aplikasi e-commerce sepatu berbasis web yang menghadirkan pengalaman belanja modern dengan tampilan responsif, navigasi yang mudah, dan fitur yang mendukung kenyamanan pengguna.",
    projects_lelangku_desc:
      "Aplikasi lelang berbasis web dengan tampilan sederhana dan interaktif untuk memudahkan pengguna dalam melakukan penawaran barang yang sedang di lelang.",
    projects_spp_desc:
      "Aplikasi pembayaran SPP berbasis web untuk membantu proses pencatatan dan pengelolaan pembayaran siswa pada lembaga pendidikan RA Darul Ikhlas secara lebih efisien.",
    cta_text: "Mari ciptakan produk yang bermanfaat bersama!",
    cta_button: "Hubungi Saya",
    contact_title: "Hubungi Saya",
    contact_name: "Nama",
    contact_email: "Email",
    contact_message: "Pesan",
    contact_submit: "Kirim Pesan",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_portfolio: "Portfolio",
    nav_projects: "Projects",
    nav_resume: "Experience",
    nav_contact: "Contact",
    home_greet: "Hi, I'm",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>Software Developer</span> passionate about building attractive and easy-to-use web applications.",
    home_more: 'Learn More<i class="bx bx-chevron-right ikon"></i>',
    about_title: "About Me",
    about_subtitle: "I'm a Software Developer.",
    about_description:
      "Someone with a strong interest in web-based application development, focusing on ease of use and user comfort. Always striving to build simple, intuitive, and enjoyable interfaces and workflows.",
    resume_title: "Education & Experience",
    resume_education_date: "July 2023 - June 2026",
    resume_education_title: "Software Engineering Education",
    resume_education_description:
      "Studying web-based application development, databases, and programming fundamentals.",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "December 2025 - April 2026",
    resume_experience_title: "Field Work Practice",
    resume_experience_description:
      "Developing a web-based <i>e-commerce</i> application using PHP, CodeIgniter 3, and MySQL.",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    projects_title: "Projects",
    projects_bad_habit_desc:
      "A web-based habit tracking application that helps users monitor and analyze time spent on unproductive activities through a responsive interface, interactive data visualizations, and features designed to encourage better productivity.",
    projects_utaps_desc:
      "A web-based shoe e-commerce app that delivers a modern shopping experience with a responsive design, easy navigation, and features built for user comfort.",
    projects_lelangku_desc:
      "A web-based auction app with a simple and interactive interface that makes it easy for users to place bids on items up for auction.",
    projects_spp_desc:
      "A web-based SPP payment app designed to help streamline the recording and management of student payments at the RA Darul Ikhlas educational institution.",
    cta_text: "Let's create something meaningful together!",
    cta_button: "Contact Me",
    contact_title: "Contact Me",
    contact_name: "Name",
    contact_email: "Email",
    contact_message: "Message",
    contact_submit: "Send Message",
  },
  ja: {
    nav_home: "ホーム",
    nav_about: "について",
    nav_portfolio: "ポートフォリオ",
    nav_projects: "プロジェクト",
    nav_resume: "経験",
    nav_contact: "お問い合わせ",
    home_greet: "こんにちは、私は",
    home_name: "Muhammad Akmal",
    home_desc:
      "<span>ソフトウェア開発者</span>で、魅力的で使いやすいWebアプリケーションの構築に情熱を持っています。",
    home_more: 'もっと見る<i class="bx bx-chevron-right ikon"></i>',
    about_title: "私について",
    about_subtitle: "ソフトウェア開発者です。",
    about_description:
      "Webアプリケーション開発に強い関心を持ち、使いやすさとユーザーの快適さを重視しています。シンプルで直感的、そして心地よいインターフェースとワークフローの構築を常に心がけています。",
    resume_title: "学歴・職歴",
    resume_education_date: "2023年7月 - 2026年6月",
    resume_education_title: "ソフトウェアエンジニアリング教育",
    resume_education_description:
      "Webアプリケーション開発、データベース、プログラミングの基礎を学んでいます。",
    resume_education_institution: "SMK TI Pembangunan Cimahi",
    resume_experience_date: "2025年12月 - 2026年4月",
    resume_experience_title: "現場実習",
    resume_experience_description:
      "PHP、CodeIgniter 3、MySQLを使用したWebベースの<i>eコマース</i>アプリケーションを開発しました。",
    resume_experience_institution: "PT Goldstep Teknologi Indonesia",
    projects_title: "プロジェクト",
    projects_bad_habit_desc:
      "非生産的な活動に費やした時間を記録・分析できるWebベースの習慣管理アプリです。レスポンシブなインターフェース、インタラクティブなデータ可視化機能、生産性向上をサポートする機能を備えています。",
    projects_utaps_desc:
      "レスポンシブデザイン、使いやすいナビゲーション、ユーザーの快適さを重視した機能を備えた、モダンなショッピング体験を提供するWebベースの靴ECアプリです。",
    projects_lelangku_desc:
      "シンプルでインタラクティブな画面で、オークション出品中の商品への入札を簡単に行えるWebベースのオークションアプリです。",
    projects_spp_desc:
      "RA Darul Ikhlas教育機関における生徒の支払い記録と管理を効率化するために設計されたWebベースのSPP支払いアプリです。",
    cta_text: "一緒に意味のあるものを作りましょう！",
    cta_button: "お問い合わせ",
    contact_title: "お問い合わせ",
    contact_name: "お名前",
    contact_email: "メールアドレス",
    contact_message: "メッセージ",
    contact_submit: "送信する",
  },
};
const cvFiles = {
  id: "img/CV M Akmal (ID).pdf",
  en: "img/CV M Akmal (EN).pdf",
  ja: "img/CV M Akmal (JP).pdf",
};

// Language Toggle
function setLang(lang) {
  localStorage.setItem("lang", lang);
  applyLang(lang);

  document.querySelectorAll(".lang-switcher button").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

function applyLang(lang) {
  const t = translations[lang] || translations["id"];

  document.querySelectorAll("[data-lgn]").forEach((el) => {
    const key = el.getAttribute("data-lgn");
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll("[data-lgn]").forEach((el) => {
    const key = el.getAttribute("data-lgn");
    if (t[key]) el.innerHTML = t[key];
  });

  document.querySelectorAll("[data-lgn-place]").forEach((el) => {
    const key = el.getAttribute("data-lgn-place");
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll("[data-lgn-value]").forEach((el) => {
    const key = el.getAttribute("data-lgn-value");
    if (t[key]) el.value = t[key];
  });

  const cvLink = document.getElementById("cv-download");
  if (cvLink && cvFiles[lang]) {
    cvLink.href = cvFiles[lang];
    cvLink.setAttribute("download", "");
  }
}

const savedLang = localStorage.getItem("lang") || "id";
setLang(savedLang);

// Image Modal
const modal = document.getElementById("img-modal");
const modalClose = document.getElementById("modal-close");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let currentImages = [];
let currentIndex = 0;

function showImage(index) {
  currentIndex = index;
  modalImg.src = currentImages[currentIndex];

  const hasMultiple = currentImages.length > 1;
  modalPrev.style.display = hasMultiple ? "flex" : "none";
  modalNext.style.display = hasMultiple ? "flex" : "none";

  const counter = document.getElementById("modal-counter");
  if (counter) {
    counter.textContent = hasMultiple
      ? `${currentIndex + 1} / ${currentImages.length}`
      : "";
  }
}

document.querySelectorAll(".row img").forEach((img) => {
  img.addEventListener("click", () => {
    const raw = img.getAttribute("data-images");
    currentImages = raw ? JSON.parse(raw) : [img.src];
    currentIndex = 0;

    modalDesc.textContent = img.closest(".row").querySelector("p").textContent;
    modal.style.display = "flex";
    showImage(0);
  });
});

modalPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  const newIndex =
    (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(newIndex);
});

modalNext.addEventListener("click", (e) => {
  e.stopPropagation();
  const newIndex = (currentIndex + 1) % currentImages.length;
  showImage(newIndex);
});

modalClose.addEventListener("click", function (e) {
  e.stopPropagation();
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Menu Toggle
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const sr = ScrollReveal({
  distance: "60px",
  duration: 2500,
  reset: true,
});

sr.reveal(".home-text", { delay: 200, origin: "top" });
sr.reveal(".home-img", { delay: 400, origin: "top" });
sr.reveal(".about, .cta, .resume, .contact, .footer", {
  delay: 200,
  origin: "top",
});
