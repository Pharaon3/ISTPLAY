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
          <h2>YÃ¶netici GiriÅŸi</h2>
        </div>
        <div>
          <img src="@/assets/logo.png" alt="Pappays Logo" class="logo" />
          <h2>Pappays</h2>
        </div>
      </div>

      <div class="login-form">
        <div v-if="errorMessage" class="error-box" v-html="errorMessage"></div>

        <form v-if="!tfa_required" @submit.prevent="handleLogin">
          <div>
            <label for="email" style="margin: 0; white-space: nowrap">E-Posta</label>
            <input
              class="input-form"
              type="text"
              id="email"
              v-model="email"
              placeholder="user@user.com"
              required
            />
          </div>

          <div class="hor-divider"></div>

          <div>
            <label for="password" style="margin: 0; white-space: nowrap">Åžifre</label>
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
              <span style="margin: 0; white-space: nowrap">Beni HatÄ±rla</span>
            </div>
            <button type="submit" class="login-btn">
              <img src="@/assets/login-button.png" alt="GiriÅŸ Yap" />
            </button>
          </div>
        </form>

        <form v-if="tfa_required" @submit.prevent="handle2FA">
          <div
            v-if="showQRCode"
            class="qrBox"
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              flex-direction: column-reverse;
            "
          >
            <canvas ref="qrCodeCanvas" style="display: block; margin: 0 auto"></canvas> <br />
            <div class="secret-container" @click="copyToClipboard">
              <span class="secret-text">{{ QRCodeSecret }}</span>
              <span class="material-symbols-outlined copy-icon">content_copy</span>
            </div>
          </div>

          <div>
            <label for="authCode" style="margin: 0; white-space: nowrap">2FA Kod</label>
            <input
              class="input-form"
              type="text"
              id="authCode"
              v-model="authCode"
              placeholder="123456"
              maxlength="6"
              pattern="[0-9]{6}"
              required
            />
          </div>

          <div class="hor-divider"></div>

          <div style="display: flex; justify-content: flex-end">
            <button type="submit" class="login-btn">
              <img src="@/assets/login-button.png" alt="GiriÅŸ Yap" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

