import os

# Read CSS (already exists)
css = open("app/globals.css").read()
print(f"CSS length: {len(css)}")

# Read JS
js = open("browser.js").read()
print(f"JS length: {len(js)}")

# Build HTML
body = '''<div class="header"><h1>✨ Sofia ✨</h1><p>Your beautiful year tracker</p><div class="day-counter">Day <span id="dayOfYear">—</span> / 365 — <span id="glowPct">0</span>% glow</div></div>
<div class="kpi-strip" id="kpiStrip"></div>
<div class="year-section"><div class="year-header"><h2 style="font-size:1.1rem">2026</h2><span class="today-btn" onclick="goToToday()">Today</span></div><div class="weekday-labels" id="weekdayLabels"></div><div class="year-grid" id="yearGrid"></div></div>
<div id="widgets"></div>'''

html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"UTF-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n<title>Sofia — Year Tracker 2026</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link href=\"https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">\n<style>\n" + css + "\n</style>\n</head>\n<body>\n" + body + "\n<script>\n" + js + "\n</script>\n</body>\n</html>"

with open("index.html", "w") as f:
    f.write(html)

print(f"index.html written, size: {os.path.getsize('index.html')} bytes")