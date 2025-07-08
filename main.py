import os

# List of suburbs
suburbs = [
    "Abbotsford", "Armadale", "Ashburton", "Balwyn", "Bentleigh", "Blackburn", "Box Hill", "Brighton", "Brunswick",
    "Bulleen", "Burwood", "Camberwell", "Canterbury", "Caulfield", "Chadstone", "Cheltenham", "Clayton", "Coburg",
    "Cremorne", "Dingley Village", "Doncaster", "Elsternwick", "Essendon", "Glen Iris", "Glen Waverley", "Hampton",
    "Hawthorn", "Highett", "Kew", "Keysborough", "Kooyong", "Malvern", "Mentone", "Moorabbin", "Mordialloc",
    "Mulgrave", "Noble Park", "Northcote", "Notting Hill", "Oakleigh", "Parkdale", "Pascoe Vale", "Prahran",
    "Richmond", "Sandringham", "South Yarra", "Springvale", "St Kilda", "Strathmore", "Templestowe", "Toorak"
]

# Nearby suburb map
nearby_map = {
    "Abbotsford": ["Collingwood", "Richmond", "Fitzroy"],
    "Armadale": ["Malvern", "Toorak", "Prahran"],
    "Ashburton": ["Glen Iris", "Burwood", "Ashwood"],
    "Balwyn": ["Canterbury", "Kew", "Balwyn North"],
    "Bentleigh": ["Moorabbin", "Bentleigh East", "McKinnon"],
    "Blackburn": ["Box Hill", "Nunawading", "Forest Hill"],
    "Box Hill": ["Mont Albert", "Blackburn", "Surrey Hills"],
    "Brighton": ["Brighton East", "Elwood", "Hampton"],
    "Brunswick": ["Coburg", "Carlton North", "Fitzroy North"],
    "Bulleen": ["Templestowe", "Doncaster", "Heidelberg"],
    "Burwood": ["Ashwood", "Burwood East", "Glen Iris"],
    "Camberwell": ["Hawthorn East", "Canterbury", "Balwyn"],
    "Canterbury": ["Surrey Hills", "Camberwell", "Balwyn"],
    "Caulfield": ["Elsternwick", "Caulfield South", "Glen Huntly"],
    "Chadstone": ["Malvern East", "Hughesdale", "Oakleigh"],
    "Cheltenham": ["Mentone", "Highett", "Moorabbin"],
    "Clayton": ["Notting Hill", "Oakleigh", "Mulgrave"],
    "Coburg": ["Brunswick", "Pascoe Vale", "Preston"],
    "Cremorne": ["Richmond", "South Yarra", "Burnley"],
    "Dingley Village": ["Moorabbin", "Springvale", "Keysborough"],
    "Doncaster": ["Templestowe", "Doncaster East", "Bulleen"],
    "Elsternwick": ["Caulfield", "Ripponlea", "Brighton"],
    "Essendon": ["Strathmore", "Moonee Ponds", "Niddrie"],
    "Glen Iris": ["Malvern", "Ashburton", "Camberwell"],
    "Glen Waverley": ["Mount Waverley", "Wheelers Hill", "Burwood East"],
    "Hampton": ["Brighton", "Sandringham", "Highett"],
    "Hawthorn": ["Hawthorn East", "Kew", "Richmond"],
    "Highett": ["Moorabbin", "Hampton", "Cheltenham"],
    "Kew": ["Hawthorn", "Balwyn", "Ivanhoe"],
    "Keysborough": ["Springvale", "Noble Park", "Dandenong"],
    "Kooyong": ["Toorak", "Hawthorn", "Malvern"],
    "Malvern": ["Armadale", "Glen Iris", "Caulfield"],
    "Mentone": ["Parkdale", "Mordialloc", "Cheltenham"],
    "Moorabbin": ["Bentleigh", "Highett", "Heatherton"],
    "Mordialloc": ["Aspendale", "Mentone", "Parkdale"],
    "Mulgrave": ["Wheelers Hill", "Clayton", "Springvale"],
    "Noble Park": ["Springvale", "Keysborough", "Dandenong"],
    "Northcote": ["Thornbury", "Fitzroy North", "Preston"],
    "Notting Hill": ["Clayton", "Mount Waverley", "Mulgrave"],
    "Oakleigh": ["Hughesdale", "Clayton", "Chadstone"],
    "Parkdale": ["Mentone", "Mordialloc", "Chelsea"],
    "Pascoe Vale": ["Coburg", "Strathmore", "Glenroy"],
    "Prahran": ["South Yarra", "Windsor", "Armadale"],
    "Richmond": ["Abbotsford", "Cremorne", "Collingwood"],
    "Sandringham": ["Hampton", "Black Rock", "Cheltenham"],
    "South Yarra": ["Toorak", "Prahran", "Cremorne"],
    "Springvale": ["Noble Park", "Mulgrave", "Keysborough"],
    "St Kilda": ["Balaclava", "Elwood", "Windsor"],
    "Strathmore": ["Essendon", "Pascoe Vale", "Glenroy"],
    "Templestowe": ["Doncaster", "Eltham", "Bulleen"],
    "Toorak": ["South Yarra", "Kooyong", "Armadale"]
}

# Load HTML template
with open("template.html", "r", encoding="utf-8") as f:
    template = f.read()

# Prepare output folder
output_dir = "location_pages"
os.makedirs(output_dir, exist_ok=True)

# Generate each suburb page
index_entries = []
for suburb in suburbs:
    nearby = nearby_map.get(suburb, ["Nearby A", "Nearby B", "Nearby C"])
    html = template.format(
        suburb=suburb,
        nearby1=nearby[0],
        nearby2=nearby[1],
        nearby3=nearby[2]
    )

    filename = f"free-vending-service-in-{suburb.lower().replace(' ', '-')}.html"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)

    index_entries.append(f'<li><a href="{output_dir}/{filename}">Free Vending Service in {suburb}</a></li>')

# Generate index.html
index_html = f"""
<!DOCTYPE html>
<html>
<head>
    <title>Grabbix Vending Locations</title>
</head>
<body>
    <h1>Grabbix Free Vending Services – Melbourne Suburbs</h1>
    <ul>
        {''.join(index_entries)}
    </ul>
</body>
</html>
"""

with open("index.html", "w", encoding="utf-8") as f:
    f.write(index_html)

print("✅ All suburb pages and index.html generated.")