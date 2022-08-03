from app import app 

@app.route("/")
def api():
    return "Mess with the honk, and you get the bonk."