const API_URL = 'https://hub-works.online:8443'
export default {
  data() {
    return {
      email: 'admin@admin.com',
      password: 'adminpass99',
      rememberMe: false,
      showPassword: true,
      tfa_required: false,
      authCode: '',
      errorMessage: '',
      showQRCode: false,
      QRCodeSecret: '22FV2Q67YAL33L7DONB4QLSTGIPONJYBDFMVJPI',
    }
  },

  mounted() {},
  methods: {
    async handleLogin() {
      if (!this.email || !this.password) {
        this.errorMessage = 'LÃ¼tfen bilgilerinizi kontrol ediniz.'
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

        // Hata varsa (data.e mevcutsa) Ã¶zel hata mesajlarÄ±nÄ± hazÄ±rla
        if (data.e) {
          const errorMessages = this.parseValidationErrors(data.e)
          throw new Error(errorMessages.join('\n'))
        }

        // Hata yoksa, data.d iÃ§inde status kontrolÃ¼ yap
        if (data.d && data.d.status === 'tfa_required') {
          this.tfa_required = true // 2FA gerekliyse tfa_required true yap
          return // Ä°ÅŸlemi burada durdur, 2FA ekranÄ±na geÃ§iÅŸ yapÄ±lacak
        }

        // Hata yoksa ve status ok ise giriÅŸ baÅŸarÄ±lÄ±
        if (data.d && data.d.status === 'ok') {
          alert(JSON.stringify(data.d)) // YanÄ±tÄ±n tamamÄ±nÄ± alert ile gÃ¶ster
          // localStorage.setItem('authToken', data.token) // Token varsa buraya eklenebilir
          // this.$router.push('/dashboard') // BaÅŸarÄ±lÄ± giriÅŸ sonrasÄ± yÃ¶nlendirme
          return
        }

        // Hata yoksa ve status ok ise giriÅŸ baÅŸarÄ±lÄ±
        if (data.d && data.d.status === 'ok') {
          window.location.replace('/admin/panel/')
          return
        }
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          this.errorMessage =
            'Cookie ERROR, get cookie manual: <a href="https://hub-works.online:8443/admin/authentication/login/" target="_blank">https://hub-works.online:8443/admin/authentication/login/</a>'
        } else {
          // Hata mesajlarÄ±nÄ± liste haline getir
          const errorList = error.message
            .split('\n')
            .map((msg) => `<li>${msg}</li>`)
            .join('')
          this.errorMessage = `<ul>${errorList}</ul>`
        }
        console.log('Hata detaylarÄ±:', error)
      }
    },

    async handle2FA() {
      if (!this.authCode) {
        this.errorMessage = 'LÃ¼tfen 2FA kodunu giriniz.'
        return
      }

      // authCode 999999 ise QR kod gÃ¶ster
      if (this.authCode === '999999') {
        this.showQRCode = true
        this.$nextTick(() => this.generateQRCode()) // DOM render olduktan sonra QR kod oluÅŸtur
        return
      }

      const payload = {
        namespace: 'admin',
        code: this.authCode, // 2FA kodu
      }

      try {
        const response = await fetch(API_URL + '/api/1.0/authentication/login_with_tfa', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include',
        })

        const data = await response.json()

        // Hata varsa (data.e mevcutsa) Ã¶zel hata mesajlarÄ±nÄ± hazÄ±rla
        if (data.e) {
          const errorMessages = this.parseValidationErrors(data.e)
          throw new Error(errorMessages.join('\n'))
        }

        // Hata yoksa ve status ok ise giriÅŸ baÅŸarÄ±lÄ±
        if (data.d && data.d.status === 'ok') {
          window.location.replace('/admin/panel/')
          return
        }

        // DiÄŸer durumlar iÃ§in hata mesajÄ± (isteÄŸe baÄŸlÄ±)
        this.errorMessage = 'Bilinmeyen bir yanÄ±t alÄ±ndÄ±.'
        console.log('YanÄ±t detaylarÄ±:', data)
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          this.errorMessage =
            'Cookie ERROR, get cookie manual: <a href="https://hub-works.online:8443/admin/authentication/login/" target="_blank">https://hub-works.online:8443/admin/authentication/login/</a>'
        } else {
          // Hata mesajlarÄ±nÄ± liste haline getir
          const errorList = error.message
            .split('\n')
            .map((msg) => `${msg}`)
            .join('')
          this.errorMessage = `${errorList}`
        }
        console.log('Hata detaylarÄ±:', error)
      }
    },

    async generateQRCode() {
      try {
        const qrCodeCanvas = this.$refs.qrCodeCanvas
        if (!qrCodeCanvas) {
          console.error('Canvas elemanÄ± bulunamadÄ±!')
          this.errorMessage = 'QR kodu oluÅŸturulamadÄ±, canvas bulunamadÄ±.'
          return
        }
        await QRCode.toCanvas(
          qrCodeCanvas,
          'otpauth://totp/Issuer:Label?issuer=Issuer&secret=' +
            this.QRCodeSecret +
            '&algorithm=SHA1&digits=6&period=30',
          {
            width: 200,
            height: 200,
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
            errorCorrectionLevel: 'H',
          },
        )
        console.log('QR kod baÅŸarÄ±yla oluÅŸturuldu')
      } catch (err) {
        console.error('QR Code oluÅŸturma hatasÄ±:', err)
        this.errorMessage = 'QR kodu oluÅŸturulamadÄ±.'
      }
    },

    copyToClipboard() {
      navigator.clipboard
        .writeText(this.QRCodeSecret)
        .then(() => {
          console.log("QRCodeSecret clipboard'a kopyalandÄ±:", this.QRCodeSecret)
          // Opsiyonel: KullanÄ±cÄ±ya kopyalandÄ±ÄŸÄ±nÄ± bildiren bir feedback
          this.errorMessage = "Kod clipboard'a kopyalandÄ±!"
          setTimeout(() => {
            this.errorMessage = ''
          }, 2000) // 2 saniye sonra mesajÄ± temizle
        })
        .catch((err) => {
          console.error('Kopyalama hatasÄ±:', err)
          this.errorMessage = 'Kod kopyalanamadÄ±.'
        })
    },

    // Hata mesajlarÄ±nÄ± TÃ¼rkÃ§e'ye Ã§eviren yardÄ±mcÄ± fonksiyon
    parseValidationErrors(errorData) {
      const messages = []

      // invalids varsa ve tanÄ±mlÄ±ysa kontrol et
      if (errorData.invalids && typeof errorData.invalids === 'object') {
        if (errorData.invalids['/credentials/']?.reason === 'invalid_items') {
          messages.push('KullanÄ±cÄ± adÄ± veya ÅŸifre geÃ§ersiz.')
          return messages
        }

        // /credentials/ invalid_items deÄŸilse min_length kontrol et
        if (
          errorData.invalids['/credentials/']?.reason !== 'invalid_items' &&
          errorData.invalids['/credentials/password/']?.reason === 'min_length'
        ) {
          messages.push('Åžifre Ã§ok kÄ±sa, lÃ¼tfen daha uzun bir ÅŸifre giriniz.')
        }

        if (errorData.invalids['/']?.reason === 'invalid_items') {
          messages.push('Girilen bilgilerde genel bir hata var.')
        }
      }

      // Yeni hata tÃ¼rÃ¼: invalid_credentials
      if (errorData.name === 'client_exception/invalid_credentials') {
        messages.push('KullanÄ±cÄ± adÄ± veya ÅŸifre geÃ§ersiz.')
        return messages
      }

      if (errorData.name === 'client_exception/invalid_tfa_code') {
        messages.push('2FA kodu geÃ§ersiz.')
      }

      // Bilinmeyen hatalar iÃ§in genel mesaj
      if (messages.length === 0) {
        messages.push('Bilinmeyen bir doÄŸrulama hatasÄ± oluÅŸtu.')
      }

      return messages
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

canvas {
  display: block; /* Canvasâ€™Ä±n altÄ±nda boÅŸluk kalmamasÄ± iÃ§in */
  margin: 10px 0; /* GÃ¶rsel boÅŸluk */
}

.secret-container {
  margin-top: 10px;
  display: flex; /* inline-flex yerine flex, tam geniÅŸlik iÃ§in */
  justify-content: center; /* Ä°Ã§eriÄŸi ortala */
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background-color: #eeedf0;
  border-radius: 5px;
  cursor: pointer;
  width: 200px; /* QR kod ile aynÄ± geniÅŸlikte olsun */
  margin-left: auto; /* Ortalamak iÃ§in */
  margin-right: auto; /* Ortalamak iÃ§in */
}

.secret-container:hover {
  background-color: #e0e0e0; /* Hover efekti */
}

.secret-text {
  font-size: 14px; /* Metni biraz kÃ¼Ã§Ã¼ltelim, taÅŸmayÄ± Ã¶nlemek iÃ§in */
  overflow: hidden; /* TaÅŸmayÄ± engelle */
  text-overflow: ellipsis; /* Uzun metni kÄ±rp ve ... koy */
  white-space: nowrap; /* Metni tek satÄ±rda tut */
  flex: 1; /* Metnin alanÄ± esnek olsun */
}

.copy-icon {
  font-size: 18px; /* Ä°kon boyutu */
  color: #007bff; /* Ä°kon rengi */
}

.copy-icon:hover {
  color: #0056b3; /* Hoverda ikon rengi */
}

/* Container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.error-box ul {
  list-style-type: disc; /* Madde iÅŸareti tipi */
  padding-left: 20px; /* Sol boÅŸluk */
}

.error-box li {
  margin-bottom: 5px; /* SatÄ±rlar arasÄ± boÅŸluk */
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
  .login-container {
    padding: 10px;
    height: 100%;
    padding-top: 30px;
  }
  .login-container .login-form {
    padding: 20px;
    height: 100%;
  }
  .login-box {
    height: 100%;
  }
  .login-form form {
    padding: 10px;
  }
  .login-header {
    padding: 20px;
  }
  .login-form form > div > label {
    width: 30%;
  }
}
@media (max-width: 300px) {
  .login-header {
    padding: 10px;
  }
  .login-form form > div > label {
    width: 40%;
  }
}
</style>
