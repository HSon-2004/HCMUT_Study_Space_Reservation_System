from app import create_app



app = create_app()

@app.route('/debug-routes')
def debug_routes():
    rules = []
    for rule in app.url_map.iter_rules():
        rules.append(str(rule))
    return {"routes": rules}  # Xem tất cả routes đã đăng ký

if __name__ == "__main__":
    app.run(debug=True)