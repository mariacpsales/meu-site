// Script para Menu Mobile Responsivo

document.addEventListener('DOMContentLoaded', function() {
  
  // Criar botão do menu se não existir
  const menu = document.querySelector('.menu');
  
  if (menu && !document.querySelector('.menu-toggle')) {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Menu de navegação');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    menu.insertBefore(menuToggle, menu.firstChild);
  }
  
  // Função para toggle do menu
  const menuToggle = document.querySelector('.menu-toggle');
  const menuList = document.querySelector('.menu ul');
  
  if (menuToggle && menuList) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuList.classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu ul a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menuList.classList.remove('active');
          menuToggle.classList.remove('active');
        }
      });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && menuList.classList.contains('active')) {
        menuList.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  }
  
  // Ajustar altura do banner em dispositivos móveis
  function adjustBannerHeight() {
    const banners = document.querySelectorAll('.panel, .panel2');
    
    banners.forEach(banner => {
      if (window.innerWidth <= 480) {
        banner.style.minHeight = '250px';
      } else if (window.innerWidth <= 768) {
        banner.style.minHeight = '300px';
      } else if (window.innerWidth <= 1024) {
        banner.style.minHeight = '400px';
      } else {
        banner.style.minHeight = '500px';
      }
    });
  }
  
  adjustBannerHeight();
  window.addEventListener('resize', adjustBannerHeight);
  
  // Smooth scroll para links âncora (opcional)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Prevenir zoom em inputs no iOS
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (viewportMeta) {
    viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
  }
}

// Log para debug (remover em produção)
console.log('Menu mobile carregado com sucesso!');