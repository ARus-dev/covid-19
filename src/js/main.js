svg4everybody()

const cookie = document.querySelector('.cookie')
const closeCookie = document.querySelector('.cookie__close')

const btn = document.querySelector('.header__btn')

cookie.style.display = 'block'

closeCookie.addEventListener('click', () => {
	cookie.remove()
})

btn.addEventListener('click', e => {
	e.preventDefault()

	const id = btn.getAttribute('href').substr(1)

	document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
})