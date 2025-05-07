from functools import wraps
from flask import request, jsonify
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidSignatureError, DecodeError
from app.config import Config

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return jsonify({'error': 'Authorization header missing'}), 401

        try:
            token = auth_header.split(" ")[1]
            data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            request.user_id = data.get("user_id")
            request.role = data.get("role")
            request.username = data.get("username")
        except ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except InvalidSignatureError:
            return jsonify({'error': 'Invalid token signature'}), 401
        except DecodeError:
            return jsonify({'error': 'Invalid token'}), 401

        return f(*args, **kwargs)
    return decorated
