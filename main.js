// Scroll-triggered reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

// Typing animation for the popover live text
const phrases = [
  'Let me write a quick summary of the meeting notes from today...',
  'Remind me to call the dentist tomorrow morning at 9am.',
  'The API endpoint should return a 404 when the resource is not found.',
  'Send an email to the team about the launch timeline.',
]

const typingEl = document.querySelector('.typing-text')
if (typingEl) {
  let phraseIndex = 0

  function typePhrase() {
    const phrase = phrases[phraseIndex]
    let charIndex = 0
    typingEl.textContent = ''

    const typeInterval = setInterval(() => {
      typingEl.textContent = phrase.slice(0, charIndex + 1)
      charIndex++
      if (charIndex >= phrase.length) {
        clearInterval(typeInterval)
        // Pause, then clear and start next phrase
        setTimeout(() => {
          typingEl.textContent = ''
          phraseIndex = (phraseIndex + 1) % phrases.length
          setTimeout(typePhrase, 400)
        }, 2500)
      }
    }, 35)
  }

  // Start typing after the popover animation completes
  setTimeout(typePhrase, 1600)
}
