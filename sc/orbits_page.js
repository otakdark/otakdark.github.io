const instructions = document.querySelector('div#instructions');
const slider = document.querySelector('input#cycle-count');
const sliderDiv = document.querySelector('div#cycle-count-tools');

function showSlider() {
  instructions.style.display = 'none';
  sliderDiv.style.display = 'block';
}

function hideSlider() {
  instructions.style.display = 'block';
  sliderDiv.style.display = 'none';
}

function changeSlider(amount) {
  slider.value = parseInt(slider.value) + amount;
}

function setCycleCountSliderRange() {
  let resetValue = (slider.max === slider.min);
  slider.max = n;
  if (resetValue) {
    slider.value = slider.max;
  }
}

function getCycleCount() {
  if (cycleCount !== slider.value) {
    traced = [];
    cycleCount = slider.value;
  };
}

setInterval(getCycleCount, 10);
slider.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40].includes(e.keyCode)) {
    e.preventDefault();
  }
});