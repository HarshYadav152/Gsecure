# G-Secure

🔐 **G-Secure** is a modern, secure, and user-friendly password management solution designed to keep your credentials safe and always within reach. Say goodbye to password anxiety and experience a smarter way to manage your digital life.

---

## 🌟 Features

### Why Choose G-Secure?

- **🔒 Encrypted Vault**  
  Store all your passwords in one secure, encrypted vault.
  
- **🌍 Access Anywhere**  
  Access your credentials anytime, anywhere with ease.

- **🔑 Strong Password Generator**  
  Generate strong, unique passwords in seconds.

- **🛡️ Zero Knowledge Protocol**  
  Your data is encrypted end-to-end, ensuring no one but you can access it.

- **🔍 Breach Check**  
  Check your passwords against known breaches to stay safe.

- **✨ Automatic Form Filling**  
  Save time with automatic form filling and secure sharing.

---

## 🚀 Get Started

1. **Sign Up**  
   Create your free account to start managing your passwords securely.

2. **Try Our Tools**  
   Explore our password generator, strength checker, and breach detection tools.

3. **Stay Secure**  
   Enjoy peace of mind knowing your credentials are safe with G-Secure.

---

## 🧑‍💻 Local Development

To work on the application locally:

1. Clone the repository and change into the app folder:
   ```bash
   git clone https://github.com/KGFCH2/Gsecure.git
   cd Gsecure/gsecure
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file and configure your local values:
   ```bash
   cp .env.local.example .env.local
   ```
4. Update `.env.local` with the actual values for:
   - `MONGODB_URI`
   - `NEXT_PUBLIC_API_HOST`
   - `ACCESS_TOKEN_SECRET`
   - `ACCESS_TOKEN_EXPIRY`
   - SMTP and email settings if you need password reset email support

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open `http://localhost:3000` in your browser.

> Note: the frontend and API are served together from the `gsecure/` folder using Next.js.

---

## 🛠️ Tools and Utilities

- **Password Generator**  
  Create strong, unique passwords tailored to your needs.

- **Password Strength Checker**  
  Evaluate the strength of your passwords in real-time.

- **Breach Detection**  
  Check if your credentials have been exposed in any known data breaches.

---

## 🔗 Links

- [Get Started](https://gsecure.geetasystems.co.in/register)  
- [Learn More About Features](https://gsecure.geetasystems.co.in/features)  
- [Try Our Tools](https://gsecure.geetasystems.co.in/features)

---

## 🛡️ Security

- **256-bit AES Encryption**  
  Your data is encrypted with industry-leading security standards.

- **Zero-Knowledge Architecture**  
  Only you can access your data—no one else, not even us.

- **End-to-End Secure**  
  All communications are encrypted to ensure your data stays safe.

---

## 🧑‍💻 Contributing

We welcome contributions! If you'd like to contribute to G-Secure, please fork the repository and submit a pull request.

---

## 📜 License

G-Secure is licensed under the [MIT License](LICENSE).

---

## 🌟 Stay Secure, Stay Safe!