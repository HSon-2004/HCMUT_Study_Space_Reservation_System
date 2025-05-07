from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.seed_data import seed_data


# Import blueprints correctly
from app.routes import iot_bp
from app.routes import booking_bp
from app.routes import room_bp
from app.routes import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    #init_db()
    seed_data()

    # Register blueprints with URL prefixes
    # Remove api_bp as it's not imported or defined
    app.register_blueprint(iot_bp, url_prefix='/api')
    app.register_blueprint(booking_bp, url_prefix='/api')
    app.register_blueprint(room_bp, url_prefix='/api')  # Make sure this is included
    app.register_blueprint(user_bp, url_prefix='/api')  # Assuming user_bp is defined
    # Error handlers
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Not found"}), 404
    
    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)