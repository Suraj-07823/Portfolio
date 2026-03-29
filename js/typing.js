/* ============================================
   TYPING EFFECT
   ============================================
   Cycles through an array of words with a
   typing and deleting animation in the hero.
   ============================================ */

class TypeWriter {
  constructor(element, words, wait = 2000) {
    this.element = element;
    this.words = words;
    this.wait = wait;
    this.wordIndex = 0;
    this.txt = "";
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    let typeSpeed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
