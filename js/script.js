function downloadPDF(){
  const btn = document.getElementById('pdfBtn');
  btn.disabled = true;
  btn.textContent = 'Генерация...';

  const element = document.getElementById('presskit');
  const opt = {
    margin: 0,
    filename: 'Alex_Drevel_Press_Kit.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#0a0e1a',
      logging: false
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['css', 'legacy'], after: '.page' }
  };

  html2pdf().set(opt).from(element).save().then(()=>{
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
  }).catch(err=>{
    console.error(err);
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
    alert('Ошибка генерации PDF. Попробуйте печать через браузер (Ctrl+P).');
  });
}

// Плавное появление страниц при скролле
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity = 1;
      e.target.style.transform = 'translateY(0)';
    }
  });
},{threshold:0.1});

document.querySelectorAll('.page').forEach((p,i)=>{
  if(i > 0){
    p.style.opacity = 0;
    p.style.transform = 'translateY(30px)';
    p.style.transition = 'opacity .8s ease, transform .8s ease';
    observer.observe(p);
  }
});