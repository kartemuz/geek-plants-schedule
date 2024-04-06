from flask import Flask, request, jsonify
import jwt
from datetime import datetime, timedelta
import os
from flask_cors import CORS

# Ваш код маршрутов и логики приложения Flask


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.urandom(24)  # Генерация случайного секретного ключа

# Примеры пользователей (обычно эти данные хранятся в базе данных)
users = {
    'user1': 'password1',
    'user2': 'password2'
}

# Генерация токена при успешной аутентификации
def generate_token(username):
    token_payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(hours=1)  # время жизни токена
    }
    token = jwt.encode(token_payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

# Регистрация пользователя
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']
    users[username] = password
    return jsonify({'message': 'User registered successfully'})

# Вход пользователя
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if users.get(username) == password:
        token = generate_token(username)
        return jsonify({'token': token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Защищенный маршрут
@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization').split()[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return jsonify({'message': f'Hello, {payload["username"]}!'})
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401

@app.route('/hello', methods=['POST'])
def hello():
    # Получение тела запроса в виде строки
    request_body = request.data.decode('utf-8')
    
    # Вывод тела запроса в консоль
    print('Request Body:', request_body)
    
    return 'Request body received'
if __name__ == '__main__':
    app.run(debug=True)