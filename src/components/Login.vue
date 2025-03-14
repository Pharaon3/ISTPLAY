<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
  />

  <div class="login-container">
    <div class="mobile-logo-container">
      <img src="@/assets/logo.png" alt="Pappays Logo" class="logo" />
      <h2>Pappays</h2>
    </div>
    <div class="login-box">
      <!-- Header -->
      <div class="login-header">
        <div>
          <img src="@/assets/user.png" alt="user icon" />
          <h2>Kayıtlı Kullanıcı</h2>
        </div>
        <div>
          <img src="@/assets/logo.png" alt="Pappays Logo" class="logo" />
          <h2>Pappays</h2>
        </div>
      </div>

      <div class="login-form">
        <div v-if="errorMessage" class="error-box">{{ errorMessage }}</div>
        <form @submit.prevent="handleLogin">
          <div>
            <label for="email">E-Posta</label>
            <input
              class="input-form"
              type="text"
              id="email"
              v-model="email"
              placeholder="Eldar İbragimov"
              required
            />
          </div>

          <div class="hor-divider"></div>

          <div>
            <label for="password">Şifre</label>
            <div class="input-form">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                placeholder="******"
                required
              />
              <span class="button material-symbols-outlined" @click="togglePassword">
                {{ showPassword ? 'visibility_off' : 'visibility' }}
              </span>
            </div>
          </div>

          <div class="hor-divider"></div>

          <div>
            <div class="toggle-container">
              <label class="switch">
                <input type="checkbox" v-model="rememberMe" />
                <span class="slider"></span>
              </label>
              <span>Beni Hatırla</span>
            </div>
            <button type="submit" class="login-btn">
              <img src="@/assets/login-button.png" alt="Giriş Yap" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'https://hub-works.online:8443'
export default {
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      errorMessage: '',
    }
  },
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = 'Lütfen bilgilerinizi kontrol ediniz.'
        return
      }

      const payload = {
        namespace: 'admin',
        credentials: {
          username: this.email,
          password: this.password,
        },
        persistent: this.rememberMe,
      }

      try {
        const response = await fetch(API_URL + '/api/1.0/authentication/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Giriş başarısız!')
        }

        alert('Giriş başarılı!')
        // Store token in localStorage/sessionStorage
        localStorage.setItem('authToken', data.token)
        // Redirect to dashboard or admin page
        this.$router.push('/dashboard') // Use Vue Router for navigation
      } catch (error) {
        this.errorMessage = error.message // Handle error
        console.log(error)
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword
    },
  },
}
</script>

<style>
/* Background */
body {
  font-family: Arial, sans-serif;
  background: url('@/assets/background.png');
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Manrope;
  margin: 0;
}

/* Container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.png');
  flex-direction: column;
  padding: 20px;
}

/* Login Box */
.login-box {
  border-radius: 12px;
  max-width: 1074px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  background-color: rgba(162, 162, 162, 0.25);
  border-radius: 20px;
  margin: 10px;
}

.login-container .login-form {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 100px;
}

.login-form .error-box {
  max-width: 640px;
  background-color: #fdd9d7;
  color: #7f231c;
  border-color: rgba(0, 0, 0, 0.1);
  border-width: 1px;
  border-style: solid;
  border-radius: 20px;
  width: 100%;
  padding: 18px;
  font-size: 14px;
  font-weight: 700;
}

.login-form form {
  max-width: 640px;
  background-color: white;
  border-radius: 20px;
  width: 100%;
  padding: 25px;
  color: black;
}

.login-form form > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-form form > div > label {
  width: 20%;
  font-weight: bold;
}

.login-form form > div .input-form {
  border-radius: 18px;
  border-width: 0;
  background-color: #eeedf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
}

.input-form input {
  background-color: transparent;
  border: none;
  margin: 0;
  padding-left: 0;
}

.login-form form input:focus {
  outline: none;
}

.input-form .button {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
}

/* Header */
.login-header {
  display: flex;
  align-items: center;
  padding: 30px;
  justify-content: space-between;
}

.login-header div {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.login-header .logo {
  width: 50px;
}

/* Input Fields */
input {
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Toggle Switch */
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 30px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
  margin-right: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 20px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #007bff;
}

input:checked + .slider:before {
  transform: translateX(14px);
}

.hor-divider {
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.1);
  height: 1px;
  width: 100%;
}

.login-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.login-btn img {
  width: 100px; /* Adjust size */
  height: auto;
  transition: transform 0.2s;
}

.login-btn img:hover {
  transform: scale(1.05);
}

.mobile-logo-container {
  display: none;
}

@media (max-width: 500px) {
  .mobile-logo-container {
    display: flex;
    align-items: center;
    justify-content: left;
    gap: 20px;
    width: 100%;
    padding-left: 10%;
  }
  .login-header div:nth-child(2) {
    display: none;
  }
  .login-form > form div:nth-child(5) {
    flex-direction: column;
  }
  .login-form > form div:nth-child(5) > div {
    width: 100%;
  }
  .login-form > form div:nth-child(5) > button {
    display: flex;
    justify-content: end;
    width: 100%;
    margin: 10px;
  }
}
</style>
