from mysql.connector import Error

try:
    # Connect without auth to change root auth method
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        auth_plugin='mysql_native_password',
        password='Shlok@12345'
    )
    cursor = conn.cursor()
    cursor.execute("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Shlok@12345';")
    cursor.execute("FLUSH PRIVILEGES;")
    conn.commit()
    print("✅ Root auth fixed to mysql_native_password.")
except Error as e:
    print(f"Still error: {e}. Try sudo mariadb then: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Shlok@12345'; FLUSH PRIVILEGES;")
finally:
    try:
        conn.close()
    except:
        pass

print("Now run python app.py or seed_demo.py")

