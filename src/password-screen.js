class PasswordScreen extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="password-screen">
        <div class="password-container">
          <input type="password" id="password-input" placeholder="Enter password">
          <button id="submit-btn">Submit</button>
        </div>
      </div>
    `;

    const passwordInput = this.querySelector('#password-input');
    const submitBtn = this.querySelector('#submit-btn');
    const passwordScreen = this.querySelector('.password-screen');

    submitBtn.addEventListener('click', () => {
      if (passwordInput.value === 'fashion') {
        passwordScreen.style.display = 'none';
      }
    });

    // Also allow Enter key to submit
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (passwordInput.value === 'fashion') {
          passwordScreen.style.display = 'none';
        }
      }
    });
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name, old_value, new_value) {
    switch(name) {
      default:
    }
  }
}

customElements.define('password-screen', PasswordScreen); 