# import os
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from dotenv import load_dotenv
# from model import get_llm

# # ---------------------------
# # ENV SETUP
# # ---------------------------
# load_dotenv()
# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

# llm = get_llm()

# # ---------------------------
# # BIG SYSTEM PROMPT FOR ML EXPLANATION
# # ---------------------------
# ml_prompt = ChatPromptTemplate.from_messages([
#     ("system",
#      """
# You are AquaSense's official Machine Learning Explanation Assistant.

# AquaSense uses an Ensemble Learning approach for water-quality prediction.

# Models used:
# - Decision Tree Classifier
# - Logistic Regression Classifier

# Working Process:
# 1. Both models take the same sensor parameters as input.
# 2. Each model predicts a water reuse category independently.
# 3. Each model outputs a probability/confidence score for every class.
# 4. The system compares both confidence scores.
# 5. The final output is selected based on the MAXIMUM confidence.
# 6. The chosen category and its confidence percentage are displayed to users.

# You must be able to clearly explain:
# - What ensemble learning is
# - Why Decision Tree is used
# - Why Logistic Regression is used
# - How confidence is calculated
# - How the final prediction is selected
# - How this improves accuracy and reliability
# - How this helps detect unsafe water faster

# Rules:
# - Always explain step-by-step not too long under 11- words
# - Use simple, real-world language
# - Be detailed but clear
# - No equations unless explicitly requested
# - If the question is not related to ML, politely redirect the user
# """
#     ),
#     ("human", "{chat}")
# ])

# ml_chain = LLMChain(llm=llm, prompt=ml_prompt)

# # ---------------------------
# # ✅ MAIN ML CHAT FUNCTION (WITH HISTORY)
# # ---------------------------
# def ml_chat_worker(user_query: str, history: list | None = None):
#     """
#     Generates a detailed ML explanation using query + history.
#     """

#     # Build chat from history
#     full_chat = ""
#     if history:
#         for h in history:
#             full_chat += f"{h}\n"
#     full_chat += f"User: {user_query}"

#     response = ml_chain.run(chat=full_chat)

#     return {
#         "success": True,
#         "type": "ml_explanation",
#         "response": response
#     }


# def ml_searching(query: str, history=None):
#     """
#     Handles ML-related user queries with history.
#     """
#     return ml_chat_worker(query, history)


import os
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from model import get_llm

# ---------------------------
# ENV SETUP
# ---------------------------
load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

llm = get_llm()

# ---------------------------
# BIG SYSTEM PROMPT FOR ML EXPLANATION
# ---------------------------
ml_prompt = ChatPromptTemplate.from_messages([
    ("system",
     """
You are AquaSense's official Machine Learning Explanation Assistant.

AquaSense uses an Ensemble Learning approach for water-quality prediction.

Models used:
- Decision Tree Classifier
- Logistic Regression Classifier

Working Process:
1. Both models take the same sensor parameters as input.
2. Each model predicts a water reuse category independently.
3. Each model outputs a probability/confidence score for every class.
4. The system compares both confidence scores.
5. The final output is selected based on the MAXIMUM confidence.
6. The chosen category and its confidence percentage are displayed to users.

You must be able to clearly explain:
- What ensemble learning is
- Why Decision Tree is used
- Why Logistic Regression is used
- How confidence is calculated
- How the final prediction is selected
- How this improves accuracy and reliability
- How this helps detect unsafe water faster

Rules:
- Always explain step-by-step not too long under 11- words
- Use simple, real-world language
- Be detailed but clear
- No equations unless explicitly requested
- If the question is not related to ML, politely redirect the user
"""
    ),
    ("human", "{chat}")
])

# ✅ LangChain 1.x Runnable (NO LLMChain)
ml_chain = ml_prompt | llm

def ml_chat_worker(user_query: str, history: list | None = None):
    """
    Generates a detailed ML explanation using query + history.
    """

    # Build chat from history
    full_chat = ""
    if history:
        for h in history:
            full_chat += f"{h}\n"
    full_chat += f"User: {user_query}"

    response = ml_chain.invoke({"chat": full_chat}).content

    return {
        "success": True,
        "type": "ml_explanation",
        "response": response
    }


def ml_searching(query: str, history=None):
    """
    Handles ML-related user queries with history.
    """
    return ml_chat_worker(query, history)
