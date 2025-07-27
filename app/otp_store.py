import random

# Store OTPs in memory temporarily
otp_store = {}

def generate_otp():
    return str(random.randint(1000, 9999))

def save_otp(phone: str):
    otp = generate_otp()
    otp_store[phone] = otp
    return otp

def verify_otp(phone: str, otp: str) -> bool:
    return otp_store.get(phone) == otp