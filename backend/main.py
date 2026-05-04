from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import uuid

load_dotenv()

from rag import ask_rag, upsert_data
from data import data

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- DATA ----------------

users = {
    "admin": "1234",
    "charan": "pass"
}

active_tokens = {}
user_carts = {}

offers = [
    {"code": "SAVE50", "discount": 50, "image": "https://images.unsplash.com/photo-1651978595428-b79169f223a5"},
    {"code": "WELCOME10", "discount": 10, "image": "https://images.unsplash.com/photo-1627373719412-746f5c1e5363"},
    {"code": "FEAST30", "discount": 30, "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
    {"code": "HUNGRY20", "discount": 20, "image": "https://images.unsplash.com/photo-1504674900247-0877df9cc836"},
    {"code": "NEWUSER40", "discount": 40, "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0"},
    {"code": "WEEKEND15", "discount": 15, "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"},
]

# ---------------- HELPERS ----------------

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not logged in")
    token = authorization.split("Bearer ")[1]
    if token not in active_tokens:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return active_tokens[token]

# ---------------- MODELS ----------------

class ChatRequest(BaseModel):
    message: str

# ---------------- ROUTES ----------------

@app.get("/")
def home():
    return {"message": "Backend running 🚀"}

@app.post("/login")
def login(body: dict):
    username = body.get("username")
    password = body.get("password")
    if username in users and users[username] == password:
        token = str(uuid.uuid4())
        active_tokens[token] = username
        if username not in user_carts:
            user_carts[username] = []
        return {"token": token, "username": username}
    return {"error": "Invalid credentials"}

@app.post("/logout")
def logout(authorization: str = Header(None)):
    try:
        get_current_user(authorization)
        token = authorization.split("Bearer ")[1]
        del active_tokens[token]
        return {"message": "Logged out"}
    except:
        return {"message": "Already logged out"}

@app.get("/verify")
def verify(authorization: str = Header(None)):
    try:
        username = get_current_user(authorization)
        return {"valid": True, "username": username}
    except:
        return {"valid": False}

@app.get("/cart")
def get_cart(authorization: str = Header(None)):
    username = get_current_user(authorization)
    return user_carts.get(username, [])

@app.post("/cart/add")
def add_to_cart(item: dict, authorization: str = Header(None)):
    username = get_current_user(authorization)
    if username not in user_carts:
        user_carts[username] = []
    user_carts[username].append(item)
    return {"message": f"Item added to {username}'s cart"}

@app.post("/cart/clear")
def clear_cart(authorization: str = Header(None)):
    username = get_current_user(authorization)
    user_carts[username] = []
    return {"message": "Cart cleared"}

@app.get("/offers")
def get_offers():
    return offers

@app.post("/order")
def order(authorization: str = Header(None)):
    username = get_current_user(authorization)
    order_data = user_carts.get(username, [])
    user_carts[username] = []
    return {"message": "Order placed", "items": order_data}

@app.get("/init")
def init_rag():
    upsert_data(data)
    return {"msg": "Data inserted into Pinecone ✅"}

@app.post("/chat")
def chat(req: ChatRequest):
    reply = ask_rag(req.message)
    return {"reply": reply}
