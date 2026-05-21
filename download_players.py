import urllib.request
import json
import os
import time

OUTPUT_DIR = r"c:\Users\gpasq\Desktop\Gabin\Site_maillot\assets\joueurs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

API_BASE = "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p="

players = [
    # (filename, search_name)
    ("joueur2.jpg", "Rayan Cherki"),
    ("joueur3.jpg", "Michael Olise"),
    ("joueur4.jpg", "Ousmane Dembele"),
    ("joueur5.jpg", "Vitinha"),
    ("joueur6.jpg", "Nuno Mendes"),
    ("joueur7.jpg", "Desire Doue"),
    ("joueur8.jpg", "Warren Zaire-Emery"),
    ("joueur9.jpg", "Willian Pacho"),
    ("joueur10.jpg", "Kingsley Coman"),
]

# Fallback search names if first attempt returns no results
fallbacks = {
    "Vitinha": "Vitor Machado Ferreira",
}

def search_player(name):
    url = API_BASE + urllib.parse.quote(name)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode("utf-8"))
    return data

def get_image_url(data):
    if not data or not data.get("player"):
        return None
    p = data["player"][0]
    thumb = p.get("strThumb")
    cutout = p.get("strCutout")
    if thumb and thumb.strip():
        return thumb.strip()
    if cutout and cutout.strip():
        return cutout.strip()
    return None

def download_image(image_url, dest_path):
    req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        with open(dest_path, "wb") as f:
            f.write(resp.read())

print(f"Skipping joueur1.jpg (Kylian Mbappe - already exists)")
print(f"Downloading {len(players)} player photos...\n")

success = 0
failed = 0

for filename, search_name in players:
    dest = os.path.join(OUTPUT_DIR, filename)
    print(f"[{filename}] Searching for '{search_name}'...", end=" ", flush=True)
    try:
        data = search_player(search_name)
        image_url = get_image_url(data)

        # Try fallback if no result
        if not image_url and search_name in fallbacks:
            alt = fallbacks[search_name]
            print(f"not found, trying '{alt}'...", end=" ", flush=True)
            data = search_player(alt)
            image_url = get_image_url(data)

        if not image_url:
            print("NO IMAGE URL FOUND - skipped")
            failed += 1
            continue

        print(f"found -> downloading...", end=" ", flush=True)
        download_image(image_url, dest)
        size_kb = os.path.getsize(dest) / 1024
        print(f"OK ({size_kb:.1f} KB)")
        success += 1

    except Exception as e:
        print(f"ERROR: {e}")
        failed += 1

    # Small delay to be nice to the API
    time.sleep(0.5)

print(f"\nDone! {success} downloaded, {failed} failed.")
