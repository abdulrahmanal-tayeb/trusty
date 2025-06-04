# Trusty - Open Source AI Content Paraphrasing Tool

**Trusty** is a modern, open-source platform built to intelligently paraphrase AI-generated content, tailor tone, and adapt output style (rewrite, summarize, and more). Designed for both web and mobile, Trusty empowers users to transform text effortlessly with precision and purpose.

---
## 🛠️ Technology Stack

- **Backend**: Node.js, OpenAI API, DeepSeek API, Docker  
- **Frontend**: Next.js (React)  
- **Mobile**: Flutter + Dart  

---

## 🧠 How It Works

Trusty operates through a multi-phase text transformation pipeline powered by AI models from OpenAI and DeepSeek. Each phase fine-tunes your input with contextual awareness and tone control, ensuring your content stays relevant, accurate, and tailored—without sounding like a toaster wrote it.

---

## 🚀 Getting Started

### Backend Setup

The backend is containerized for plug-and-play deployment.

1. Clone the repository  
2. Create a `.env` file in the `backend` directory:
    ```env
    OPENAI_APIKEY=your_openai_api_key_here
    DEEPSEEK_APIKEY=your_deepseek_api_key_here
    ```
3. Build and launch:
    ```bash
    docker build -t trusty-backend .
    docker run -p 3000:3000 trusty-backend
    ```

---

### Web Frontend Setup

1. Go to the `frontend` directory  
2. Add a `.env` file with your backend URL:
    ```env
    BASE_URL=http://your_backend_url:port
    ```
3. Install and run:
    ```bash
    pnpm install
    pnpm run dev
    ```

---

### Mobile App Setup

1. Navigate to the `mobile` directory  
2. Add a `.env` file:
    ```env
    BASE_URL=http://your_backend_url:port
    ```
3. Install dependencies:
    ```bash
    flutter pub get
    ```
4. Run it:
    ```bash
    flutter run
    ```

---

## 🤝 Contributing

Your ideas, fixes, and improvements are not just welcome—they’re expected.

1. Fork the repo  
2. Create your branch:
    ```bash
    git checkout -b feature/amazing-feature
    ```
3. Commit:
    ```bash
    git commit -m 'Add some amazing feature'
    ```
4. Push it:
    ```bash
    git push origin feature/amazing-feature
    ```
5. Open a pull request and let's make text better—together.

---

## 📝 License

Trusty is licensed under the MIT License. See the `LICENSE` file for the fine print.

---

## 🙏 Acknowledgements

Powered by OpenAI and DeepSeek. Built by **AmtCode**, where we care about words—and how to make them better without making them weird.
