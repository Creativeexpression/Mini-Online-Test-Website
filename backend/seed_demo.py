import mysql.connector
from mysql.connector import Error
from werkzeug.security import generate_password_hash

DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Shlok@12345',
    'auth_plugin': 'mysql_native_password',
    'database': 'online_test'
}

try:
    conn = mysql.connector.connect(**DB_CONFIG)
    cursor = conn.cursor()
    
    # Create demo user
    name = 'Demo Student'
    email = 'demo@student.com'
    password = generate_password_hash('demo123')
    
    cursor.execute("""
        INSERT IGNORE INTO students (name, email, password, score, percentage, detect_object) 
        VALUES (%s, %s, %s, 85.5, 92.3, 'none')
    """, (name, email, password))
    
    conn.commit()
    print(f"Demo user created: {email} / demo123 (score 85.5)")
    
    cursor.close()
    conn.close()
except Error as e:
    print(f"Error: {e}")

print("Run: cd backend && python seed_demo.py")

