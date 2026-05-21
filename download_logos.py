import urllib.request
import os
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

OUTPUT_DIR = r"c:\Users\gpasq\Desktop\Gabin\Site_maillot\assets\wishlist"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Direct badge URLs from TheSportsDB (using known team IDs and their badge hashes)
# These are direct image URLs that bypass the search API entirely
DIRECT_LOGOS = {
    "logo_bayern.png": "https://r2.thesportsdb.com/images/media/team/badge/rw3kio1535884게466.png",
    "logo_psg.png": "https://r2.thesportsdb.com/images/media/team/badge/rwqrrq1473504808.png",
    "logo_realmadrid.png": "https://r2.thesportsdb.com/images/media/team/badge/vwvwrw1473502969.png",
    "logo_acmilan.png": "https://r2.thesportsdb.com/images/media/team/badge/uvxuqq1473502906.png",
}

# Use lookupteam endpoint with known IDs (more reliable than search)
TEAMS_BY_ID = [
    (133597, "logo_bayern.png", "Bayern Munich"),
    (133714, "logo_psg.png", "Paris Saint-Germain"),
    (134269, "logo_angers.png", "Angers"),
    (133738, "logo_realmadrid.png", "Real Madrid"),
    (133606, "logo_acmilan.png", "AC Milan"),
    (134274, "logo_napoli.png", "SSC Napoli"),
    (133604, "logo_arsenal.png", "Arsenal"),
    (133601, "logo_astonvilla.png", "Aston Villa"),
    (134011, "logo_bournemouth.png", "AFC Bournemouth"),
    (133608, "logo_brentford.png", "Brentford"),
    (133619, "logo_brighton.png", "Brighton"),
    (133610, "logo_chelsea.png", "Chelsea"),
    (133632, "logo_crystalpalace.png", "Crystal Palace"),
    (133615, "logo_everton.png", "Everton"),
    (133600, "logo_fulham.png", "Fulham"),
    (133622, "logo_ipswich.png", "Ipswich Town"),
    (133616, "logo_leicester.png", "Leicester City"),
    (133602, "logo_liverpool.png", "Liverpool"),
    (133613, "logo_mancity.png", "Manchester City"),
    (133612, "logo_manutd.png", "Manchester United"),
    (134611, "logo_newcastle.png", "Newcastle"),
    (133599, "logo_nottingham.png", "Nottingham Forest"),
    (134778, "logo_southampton.png", "Southampton"),
    (133616, "logo_tottenham_skip.png", "skip"),  # placeholder
    (133607, "logo_tottenham.png", "Tottenham"),
    (133614, "logo_westham.png", "West Ham"),
    (133598, "logo_wolves.png", "Wolverhampton"),
    (134070, "logo_france.png", "France"),
]

import json

def download_by_id(team_id, filename, label):
    """Download team badge using the lookup endpoint."""
    if label == "skip":
        return False
    api_url = f"https://www.thesportsdb.com/api/v1/json/3/lookupteam.php?id={team_id}"
    
    try:
        req = urllib.request.Request(api_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, context=ctx, timeout=15) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        teams = data.get('teams')
        if not teams:
            print(f"  [WARN] No team found for ID {team_id} ({label})")
            return False
        
        team = teams[0]
        found_name = team.get('strTeam', '?')
        badge_url = team.get('strBadge') or team.get('strTeamBadge')
        
        if not badge_url:
            print(f"  [WARN] No badge for {found_name}")
            return False
        
        print(f"  Found: {found_name} -> downloading badge...")
        
        img_req = urllib.request.Request(badge_url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(img_req, context=ctx, timeout=15) as img_response:
            img_data = img_response.read()
        
        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, 'wb') as f:
            f.write(img_data)
        
        print(f"  [OK] {filename} ({len(img_data)/1024:.1f} KB)")
        return True
        
    except urllib.error.HTTPError as e:
        if e.code == 429:
            print(f"  [RATE LIMITED] Waiting 15s...")
            time.sleep(15)
            return download_by_id(team_id, filename, label)
        print(f"  [HTTP {e.code}] {label}: {e}")
        return False
    except Exception as e:
        print(f"  [ERROR] {label}: {e}")
        return False

print("=" * 60)
print("DOWNLOADING TEAM LOGOS (lookup by ID)")
print("=" * 60)

ok = 0
fail = 0
for team_id, filename, label in TEAMS_BY_ID:
    if label == "skip":
        continue
    print(f"\n[{ok+fail+1}] {label} (ID: {team_id})")
    if download_by_id(team_id, filename, label):
        ok += 1
    else:
        fail += 1
    time.sleep(2)

print(f"\nDONE: {ok} OK, {fail} FAIL")

# Verify uniqueness
print("\nFile sizes:")
sizes = {}
for f in sorted(os.listdir(OUTPUT_DIR)):
    fp = os.path.join(OUTPUT_DIR, f)
    sz = os.path.getsize(fp)
    sizes.setdefault(sz, []).append(f)
    print(f"  {f}: {sz/1024:.1f} KB")

dups = {sz: files for sz, files in sizes.items() if len(files) > 2}
if dups:
    print("\n[WARNING] Possible duplicates detected:")
    for sz, files in dups.items():
        print(f"  {sz} bytes: {', '.join(files)}")
else:
    print("\n[OK] All files appear unique!")
