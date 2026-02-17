from fastapi import FastAPI, Request, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import time
import redis
import os
import requests
import asyncio

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# --- AEGIS SECURITY CONFIG ---
r = redis.Redis(host='redis', port=6379, db=0, decode_responses=True)
LIMIT = 100 
BAN_TIME = 600 

@app.middleware("http")
async def aegis_deflector(request: Request, call_next):
    client_ip = request.client.host
    
    # 1. Check for Permanent or Temporary Bans
    if r.get(f"perm_ban:{client_ip}"):
        raise HTTPException(status_code=403, detail="IP_PERMANENTLY_BANNED")
    if r.get(f"jail:{client_ip}"):
        raise HTTPException(status_code=429, detail="IP_JAILED_BY_AEGIS")

    # 2. Rate Limiting Logic
    current_second = int(time.time())
    key = f"rate:{client_ip}:{current_second}"
    count = r.incr(key)
    if count == 1: r.expire(key, 2)

    if count > LIMIT:
        r.setex(f"jail:{client_ip}", BAN_TIME, "BANNED")
        return HTTPException(status_code=429, detail="DDoS_PROTECTION_ACTIVATED")

    response = await call_next(request)
    return response

# --- ADMIN SECURITY CONTROLS ---
ADMIN_SECRET = os.getenv("FORTRESS_ADMIN_SECRET")

@app.post("/admin/blacklist")
async def blacklist_ip(ip: str, x_admin_secret: str = Header(None)):
    if x_admin_secret != ADMIN_SECRET: raise HTTPException(status_code=403)
    r.set(f"perm_ban:{ip}", "BANNED")
    return {"status": "SUCCESS", "message": f"IP {ip} blacklisted permanently."}

@app.post("/admin/whitelist")
async def whitelist_ip(ip: str, x_admin_secret: str = Header(None)):
    if x_admin_secret != ADMIN_SECRET: raise HTTPException(status_code=403)
    r.delete(f"perm_ban:{ip}")
    r.delete(f"jail:{ip}")
    return {"status": "SUCCESS", "message": f"IP {ip} restored."}

@app.get("/protocol_stats")
async def protocol_stats():
    try:
        res = requests.get("http://forge:3001/balance", timeout=2).json()
        return {
            "status": "OPERATIONAL",
            "active_jails": len(r.keys("jail:*")),
            "perm_bans": len(r.keys("perm_ban:*")),
            "vault": res.get("cvt")
        }
    except:
        return {"status": "OFFLINE"}
