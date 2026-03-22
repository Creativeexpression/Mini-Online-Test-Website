from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)

# MySQL configuration using app.config style
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'your_db_user')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', 'your_secure_password_here')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB', 'online_test')
app.config['MYSQL_AUTH_PLUGIN'] = 'mysql_native_password'

def get_db_connection():
    return mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        auth_plugin=app.config['MYSQL_AUTH_PLUGIN']
    )

# Init DB and table + demo user
def init_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS online_test")
        conn.database = app.config['MYSQL_DB']
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                score FLOAT DEFAULT 0,
                percentage FLOAT DEFAULT 0,
                detect_object VARCHAR(100) DEFAULT NULL
            )
        """)
        # Add demo user if not exists
        demo_email = 'demo@student.com'
        cursor.execute("SELECT id FROM students WHERE email = %s", (demo_email,))
        if not cursor.fetchone():
            cursor.execute("""
                INSERT INTO students (name, email, password, score, percentage) 
                VALUES (%s, %s, %s, 85.5, 92.3)
            """, ('Demo Student', demo_email, generate_password_hash('demo123')))
            print("Demo user added: demo@student.com / demo123")
        conn.commit()
        cursor.close()
        conn.close()
        print("Database and table initialized successfully.")
    except Error as e:
        print(f"Error initializing DB: {e}")

init_db()

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        name = data['name']
        email = data['email']
        password = generate_password_hash(data['password'])

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO students (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Student registered successfully'}), 201
    except Error as e:
        return jsonify({'error': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        email = data['email']
        password = data['password']

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM students WHERE email = %s", (email,))
        student = cursor.fetchone()
        cursor.close()
        conn.close()

        if student and check_password_hash(student['password'], password):
            return jsonify({
                'message': 'Login successful',
                'student_id': student['id'],
                'name': student['name'],
                'email': student['email'],
                'score': student['score'],
                'percentage': student['percentage']
            })
        return jsonify({'error': 'Invalid credentials'}), 401
    except Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/student/<email>', methods=['GET'])
def get_student(email):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, name, email, score, percentage, detect_object FROM students WHERE email = %s", (email,))
        student = cursor.fetchone()
        cursor.close()
        conn.close()
        if student:
            return jsonify(student)
        return jsonify({'error': 'Student not found'}), 404
    except Error as e:
        return jsonify({'error': str(e)}), 500

@app.route('/update_score', methods=['POST'])
def update_score():
    try:
        data = request.json
        student_id = data['student_id']
        score = data['score']
        percentage = data['percentage']
        detect_object = data.get('detect_object', None)

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("UPDATE students SET score = %s, percentage = %s, detect_object = %s WHERE id = %s", (score, percentage, detect_object, student_id))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Score updated successfully'})
    except Error as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
