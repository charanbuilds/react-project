# 🍔 Food orcdering website with AI Chatbot

A full-stack food delivery web application built using **React** and **FastAPI**, enhanced with an **AI-powered chatbot using Groq API**.

---

## Features

* Food ordering UI (Swiggy-like)
* Fast backend using FastAPI
* AI chatbot integration (Groq)
* Responsive design
* Frontend + backend API integration

---

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** FastAPI (Python)
* **AI:** Groq API

---

##  Setup Instructions

### 1. Clone the repository

git clone https://github.com/charanbuilds/react-project.git

---

### 2. Backend Setup

cd backend

Create virtual environment:
python -m venv .venv

Activate it:
source .venv/bin/activate

Install dependencies:
pip install -r requirements.txt

---

### 3. Create `.env` file

Inside the `backend` folder, create a `.env` file and add:

GROQ_API_KEY=your_api_key_here

---

### 4. Run Backend

uvicorn main:app --reload

---

### 5. Run Frontend

Go back to root folder:

cd ..

Install dependencies:
npm install

Start frontend:
npm run dev

---

## Environment Variables

This project uses environment variables for security.

Required:

GROQ_API_KEY=your_api_key_here

---

## Notes

* `.env` file is not included for security reasons
* Use your own Groq API key
* Make sure backend is running before frontend

---

## Future Improvements

* Add authentication (login/signup)
* Deploy backend & frontend
* Improve chatbot responses
* Add payment integration

---

## Author

Hari Charan
