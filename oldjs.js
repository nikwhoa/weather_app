const wrapperBG = document.querySelector('.wrapper'),
    cloudy = document.querySelector('.cloudy'),
    title = document.querySelector('.title'),
    degrees = document.querySelector('.degrees'),
    celsius = '<span>&#8451;</span>',
    icon = document.querySelector('.icon'),
    iconSVG = icon.firstChild,
    cloudyPictures = ['url("images/cloudy2.jpg")', 'url("images/cloudy.jpg")']

wrapperBG.style.backgroundImage = cloudyPictures[0]

if (wrapperBG.style.backgroundImage == cloudyPictures[0]) {
    wrapperBG.style.color = 'white'
    iconSVG.style.fill = 'white'
}
// cloudy.nextElementSibling.backgroundImage = 'url("images/cloudy-svg.svg")'
degrees.innerHTML = `11 ${celsius}`
iconSVG.src = 'images/cloudy-svg.svg'
console.dir(iconSVG)

