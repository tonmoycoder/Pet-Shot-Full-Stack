import re
import json
import sys

html = open('C:/Users/Tonmoy/.gemini/antigravity-ide/brain/355c97fd-350b-412d-8a27-c15df0a07633/.system_generated/steps/707/content.md', 'r', encoding='utf-8').read()
match = re.search(r'<script type="application/json" data-target="react-partial\.embeddedData">({.*?})</script>', html)
if match:
    data = json.loads(match.group(1))
    print(json.dumps(data, indent=2)[:5000])
else:
    print("No embedded data found")
