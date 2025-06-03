// Animasi masuk dinamis: kombinasi fade, slide dari samping, dan scale
// Reset animasi jika discroll ke atas

document.addEventListener("DOMContentLoaded", () => {
    // Daftar elemen dan animasi berbeda untuk tiap section
    const animatedSections = [
        { el: document.querySelector("#me .about-me"), anim: "fadein-left" },
        { el: document.querySelector("#skills .skills-container"), anim: "fadein-right" },
        { el: document.querySelector("#project .container"), anim: "fadein-up" },
        { el: document.querySelector("#social .container"), anim: "fadein-scale" }
    ];

    // Tambahkan kelas awal agar elemen tersembunyi
    animatedSections.forEach(obj => {
        if (obj.el) obj.el.classList.add("animate-hidden");
    });

    // Fungsi cek apakah elemen sudah masuk viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight - 60 &&
            rect.bottom > 0
        );
    }

    // Fungsi animasi bertahap
    function animateOnScroll() {
        let delay = 0;
        animatedSections.forEach((obj, idx) => {
            if (!obj.el) return;
            // Jika masuk viewport dan masih hidden, animasikan
            if (obj.el.classList.contains("animate-hidden") && isInViewport(obj.el)) {
                setTimeout(() => {
                    obj.el.classList.remove("animate-hidden");
                    obj.el.classList.add(obj.anim);
                }, delay);
                delay += 220;
            }
            // Jika keluar viewport ke atas, reset animasi
            else if (
                obj.el.classList.contains(obj.anim) &&
                obj.el.getBoundingClientRect().top > window.innerHeight
            ) {
                obj.el.classList.remove(obj.anim);
                obj.el.classList.add("animate-hidden");
            }
            // Jika keluar viewport ke bawah, reset animasi
            else if (
                obj.el.classList.contains(obj.anim) &&
                obj.el.getBoundingClientRect().bottom < 0
            ) {
                obj.el.classList.remove(obj.anim);
                obj.el.classList.add("animate-hidden");
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();
});