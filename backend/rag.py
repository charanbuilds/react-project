import os
from dotenv import load_dotenv

load_dotenv()

from pinecone import Pinecone
from groq import Groq
from sentence_transformers import SentenceTransformer

# Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index = pc.Index(os.getenv("PINECONE_INDEX"))

# Groq (free LLM)
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
print(client)

# HuggingFace (free embeddings)
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


def upsert_data(data):
    # 🔥 STEP 1: Delete ALL old vectors first
    index.delete(delete_all=True)
    print("🗑️ Deleted all old vectors from Pinecone")

    # ✅ STEP 2: Insert fresh data
    vectors = []
    for item in data:
        embedding = embedding_model.encode(item["text"]).tolist()
        vectors.append({
            "id": item["id"],
            "values": embedding,
            "metadata": {"text": item["text"]}
        })
    index.upsert(vectors=vectors)
    print(f"✅ Upserted {len(vectors)} vectors")


def ask_rag(query: str) -> str:
    # 1. Embed the query
    query_embedding = embedding_model.encode(query).tolist()

    # 2. Search Pinecone
    results = index.query(
        vector=query_embedding,
        top_k=5,  # 🔄 Changed from 3 to 5 to get more relevant results
        include_metadata=True
    )

    # 3. Build context
    context = "\n".join([
        match["metadata"]["text"]
        for match in results["matches"]
    ])

    # 4. Ask Groq
    chat_response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": """You are a helpful assistant for a food delivery app called Swiggy. 
Answer only using the context provided. 
You have data about 9 restaurants. 
If asked about cuisines, offers, ratings, delivery time, or veg options, use the context to answer accurately.
Be friendly and concise."""
            },
            {
                "role": "user",
                "content": f"Context:\n{context}\n\nQuestion: {query}"
            }
        ]
    )
    return chat_response.choices[0].message.content
