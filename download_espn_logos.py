import urllib.request
import os
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

OUTPUT_DIR = r"c:\Users\gpasq\Desktop\Gabin\Site_maillot\assets\wishlist"
os.makedirs(OUTPUT_DIR, exist_ok=True)

TEAMS_ESPN = [
    # (ESPN ID, Filename, Club Name)
    (160, "logo_psg.png", "Paris Saint-Germain"),
    (379, "logo_angers.png", "Angers SCO"),
    (132, "logo_bayern.png", "Bayern Munich"),
    (86, "logo_realmadrid.png", "Real Madrid"),
    (103, "logo_acmilan.png", "AC Milan"),
    (114, "logo_napoli.png", "SSC Napoli"),
    (449, "logo_france.png", "France"),
    (359, "logo_arsenal.png", "Arsenal"),
    (362, "logo_astonvilla.png", "Aston Villa"),
    (349, "logo_bournemouth.png", "AFC Bournemouth"),
    (337, "logo_brentford.png", "Brentford"),
    (331, "logo_brighton.png", "Brighton & Hove Albion"),
    (363, "logo_chelsea.png", "Chelsea"),
    (384, "logo_crystalpalace.png", "Crystal Palace"),
    (368, "logo_everton.png", "Everton"),
    (370, "logo_fulham.png", "Fulham"),
    (357, "logo_ipswich.png", "Ipswich Town"),
    (375, "logo_leicester.png", "Leicester City"),
    (364, "logo_liverpool.png", "Liverpool"),
    (382, "logo_mancity.png", "Manchester City"),
    (360, "logo_manutd.png", "Manchester United"),
    (361, "logo_newcastle.png", "Newcastle United"),
    (393, "logo_nottingham.png", "Nottingham Forest"),
    (376, "logo_southampton.png", "Southampton"),
    (367, "logo_tottenham.png", "Tottenham Hotspur"),
    (371, "logo_westham.png", "West Ham United"),
    (380, "logo_wolves.png", "Wolverhampton Wanderers")
]

print("Starting download of logos from ESPN CDN...")
success_count = 0
failed_count = 0

for espn_id, filename, name in TEAMS_ESPN:
    url = f"https://a.espncdn.com/i/teamlogos/soccer/500/{espn_id}.png"
    filepath = os.path.join(OUTPUT_DIR, filename)
    print(f"Downloading {name} (ID: {espn_id}) -> {filename}...", end="")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            data = resp.read()
            with open(filepath, 'wb') as f:
                f.write(data)
            print(f" SUCCESS ({len(data)/1024:.1f} KB)")
            success_count += 1
    except Exception as e:
        print(f" FAILED - {e}")
        failed_count += 1
    time.sleep(0.5)

print("\nSummary:")
print(f"Total successful: {success_count}")
print(f"Total failed: {failed_count}")

# Check sizes to detect duplicates
sizes = {}
for f in os.listdir(OUTPUT_DIR):
    if f.endswith('.png'):
        sz = os.path.getsize(os.path.join(OUTPUT_DIR, f))
        sizes.setdefault(sz, []).append(f)

dups = {sz: files for sz, files in sizes.items() if len(files) > 1}
if dups:
    print("\nWarning: Some files have identical sizes (potential placeholer/error images):")
    for sz, files in dups.items():
        print(f"  {sz} bytes: {', '.join(files)}")
else:
    print("\nAll downloaded files are unique and successful!")
