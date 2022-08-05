from . import bp as app 


@app.route("/")
def api():
    return "This is an empty home page."

@app.route("/api")
def users():
    return "this is where you will find the users?"
