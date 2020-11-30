const fixedHeader = () => {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    if(window.pageYOffset > header.clientHeight) header.classList.add('fixed');
    else if(window.pageYOffset === 0) header.classList.remove('fixed');
  });
}

const toggleMenu = () => {
  const menuList = document.querySelector('.menu-list');
  const openButton = document.querySelector('.open-menu');
  const closeButton = document.querySelector('.close-button');

  openButton.addEventListener('click', () => menuList.classList.add('active'));
  closeButton.addEventListener('click', () => menuList.classList.remove('active'));
}

const smoothLinks = () => {
  const links = document.querySelectorAll('[data-link]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const section = document.querySelector(event.target.hash);
      window.scroll({
        top: section?.offsetTop - 60,
        behavior: 'smooth'
      });
    })
  })
}

const imageSlider = () => {
  let index = 0;
  let movement = 0;
  const texts = [
    "A árvore da vida, uma árvore gigante, porém com escadas dentro dela, redes para dormir, mais de 5 andares, cada qual, com sua respectiva função, como cozinha e uma das principais atrações da Árvore da vida, é sua visão sobre Pandora toda.",
    "Realmente, seria um sonho ficarmos hospedados um dia em uma dessas montanhas, tão altas que nem conseguiríamos ver o próprio chão de Pandora, montanhas flutuantes graças aos Unobtainium, não é atoa que os militares estavam em busca desses minérios super raros e mágicos.",
    "Olhe só o tamanho dessa floresta, coberta de árvores sagradas que tem uma cor e brilho exuberante, imagine passar uma noite, em volta dessas árvores, que escutem suas preces e até mesmo pode ser correspondidas, fora os animais, insetos e plantas diferenciadas que vivem nessa floresta.",
    "Após a floresta de árvores da alma ser devastada, restou-se essa única, gigante e o novo lar dos avatares, que também, não perde nenhum ponto, uma árvore que emite uma luz linda, imagine passando uma noite estrelada ao ar livre e ao lado dessa árvore, seria magnífico."
  ];

  const carousel = document.querySelector('.images');
  carousel.addEventListener('wheel', scrollCarousel);
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('mousemove', dragging);
  carousel.addEventListener('mouseup', stopDrag);
  carousel.addEventListener('mouseleave', stopDrag);

  const miniatures = document.querySelectorAll('.miniature');
  miniatures.forEach((min) => min.addEventListener('click', scrollCarousel));

  const buttons = document.querySelectorAll('.next, .back');
  buttons.forEach((btn) => btn.addEventListener('click', scrollCarousel));

  const imageInfo = document.querySelector('.information-image p');

  const updateText = () => {
    imageInfo.textContent = texts[index];
  }

  const updateMiniature = () => {
    document.querySelector('.miniature.active').classList.remove('active');
    miniatures[index].classList.add('active');
  }

  const setIndex = (multiplier) => {
    const sum = index + multiplier;
    if(sum < 0 || sum >= miniatures.length) return index;
    return sum;
  }

  function scrollCarousel(event) {
    event.preventDefault();
    const { deltaY, target: { className, dataset } } = event;
    const multiplier = deltaY > 0 || className === 'next' ? 1 : -1;
    const indexNum = setIndex(multiplier);
    index = +dataset.index;
    carousel[isNaN(index) ? 'scrollBy' : 'scrollTo']({
      left: carousel.clientWidth * (isNaN(index) ? multiplier : index),
      behavior: 'smooth'
    });
    if(isNaN(index)) index = indexNum;
    updateMiniature();
    updateText();
  }

  function startDrag({ target }) {
    target.classList.add('dragging');
  }

  function dragging({ target, movementX}) {
    if(target.classList.contains('dragging')) {
      movement += movementX;
      target.scrollLeft += movementX * -1.5
    }
  }

  function stopDrag({ target }) {
    setTimeout(() => {
      const passedRight = carousel.scrollLeft > index * carousel.clientWidth;
      const passedLeft = carousel.scrollLeft < index * carousel.clientWidth;
      if(movement > 0 && passedLeft) index--;
      else if(movement < 0 && passedRight) index++;
      movement = 0;
      updateMiniature();
      updateText();
    });
    target.classList.remove('dragging');
  }
}

fixedHeader();
toggleMenu();
smoothLinks();
imageSlider();